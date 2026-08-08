import { LitElement, html, css, svg, nothing } from "lit";
import { handleAction, hasAction } from "custom-card-helpers";

import {
  CARD_VERSION,
  CARD_NAME,
  EDITOR_NAME,
  DEFAULT_SETTINGS,
  DEFAULT_TILE_ORDER,
  ENTITY_FIELDS,
} from "./const.js";
import {
  numericState,
  calcDewPoint,
  comfortKey,
  degToCompass,
  luxLevel,
  formatLux,
  uvLevel,
  batteryIcon,
  deriveCondition,
  isRainDetected,
  round,
  unit,
  formatSunTime,
  sunDiagramPosition,
  sunCurveDots,
  toMetersPerSecond,
  beaufort,
  SUN_CROSS_LEFT_X,
  SUN_CROSS_RIGHT_X,
} from "./utils.js";
import { localize } from "./localize/localize.js";
import { wscIcon } from "./icons.js";

import "./editor.js";

class WeatherStationCard extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
    };
  }

  static async getConfigElement() {
    return document.createElement(EDITOR_NAME);
  }

  static getStubConfig() {
    return {
      type: `custom:${CARD_NAME}`,
      temperature_entity: "",
      humidity_entity: "",
      settings: { ...DEFAULT_SETTINGS },
    };
  }

  setConfig(config) {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    const settings = { ...DEFAULT_SETTINGS, ...(config.settings || {}) };
    settings.tile_order = this._normalizeTileOrder(settings.tile_order);
    this._config = {
      ...config,
      settings,
    };
    this._pressureHistory = this._pressureHistory || [];
    this._tempStats = this._tempStats || null;
    this._tempHistoryKey = undefined;
  }

  _normalizeTileOrder(order) {
    const known = new Set(DEFAULT_TILE_ORDER);
    const seen = new Set();
    const result = [];
    for (const key of Array.isArray(order) ? order : []) {
      if (known.has(key) && !seen.has(key)) {
        result.push(key);
        seen.add(key);
      }
    }
    for (const key of DEFAULT_TILE_ORDER) {
      if (!seen.has(key)) result.push(key);
    }
    return result;
  }

  getCardSize() {
    const s = this._config?.settings || {};
    if (s.compact_mode) return s.show_sun === false ? 2 : 3;
    return 6;
  }

  _t(key, replace) {
    return localize(this.hass, key, replace);
  }

  _hasDedicatedMinMax() {
    return !!(
      this._config?.temperature_min_entity || this._config?.temperature_max_entity
    );
  }

  _tempStorageKey() {
    const entity = this._config?.temperature_entity;
    return entity ? `wsc-temp-stats:${entity}` : null;
  }

  _readStoredTempStats() {
    const key = this._tempStorageKey();
    if (!key) return null;
    try {
      const raw = window.localStorage?.getItem(key);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || parsed.day !== new Date().toDateString()) return null;
      if (!Number.isFinite(parsed.min) || !Number.isFinite(parsed.max)) return null;
      return { day: parsed.day, min: parsed.min, max: parsed.max };
    } catch (_e) {
      return null;
    }
  }

  _writeStoredTempStats() {
    const key = this._tempStorageKey();
    if (!key || !this._tempStats) return;
    try {
      window.localStorage?.setItem(key, JSON.stringify(this._tempStats));
    } catch (_e) {
      /* ignore quota / private mode */
    }
  }

  // Track today's min/max (local midnight reset). Used when dedicated
  // min/max entities are not configured. Survives refresh via localStorage
  // + Home Assistant history for the current day.
  _recordTemp(temp) {
    if (temp == null || this._hasDedicatedMinMax()) return;
    if (!(this._config.settings || {}).show_minmax) return;

    const day = new Date().toDateString();
    if (!this._tempStats || this._tempStats.day !== day) {
      const stored = this._readStoredTempStats();
      this._tempStats =
        stored && stored.day === day
          ? {
              day,
              min: Math.min(stored.min, temp),
              max: Math.max(stored.max, temp),
            }
          : { day, min: temp, max: temp };
      this._tempHistoryKey = undefined;
    } else {
      this._tempStats.min = Math.min(this._tempStats.min, temp);
      this._tempStats.max = Math.max(this._tempStats.max, temp);
    }
    this._writeStoredTempStats();
    this._ensureTempHistory();
  }

  async _ensureTempHistory() {
    if (this._hasDedicatedMinMax()) return;
    if (!(this._config.settings || {}).show_minmax) return;

    const entity = this._config?.temperature_entity;
    if (!entity || !this.hass?.callWS) return;

    const day = new Date().toDateString();
    const fetchKey = `${entity}|${day}`;
    if (this._tempHistoryKey === fetchKey) return;
    this._tempHistoryKey = fetchKey;

    try {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const end = new Date();
      const hist = await this.hass.callWS({
        type: "history/history_during_period",
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        entity_ids: [entity],
        minimal_response: true,
        no_attributes: true,
        significant_changes_only: false,
      });

      const states = hist?.[entity] || [];
      let min = Infinity;
      let max = -Infinity;
      for (const st of states) {
        const v = Number.parseFloat(st.s ?? st.state);
        if (Number.isFinite(v)) {
          min = Math.min(min, v);
          max = Math.max(max, v);
        }
      }

      const current = numericState(this._stateObj("temperature_entity"));
      if (current != null) {
        min = Math.min(min, current);
        max = Math.max(max, current);
      }

      if (!Number.isFinite(min) || !Number.isFinite(max)) return;

      if (!this._tempStats || this._tempStats.day !== day) {
        this._tempStats = { day, min, max };
      } else {
        this._tempStats = {
          day,
          min: Math.min(this._tempStats.min, min),
          max: Math.max(this._tempStats.max, max),
        };
      }
      this._writeStoredTempStats();
      this.requestUpdate();
    } catch (_e) {
      // History may be unavailable; keep localStorage / live tracking.
      this._tempHistoryKey = undefined;
    }
  }

  shouldUpdate(changedProps) {
    if (!this._config) return false;
    if (changedProps.has("_config")) return true;
    if (!changedProps.has("hass")) return true;

    const oldHass = changedProps.get("hass");
    if (!oldHass) return true;

    const lang =
      this.hass?.locale?.language || this.hass?.language || this.hass?.selectedLanguage;
    const oldLang =
      oldHass.locale?.language || oldHass.language || oldHass.selectedLanguage;
    if (lang !== oldLang) return true;

    return ENTITY_FIELDS.some(({ key }) => {
      const entity = this._config[key];
      if (!entity) return false;
      return oldHass.states[entity] !== this.hass.states[entity];
    });
  }

  _stateObj(key) {
    const entity = this._config[key];
    if (!entity || !this.hass) return undefined;
    return this.hass.states[entity];
  }

  _isDay() {
    const s = this._config.settings || {};
    if (!s.show_daynight) return true;
    const sun = this._stateObj("sun_entity");
    if (sun) return sun.state === "above_horizon";
    const lux = numericState(this._stateObj("lux_entity"));
    if (lux != null) return lux > 50;
    return true;
  }

  _recordPressure(value) {
    if (value == null) return;
    const now = Date.now();
    this._pressureHistory.push({ t: now, v: value });
    const cutoff = now - 3 * 60 * 60 * 1000;
    this._pressureHistory = this._pressureHistory.filter((p) => p.t >= cutoff);
  }

  _pressureTrend(value) {
    const threshold = Number(this._config.settings.pressure_trend_threshold) || 1;
    if (this._pressureHistory.length < 2 || value == null) {
      return { icon: "trend_steady", labelKey: "steady" };
    }
    const oldest = this._pressureHistory[0].v;
    const pct = ((value - oldest) / oldest) * 100;
    if (pct >= threshold) return { icon: "trend_up", labelKey: "rising" };
    if (pct <= -threshold) return { icon: "trend_down", labelKey: "falling" };
    return { icon: "trend_steady", labelKey: "steady" };
  }

  _actionConfig(key) {
    const settings = this._config.settings || {};
    if (!settings.show_interactions) return undefined;
    const entity = this._config[key];
    const custom = this._config[`${key.replace("_entity", "")}_action`];
    return {
      entity,
      tap_action: custom?.tap_action || { action: "more-info" },
      hold_action: custom?.hold_action,
      double_tap_action: custom?.double_tap_action,
    };
  }

  _handleClick(key) {
    const cfg = this._actionConfig(key);
    if (!cfg || !cfg.entity) return;
    handleAction(this, this.hass, cfg, "tap");
  }

  _clickable(key) {
    const cfg = this._actionConfig(key);
    return !!(cfg && cfg.entity && (hasAction(cfg.tap_action) || cfg.tap_action));
  }

  render() {
    if (!this._config || !this.hass) return nothing;

    const s = this._config.settings || {};
    const temp = numericState(this._stateObj("temperature_entity"));
    const humidity = numericState(this._stateObj("humidity_entity"));
    const tempUnit = unit(this._stateObj("temperature_entity"), "°C");
    this._recordTemp(temp);

    const isDay = this._isDay();
    const rainObj = this._stateObj("rain_entity");
    const rainOn = rainObj ? isRainDetected(rainObj) : false;
    const rainMm = numericState(rainObj);
    const lux = numericState(this._stateObj("lux_entity"));
    const uv = numericState(this._stateObj("uv_entity"));

    let condition;
    if (!s.show_daynight && this._config.settings.manual_condition) {
      const map = {
        sunny: { icon: "sunny", labelKey: "clear_sky" },
        cloudy: { icon: "cloudy", labelKey: "cloudy" },
        rainy: { icon: "rainy", labelKey: "rain" },
        night: { icon: "night", labelKey: "clear_night" },
      };
      condition =
        map[this._config.settings.manual_condition] ||
        deriveCondition({ isDay, rainMm, rainOn, lux, uv });
    } else {
      condition = deriveCondition({ isDay, rainMm, rainOn, lux, uv });
    }

    // Empty string hides the title. Missing / English default uses the
    // localized card name so existing YAML still follows HA language.
    const title =
      this._config.title === ""
        ? ""
        : !this._config.title || this._config.title === "Weather Station"
          ? this._t("common.card_title")
          : this._config.title;

    return html`
      <ha-card>
        <div class="wsc ${s.compact_mode ? "compact" : "full"}">
          ${title ? html`<div class="title">${title}</div>` : nothing}

          ${this._renderHero(condition, temp, tempUnit, humidity)}
          ${this._renderSun()}

          ${s.compact_mode
            ? nothing
            : html`<div class="grid">
                ${this._renderTiles(lux, temp, tempUnit, humidity, rainObj, rainOn, rainMm, uv)}
              </div>`}
        </div>
      </ha-card>
    `;
  }

  _renderTiles(lux, temp, tempUnit, humidity, rainObj, rainOn, rainMm, uv) {
    const order = this._normalizeTileOrder(this._config.settings?.tile_order);
    const renderers = {
      lux: () => this._renderLux(lux),
      temperature: () => this._renderTemperature(temp, tempUnit),
      humidity: () => this._renderHumidity(humidity),
      rain: () => this._renderRain(rainObj, rainOn, rainMm),
      wind: () => this._renderWind(),
      uv: () => this._renderUv(uv),
      pressure: () => this._renderPressure(),
      battery: () => this._renderBattery(),
    };
    return order.map((key) => (renderers[key] ? renderers[key]() : nothing));
  }

  _renderSun() {
    const s = this._config.settings || {};
    if (!s.show_sun) return nothing;

    const sun = this._stateObj("sun_entity");
    const azObj = this._stateObj("azimuth_entity");
    const elObj = this._stateObj("elevation_entity");
    const uvObj = this._stateObj("uv_entity");

    if (!sun && !azObj && !elObj) return nothing;

    const attrs = (sun && sun.attributes) || {};
    const above = sun ? sun.state === "above_horizon" : true;

    const elevation = numericState(elObj) ?? Number(attrs.elevation);
    const azimuth = numericState(azObj) ?? Number(attrs.azimuth);
    const uv = numericState(uvObj);
    const sunrise = formatSunTime(this.hass, attrs.next_rising);
    const sunset = formatSunTime(this.hass, attrs.next_setting);
    const pos = sunDiagramPosition(azimuth, elevation, above);
    const isNight = pos.night;
    // Evenly spaced dots along the whole day curve. Each dot is coloured by
    // above/below the horizon and weighted by whether the sun has passed it
    // yet (traveled = bold, upcoming = light) so the not-yet-reached tail is
    // faint rather than heavy.
    const dots = sunCurveDots();

    // Full-height scene: tall dome above the horizon (y=60) with clear space
    // below it so a negative-elevation sun/moon reads as "under the horizon".
    const VB_Y = 0;
    const VB_H = 84;
    const HORIZON_Y = 60;
    const markerLeft = `${(pos.x / 200) * 100}%`;
    const markerTop = `${((pos.y - VB_Y) / VB_H) * 100}%`;
    // Nudge times slightly inward from the horizon crossings so they sit
    // closer to the sun↔moon transition (sunrise right, sunset left).
    const TIME_INSET = 10;
    const crossLeft = `${((SUN_CROSS_LEFT_X + TIME_INSET) / 200) * 100}%`;
    const crossRight = `${((SUN_CROSS_RIGHT_X - TIME_INSET) / 200) * 100}%`;

    const elevLabel = Number.isFinite(elevation) ? `${round(elevation, 1)}°` : "—";
    const azLabel = Number.isFinite(azimuth) ? `${round(azimuth, 0)}°` : "—";
    const tapKey = sun ? "sun_entity" : azObj ? "azimuth_entity" : "elevation_entity";

    const nightPalette = (s.night_palette !== false) && isNight;

    return html`
      <div
        class="sun-panel ${nightPalette ? "night-palette" : ""} ${this._clickable(tapKey) ? "tappable" : ""}"
        @click=${() => this._handleClick(tapKey)}
      >
        <div class="sun-scene ${isNight ? "night" : "day"}">
          <svg
            class="sun-svg"
            viewBox="0 0 200 84"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              class="sun-horizon"
              x1="4"
              y1=${HORIZON_Y}
              x2="196"
              y2=${HORIZON_Y}
            />
            ${dots.map((d) => {
              const past = d.g <= pos.g;
              const cls = `dot ${d.above ? "day" : "night"} ${past ? "past" : "future"}`;
              const r = d.above ? (past ? 1.6 : 1.3) : past ? 1.5 : 1.2;
              return svg`<circle class=${cls} cx=${d.x} cy=${d.y} r=${r} />`;
            })}
          </svg>

          <div class="sun-marker ${isNight ? "night" : "day"}"
            style="left:${markerLeft};top:${markerTop}">
            ${wscIcon(isNight ? "night" : "sunny", "sun-marker-icon")}
          </div>

          <div class="sun-center">
            <div class="sun-stat">
              <div class="sun-stat-value">${elevLabel}</div>
              <div class="sun-stat-label">${this._t("sun.elevation")}</div>
            </div>
            <div class="sun-stat">
              <div class="sun-stat-value">${azLabel}</div>
              <div class="sun-stat-label">${this._t("sun.azimuth")}</div>
            </div>
            ${uv != null
              ? html`
                  <div class="sun-stat">
                    <div class="sun-stat-value">${round(uv, 0)}</div>
                    <div class="sun-stat-label">${this._t("sections.uv")}</div>
                  </div>
                `
              : nothing}
          </div>

          ${sun
            ? html`
                <div class="sun-edge" style="left:${crossLeft}">
                  ${sunrise || "—"}
                </div>
                <div class="sun-edge" style="left:${crossRight}">
                  ${sunset || "—"}
                </div>
              `
            : nothing}
        </div>
      </div>
    `;
  }

  _todayMinMax() {
    const minEnt = numericState(this._stateObj("temperature_min_entity"));
    const maxEnt = numericState(this._stateObj("temperature_max_entity"));
    const min = minEnt != null ? minEnt : this._tempStats ? this._tempStats.min : null;
    const max = maxEnt != null ? maxEnt : this._tempStats ? this._tempStats.max : null;
    if (min == null || max == null) return null;
    return { min, max };
  }

  _renderHero(condition, temp, tempUnit, humidity) {
    const s = this._config.settings || {};
    const dew = s.show_dewpoint ? calcDewPoint(temp, humidity) : null;
    const comfort = comfortKey(temp, humidity);
    const minmax = s.show_minmax ? this._todayMinMax() : null;

    const speedObj = this._stateObj("wind_speed_entity");
    const dirDeg = numericState(this._stateObj("wind_direction_entity"));
    const speed = numericState(speedObj);
    const speedUnit = unit(speedObj, "m/s");
    const compassKey = degToCompass(dirDeg);
    const compass = compassKey ? this._t(`compass.${compassKey}`) : null;
    const showWind = speedObj || dirDeg != null;

    return html`
      <div
        class="hero ${showWind ? "has-wind" : ""} ${this._clickable("temperature_entity") ? "tappable" : ""}"
        @click=${() => this._handleClick("temperature_entity")}
      >
        ${wscIcon(condition.icon, "hero-icon")}
        <div class="hero-main">
          <div class="hero-condition">
            ${this._t(`condition.${condition.labelKey}`)}
          </div>
          <div class="hero-temp">
            ${temp != null ? `${round(temp, 1)} ${tempUnit}` : "—"}
          </div>
          ${minmax
            ? html`<div class="hero-minmax">
                <span class="mm mm-min">
                  ${wscIcon("arrow_down", "mm-icon")}
                  ${round(minmax.min, 1)}°
                </span>
                <span class="mm mm-max">
                  ${wscIcon("arrow_up", "mm-icon")}
                  ${round(minmax.max, 1)}°
                </span>
              </div>`
            : nothing}
        </div>
        ${showWind
          ? html`
              <div
                class="hero-wind ${this._clickable("wind_speed_entity") ? "tappable" : ""}"
                @click=${(e) => {
                  e.stopPropagation();
                  this._handleClick("wind_speed_entity");
                }}
              >
                ${dirDeg != null ? this._renderCompass(dirDeg, compass) : nothing}
                ${speed != null
                  ? html`<div class="hero-wind-speed">
                      ${round(speed, 1)} ${speedUnit}
                    </div>`
                  : nothing}
              </div>
            `
          : nothing}
        ${temp != null
          ? html`<div class="hero-sub">
              ${comfort
                ? html`<span>${this._t(`comfort.${comfort}`)}</span>`
                : nothing}
              ${dew != null
                ? html`<span class="muted"
                    >${this._t("dewpoint", { value: dew, unit: tempUnit })}</span
                  >`
                : nothing}
            </div>`
          : nothing}
      </div>
    `;
  }

  _tile({ icon, label, value, sub, key, accent }) {
    const clickable = key ? this._clickable(key) : false;
    return html`
      <div
        class="tile ${clickable ? "tappable" : ""}"
        @click=${key ? () => this._handleClick(key) : undefined}
      >
        <span class="tile-icon" style=${accent ? `--tile-accent:${accent}` : ""}>
          ${wscIcon(icon)}
        </span>
        <div class="tile-body">
          <div class="tile-label">${label}</div>
          <div class="tile-value">${value}</div>
          ${sub ? html`<div class="tile-sub">${sub}</div>` : nothing}
        </div>
      </div>
    `;
  }

  _renderLux(lux) {
    if (!this._stateObj("lux_entity")) return nothing;
    const level = luxLevel(lux);
    return this._tile({
      icon: level ? level.icon : "lux_very_bright",
      label: this._t("sections.light"),
      value: formatLux(lux),
      sub: level ? this._t(`lux.${level.labelKey}`) : "",
      key: "lux_entity",
    });
  }

  _renderTemperature(temp, tempUnit) {
    if (!this._stateObj("temperature_entity")) return nothing;
    return this._tile({
      icon: "thermometer",
      label: this._t("sections.temperature"),
      value: temp != null ? `${round(temp, 1)} ${tempUnit}` : "—",
      key: "temperature_entity",
    });
  }

  _renderHumidity(humidity) {
    if (!this._stateObj("humidity_entity")) return nothing;
    return this._tile({
      icon: "humidity",
      label: this._t("sections.humidity"),
      value: humidity != null ? `${round(humidity, 0)}%` : "—",
      key: "humidity_entity",
    });
  }

  _renderRain(rainObj, rainOn, rainMm) {
    const s = this._config.settings || {};
    const todayObj = this._stateObj("rain_today_entity");
    const today = s.show_rain_today ? numericState(todayObj) : null;
    if (!rainObj && today == null) return nothing;

    const unitStr = unit(rainObj, "mm/h");
    const todayUnit = unit(todayObj, "mm");
    const rateSub = rainMm != null ? `${round(rainMm, 1)} ${unitStr}` : "";
    const todayText =
      today != null ? `${this._t("rain.today")} ${round(today, 1)} ${todayUnit}` : "";

    let sub;
    if (rainObj && todayText) {
      sub = html`<span>${rateSub || this._t("rain.today")}</span
        ><span class="dot">·</span><span>${todayText}</span>`;
    } else if (rainObj) {
      sub = rateSub;
    } else {
      sub = todayText;
    }

    return this._tile({
      icon: rainOn ? "rainy" : "partly_rainy",
      label: this._t("sections.rain"),
      value: rainObj
        ? rainOn
          ? this._t("rain.detected")
          : this._t("rain.dry")
        : today != null
          ? `${round(today, 1)} ${todayUnit}`
          : "—",
      sub: rainObj ? sub : todayText && today != null ? this._t("rain.today") : sub,
      key: rainObj ? "rain_entity" : "rain_today_entity",
      accent: rainOn ? "var(--info-color, #2196f3)" : undefined,
    });
  }

  _renderWind() {
    const speedObj = this._stateObj("wind_speed_entity");
    if (!speedObj) return nothing;
    const s = this._config.settings || {};
    const speed = numericState(speedObj);
    const speedUnit = unit(speedObj, "m/s");
    const dirDeg = numericState(this._stateObj("wind_direction_entity"));
    const compassKey = degToCompass(dirDeg);
    const compass = compassKey ? this._t(`compass.${compassKey}`) : null;
    const gustObj = this._stateObj("wind_gust_entity");
    const gust = numericState(gustObj);
    const gustUnit = unit(gustObj, speedUnit);
    const bft = s.show_beaufort ? beaufort(toMetersPerSecond(speed, speedUnit)) : null;

    return html`
      <div
        class="tile wind ${this._clickable("wind_speed_entity") ? "tappable" : ""}"
        @click=${() => this._handleClick("wind_speed_entity")}
      >
        ${wscIcon("wind", "tile-icon")}
        <div class="tile-body">
          <div class="tile-label">${this._t("sections.wind")}</div>
          <div class="tile-value">
            ${speed != null ? `${round(speed, 1)} ${speedUnit}` : "—"}
          </div>
          ${compass || bft
            ? html`<div class="tile-sub wind-meta">
                ${compass ? html`<span>${compass}</span>` : nothing}
                ${compass && bft ? html`<span class="dot">·</span>` : nothing}
                ${bft
                  ? html`<span
                      >${this._t("wind.beaufort", { value: bft.n })}</span
                    >`
                  : nothing}
              </div>`
            : nothing}
          ${bft
            ? html`<div class="tile-sub wind-desc">
                ${this._t(`beaufort.${bft.key}`)}
              </div>`
            : nothing}
          ${s.show_wind_gust && gust != null
            ? html`<div class="tile-sub">
                ${wscIcon("wind_gust", "mini-icon")}
                ${this._t("wind.gust", {
                  value: round(gust, 0),
                  unit: gustUnit,
                })}
              </div>`
            : nothing}
        </div>
      </div>
    `;
  }

  _renderCompass(deg, compass) {
    return html`
      <div class="compass" title="${compass || ""} (${round(deg, 0)}°)">
        <span class="c-n">${this._t("compass.N")}</span>
        <span class="c-e">${this._t("compass.E")}</span>
        <span class="c-s">${this._t("compass.S")}</span>
        <span class="c-w">${this._t("compass.W")}</span>
        <div class="needle" style="transform: rotate(${deg}deg)">
          ${wscIcon("compass_needle", "needle-icon")}
        </div>
      </div>
    `;
  }

  _renderUv(uv) {
    if (!this._stateObj("uv_entity")) return nothing;
    const level = uvLevel(uv);
    return this._tile({
      icon: "uv",
      label: this._t("sections.uv"),
      value: uv != null ? `${round(uv, 0)}` : "—",
      sub: level ? this._t(`uv.${level.labelKey}`) : "",
      key: "uv_entity",
      accent: level ? level.color : undefined,
    });
  }

  _renderPressure() {
    const obj = this._stateObj("pressure_entity");
    if (!obj) return nothing;
    const s = this._config.settings || {};
    const value = numericState(obj);
    const unitStr = unit(obj, "hPa");
    this._recordPressure(value);
    const trend = s.show_pressure_trend ? this._pressureTrend(value) : null;
    return this._tile({
      icon: "gauge",
      label: this._t("sections.pressure"),
      value: value != null ? `${round(value, 0)} ${unitStr}` : "—",
      sub: trend
        ? html`${wscIcon(trend.icon, "mini-icon")}
            ${this._t(`pressure.${trend.labelKey}`)}`
        : "",
      key: "pressure_entity",
    });
  }

  _renderBattery() {
    const s = this._config.settings || {};
    if (!s.show_battery) return nothing;
    const obj = this._stateObj("battery_entity");
    if (!obj) return nothing;
    const pct = numericState(obj);
    let accent;
    if (pct != null && pct < 15) accent = "var(--error-color, #e53935)";
    else if (pct != null && pct < 40) accent = "var(--warning-color, #ffa726)";
    return this._tile({
      icon: batteryIcon(pct),
      label: this._t("sections.battery"),
      value: pct != null ? `${round(pct, 0)}%` : "—",
      key: "battery_entity",
      accent,
    });
  }

  static get styles() {
    return css`
      :host {
        --wsc-radius: 18px;
        --wsc-gap: 10px;
        container-type: inline-size;
        container-name: wsc;
        display: block;
      }
      ha-card {
        overflow: hidden;
      }
      .wsc {
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 0;
      }
      .wsc.full {
        gap: 10px;
      }
      .wsc.compact {
        gap: 8px;
        padding: 12px;
      }
      @container wsc (min-width: 520px) {
        .wsc.full {
          padding: 14px;
          gap: 12px;
        }
      }
      .title {
        font-size: 1.1rem;
        font-weight: 600;
        letter-spacing: 0.01em;
        color: var(--primary-text-color);
      }

      .hero {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto auto;
        align-items: center;
        gap: 4px 16px;
        padding: 16px;
        border-radius: var(--wsc-radius);
        background: var(--ha-card-background, var(--card-background-color, #fff));
        box-shadow: inset 0 0 0 1px var(--divider-color, rgba(0, 0, 0, 0.08));
      }
      .hero.has-wind {
        grid-template-columns: auto 1fr auto;
      }
      .wsc-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        line-height: 0;
        color: inherit;
      }
      .wsc-icon svg {
        width: 100%;
        height: 100%;
        display: block;
        overflow: visible;
      }

      .hero-icon {
        grid-row: 1 / 3;
        width: 46px;
        height: 46px;
      }
      .hero-main {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .hero-wind {
        grid-column: 3;
        grid-row: 1 / 3;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 2px 0 2px 8px;
        border-radius: 12px;
        align-self: stretch;
      }
      .hero-wind .compass {
        width: 76px;
        height: 76px;
        font-size: 0.72rem;
      }
      .hero-wind .compass .c-n { top: 11px; }
      .hero-wind .compass .c-s { top: 65px; }
      .hero-wind .compass .c-e { left: 65px; }
      .hero-wind .compass .c-w { left: 11px; }
      .hero-wind .compass .needle-icon {
        width: 30px;
        height: 30px;
      }
      .hero-wind-speed {
        font-size: 0.95rem;
        font-weight: 600;
        line-height: 1.1;
        color: var(--primary-text-color);
        white-space: nowrap;
      }
      @container wsc (max-width: 380px) {
        .hero {
          gap: 4px 10px;
          padding: 12px;
        }
        .hero-icon {
          width: 38px;
          height: 38px;
        }
        .hero-temp {
          font-size: 1.65rem;
        }
        .hero-wind {
          padding-left: 2px;
          gap: 4px;
        }
        .hero-wind .compass {
          width: 60px;
          height: 60px;
          font-size: 0.62rem;
        }
        .hero-wind .compass .c-n { top: 9px; }
        .hero-wind .compass .c-s { top: 51px; }
        .hero-wind .compass .c-e { left: 51px; }
        .hero-wind .compass .c-w { left: 9px; }
        .hero-wind .compass .needle-icon {
          width: 24px;
          height: 24px;
        }
        .hero-wind-speed {
          font-size: 0.82rem;
        }
      }
      .hero-condition {
        font-size: 0.95rem;
        color: var(--secondary-text-color);
      }
      .hero-temp {
        font-size: 2rem;
        font-weight: 600;
        line-height: 1.1;
        color: var(--primary-text-color);
      }
      .hero-sub {
        grid-column: 2;
        display: flex;
        flex-wrap: wrap;
        gap: 4px 12px;
        font-size: 0.85rem;
        color: var(--secondary-text-color);
      }
      .hero-sub .muted {
        opacity: 0.8;
      }
      .hero-minmax {
        display: flex;
        gap: 10px;
        margin-top: 2px;
        font-size: 0.9rem;
        font-weight: 500;
      }
      .hero-minmax .mm {
        display: inline-flex;
        align-items: center;
        gap: 1px;
      }
      .hero-minmax .mm-icon {
        width: 15px;
        height: 15px;
      }
      .hero-minmax .mm-min {
        color: var(--info-color, #2196f3);
      }
      .hero-minmax .mm-max {
        color: var(--warning-color, #ff9800);
      }
      .dot {
        margin: 0 3px;
        opacity: 0.6;
      }

      /* Sun path panel — matches the hero box (card bg + subtle border) */
      .sun-panel {
        padding: 6px 12px 8px;
        border-radius: var(--wsc-radius);
        background: var(--ha-card-background, var(--card-background-color, #fff));
        box-shadow: inset 0 0 0 1px var(--divider-color, rgba(0, 0, 0, 0.08));
        overflow: hidden;
      }
      .sun-panel.night-palette {
        background: #152038;
        box-shadow: inset 0 0 0 1px rgba(123, 156, 255, 0.22);
      }
      @supports (background: color-mix(in srgb, red, blue)) {
        .sun-panel.night-palette {
          background: linear-gradient(
            180deg,
            color-mix(in srgb, #1a2744 55%, var(--ha-card-background, var(--card-background-color, #121212))) 0%,
            var(--ha-card-background, var(--card-background-color, #121212)) 100%
          );
          box-shadow: inset 0 0 0 1px color-mix(in srgb, #6b8cff 22%, var(--divider-color, transparent));
        }
      }
      .sun-scene {
        position: relative;
        width: 100%;
        max-width: 520px;
        margin: 0 auto;
      }
      /* height:auto lets the inline SVG take its own intrinsic height from the
         viewBox ratio (200:84) in every browser — no reliance on aspect-ratio,
         which was collapsing to a flat line in some HA webviews. */
      .sun-svg {
        display: block;
        width: 100%;
        height: auto;
        overflow: visible;
      }
      /* Evenly spaced day-curve dots. Orange above the horizon, blue below.
         Traveled dots are bold; upcoming dots are faint. */
      .dot.day {
        fill: #e8961e;
      }
      .dot.night {
        fill: var(--wsc-night-color, #3f6fd6);
      }
      .dot.past {
        opacity: 1;
      }
      .dot.future {
        opacity: 0.4;
      }
      .dot.night.future {
        opacity: 0.35;
      }
      /* Night palette: cooler moon path + soft panel. Traveled dots stay
         fully highlighted (orange above, blue below); only upcoming stay faint. */
      .sun-panel.night-palette {
        --wsc-night-color: #7b9cff;
      }
      .sun-panel.night-palette .dot.day.past {
        fill: #ffb14a;
        opacity: 1;
      }
      .sun-panel.night-palette .dot.day.future {
        fill: #9a7340;
        opacity: 0.28;
      }
      .sun-panel.night-palette .dot.night.past {
        fill: #9bb4ff;
        opacity: 1;
      }
      .sun-panel.night-palette .dot.night.future {
        opacity: 0.4;
      }
      .sun-panel.night-palette .sun-horizon {
        stroke: #9bb0ff;
        stroke-opacity: 0.45;
      }
      .sun-panel.night-palette .sun-marker.night .wsc-icon {
        width: 24px;
        height: 24px;
        filter: drop-shadow(0 0 10px rgba(123, 156, 255, 0.75));
      }
      .sun-panel.night-palette .sun-stat-value,
      .sun-panel.night-palette .sun-edge {
        color: var(--primary-text-color);
      }
      /* Horizon at 0° — solid so "below horizon" is readable. */
      .sun-horizon {
        stroke: var(--primary-text-color, #3a3a3a);
        stroke-width: 0.8;
        stroke-opacity: 0.4;
        stroke-linecap: round;
      }
      .sun-marker {
        position: absolute;
        transform: translate(-50%, -50%);
        z-index: 2;
        pointer-events: none;
        transition: left 0.6s ease, top 0.6s ease;
      }
      .sun-marker .wsc-icon,
      .sun-marker-icon {
        width: 28px;
        height: 28px;
        filter: drop-shadow(0 0 6px rgba(255, 193, 7, 0.55));
      }
      .sun-marker.night .wsc-icon,
      .sun-marker.night .sun-marker-icon {
        width: 24px;
        height: 24px;
        filter: drop-shadow(0 0 6px rgba(63, 111, 214, 0.5));
      }
      .sun-center {
        position: absolute;
        left: 50%;
        top: 42%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 18px;
        text-align: center;
        z-index: 1;
        pointer-events: none;
      }
      .sun-stat-value {
        font-size: 1rem;
        font-weight: 600;
        line-height: 1.1;
        color: var(--primary-text-color);
      }
      .sun-stat-label {
        font-size: 0.62rem;
        color: var(--secondary-text-color);
        line-height: 1.1;
      }
      /* Times sit just below the horizon line; font matches elev/az values. */
      .sun-edge {
        position: absolute;
        top: 75%;
        transform: translate(-50%, 0);
        font-size: 1rem;
        font-weight: 600;
        line-height: 1.1;
        color: var(--primary-text-color);
        white-space: nowrap;
        z-index: 3;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--wsc-gap);
        min-width: 0;
      }
      /* Card-width breakpoints (not viewport) so narrow phone columns stay readable */
      @container wsc (max-width: 320px) {
        .grid {
          grid-template-columns: 1fr;
        }
      }
      @container wsc (min-width: 480px) {
        .grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }
      /* Full-station dashboard: 4 columns on wide cards (desktop / tablet landscape) */
      @container wsc (min-width: 720px) {
        .grid {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }
        .tile {
          padding: 11px 12px;
        }
      }
      /* Fallback when container queries are unavailable */
      @supports not (container-type: inline-size) {
        @media (max-width: 360px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
        @media (min-width: 520px) {
          .grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (min-width: 780px) {
          .grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
        @media (max-width: 400px) {
          .hero-wind .compass {
            width: 60px;
            height: 60px;
          }
        }
      }

      .tile {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 11px;
        border-radius: var(--wsc-radius);
        background: var(--ha-card-background, var(--card-background-color, #fff));
        box-shadow: inset 0 0 0 1px var(--divider-color, rgba(0, 0, 0, 0.08));
        min-height: 54px;
        min-width: 0;
        overflow: hidden;
        box-sizing: border-box;
      }
      .tile-icon {
        width: 28px;
        height: 28px;
        color: var(--tile-accent, var(--state-icon-color, var(--primary-color)));
        flex: 0 0 auto;
      }
      .tile-icon .wsc-icon {
        width: 28px;
        height: 28px;
      }
      .tile-body {
        display: flex;
        flex-direction: column;
        min-width: 0;
        flex: 1 1 auto;
        overflow: hidden;
      }
      .tile-label {
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.03em;
        color: var(--secondary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tile-value {
        font-size: 1.05rem;
        font-weight: 600;
        color: var(--primary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tile-sub {
        font-size: 0.8rem;
        color: var(--secondary-text-color);
        display: flex;
        align-items: center;
        gap: 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .wind .tile-body {
        overflow: visible;
      }
      .wind .wind-meta {
        flex-wrap: wrap;
      }
      .wind .wind-desc {
        white-space: normal;
        overflow: visible;
        text-overflow: unset;
        line-height: 1.25;
      }
      .mini-icon {
        width: 16px;
        height: 16px;
      }

      .compass {
        position: relative;
        width: 52px;
        height: 52px;
        border-radius: 50%;
        flex: 0 0 auto;
        box-shadow: inset 0 0 0 1px var(--divider-color, rgba(0, 0, 0, 0.15));
        color: var(--secondary-text-color);
        font-size: 0.6rem;
      }
      .compass span {
        position: absolute;
        transform: translate(-50%, -50%);
      }
      .compass .c-n { top: 8px; left: 50%; }
      .compass .c-s { top: 44px; left: 50%; }
      .compass .c-e { top: 50%; left: 44px; }
      .compass .c-w { top: 50%; left: 8px; }
      .compass .needle {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.4s ease;
      }
      .compass .needle-icon {
        width: 22px;
        height: 22px;
      }

      .tappable {
        cursor: pointer;
        transition: background 0.15s ease;
      }
      .tappable:hover {
        background: var(--divider-color, rgba(0, 0, 0, 0.08));
      }
    `;
  }
}

if (!customElements.get(CARD_NAME)) {
  customElements.define(CARD_NAME, WeatherStationCard);
}

window.customCards = window.customCards || [];
if (!window.customCards.find((c) => c.type === CARD_NAME)) {
  window.customCards.push({
    type: CARD_NAME,
    name: "Weather Station Card",
    description: "A modern, Mushroom-inspired weather station card.",
    preview: true,
    documentationURL:
      "https://github.com/H3ss3ltje/lovelace-weather-station-card",
  });
}

/* eslint-disable no-console */
console.info(
  `%c WEATHER-STATION-CARD %c v${CARD_VERSION} `,
  "color: white; background: #03a9f4; font-weight: 700;",
  "color: #03a9f4; background: white; font-weight: 700;"
);

export { WeatherStationCard };
