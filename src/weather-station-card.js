import { LitElement, html, css, svg, nothing } from "lit";
import { handleAction, hasAction } from "custom-card-helpers";

import {
  CARD_VERSION,
  CARD_NAME,
  EDITOR_NAME,
  COMPASS_CARD_NAME,
  DEFAULT_SETTINGS,
  DEFAULT_TILE_ORDER,
  ENTITY_FIELDS,
} from "./const.js";
import {
  numericState,
  calcDewPoint,
  comfortKey,
  degToCompass,
  windDirectionDegrees,
  luxLevel,
  formatLux,
  normalizeLux,
  uvLevel,
  batteryIcon,
  deriveCondition,
  conditionFromText,
  pressureTrendFromRate,
  isRainDetected,
  precipitationFromTemperature,
  tempToCelsius,
  round,
  unit,
  formatSunTime,
  formatNowTime,
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
    // Dedicated compass card type always forces compass-only layout.
    if (config.type === `custom:${COMPASS_CARD_NAME}` || config.type === COMPASS_CARD_NAME) {
      settings.compass_only = true;
    }
    this._config = {
      ...config,
      settings,
    };
    this._pressureHistory = this._pressureHistory || [];
    this._tempStats = this._tempStats || null;
    this._tempHistoryKey = undefined;
    this._startHeroClock();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopNeedleAnimation();
    this._stopHeroClock();
  }

  connectedCallback() {
    super.connectedCallback();
    this._startHeroClock();
  }

  updated() {
    if (this._needleTarget != null) {
      this._startNeedleAnimation();
    } else {
      this._stopNeedleAnimation();
    }
  }

  _stopHeroClock() {
    if (this._clockTimeout) {
      clearTimeout(this._clockTimeout);
      this._clockTimeout = null;
    }
    if (this._clockInterval) {
      clearInterval(this._clockInterval);
      this._clockInterval = null;
    }
  }

  _startHeroClock() {
    this._stopHeroClock();
    if ((this._config?.settings || {}).show_hero_time === false) return;
    const tick = () => this.requestUpdate();
    const now = new Date();
    const msToNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds() + 50;
    this._clockTimeout = setTimeout(() => {
      tick();
      this._clockInterval = setInterval(tick, 60000);
    }, Math.max(100, msToNextMinute));
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
    if (s.compass_only) return 4;
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
    const lux = normalizeLux(numericState(this._stateObj("lux_entity")), s);
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
    const threshold =
      Number(this._config.settings.pressure_trend_threshold) || 0.3;
    const rateObj = this._stateObj("pressure_trend_entity");
    const rate = numericState(rateObj);
    if (rate != null) {
      return (
        pressureTrendFromRate(rate, threshold) || {
          icon: "trend_steady",
          labelKey: "steady",
        }
      );
    }
    if (this._pressureHistory.length < 2 || value == null) {
      return { icon: "trend_steady", labelKey: "steady" };
    }
    const oldest = this._pressureHistory[0];
    const hours = Math.max((Date.now() - oldest.t) / 3600000, 0.05);
    const derived = (value - oldest.v) / hours;
    return (
      pressureTrendFromRate(derived, threshold) || {
        icon: "trend_steady",
        labelKey: "steady",
      }
    );
  }

  _dewPoint(temp, humidity) {
    const fromEntity = numericState(this._stateObj("dewpoint_entity"));
    if (fromEntity != null) return fromEntity;
    return calcDewPoint(temp, humidity);
  }

  /**
   * Prefer apparent temperature; otherwise pick wind chill / humidex by season.
   */
  _feelsLike(temp) {
    const apparent = numericState(
      this._stateObj("apparent_temperature_entity")
    );
    if (apparent != null) {
      return {
        value: apparent,
        key: "apparent_temperature_entity",
        kind: "apparent",
      };
    }
    const chill = numericState(this._stateObj("wind_chill_entity"));
    const humidex = numericState(this._stateObj("humidex_entity"));
    if (temp != null && temp <= 10 && chill != null) {
      return { value: chill, key: "wind_chill_entity", kind: "wind_chill" };
    }
    if (temp != null && temp >= 22 && humidex != null) {
      return { value: humidex, key: "humidex_entity", kind: "humidex" };
    }
    if (chill != null) {
      return { value: chill, key: "wind_chill_entity", kind: "wind_chill" };
    }
    if (humidex != null) {
      return { value: humidex, key: "humidex_entity", kind: "humidex" };
    }
    return null;
  }

  _precipToday() {
    const precip = this._stateObj("precipitation_entity");
    if (precip) return precip;
    return this._stateObj("rain_today_entity");
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
    const rainRateObj = this._stateObj("rain_rate_entity");
    const rainOn = rainObj ? isRainDetected(rainObj) : false;
    const rainState = String(rainObj?.state ?? "").toLowerCase();
    const rainLooksBinary = [
      "on",
      "off",
      "true",
      "false",
      "wet",
      "dry",
      "detected",
      "raining",
    ].includes(rainState);
    const rainRate =
      numericState(rainRateObj) ??
      (!rainLooksBinary ? numericState(rainObj) : null);
    const lux = normalizeLux(
      numericState(this._stateObj("lux_entity")),
      s
    );
    const uv = numericState(this._stateObj("uv_entity"));

    const tempC = tempToCelsius(temp, tempUnit);
    const precipActive = rainOn || (rainRate != null && rainRate > 0);

    let condition;
    const conditionObj = this._stateObj("condition_entity");
    const fromText = conditionObj
      ? conditionFromText(conditionObj.state, isDay)
      : null;
    if (fromText) {
      condition = fromText;
    } else if (!s.show_daynight && this._config.settings.manual_condition) {
      const map = {
        sunny: { icon: "sunny", labelKey: "clear_sky" },
        cloudy: { icon: "cloudy", labelKey: "cloudy" },
        rainy: { icon: "rainy", labelKey: "rain" },
        night: { icon: "night", labelKey: "clear_night" },
      };
      condition =
        map[this._config.settings.manual_condition] ||
        deriveCondition({
          isDay,
          rainMm: rainRate,
          rainOn,
          lux,
          uv,
          settings: s,
          tempC,
        });
    } else {
      condition = deriveCondition({
        isDay,
        rainMm: rainRate,
        rainOn,
        lux,
        uv,
        settings: s,
        tempC,
      });
    }

    // Live rain sensors win for the hero icon; use temperature to pick rain/sleet/snow.
    if (precipActive) {
      const fromTemp = precipitationFromTemperature(tempC);
      condition = {
        ...(fromTemp || { icon: "rainy", labelKey: "rain" }),
        raw: condition?.raw,
      };
    } else if (isDay && lux != null) {
      // User-tuned lux bands drive sky icons (cloudy / partly / sunny).
      const fromLux = deriveCondition({
        isDay,
        rainMm: 0,
        rainOn: false,
        lux,
        uv,
        settings: s,
      });
      condition = { ...fromLux, raw: condition?.raw };
    }

    // Empty string hides the title. Missing / English default uses the
    // localized card name so existing YAML still follows HA language.
    const title =
      s.hide_title
        ? ""
        : this._config.title === ""
        ? ""
        : !this._config.title || this._config.title === "Weather Station"
          ? this._t("common.card_title")
          : this._config.title;

    if (s.compass_only) {
      const compassTitle =
        s.hide_title
          ? ""
          : this._config.title === ""
          ? ""
          : !this._config.title ||
              this._config.title === "Weather Station" ||
              this._config.title === "Compass"
            ? this._t("common.compass_title")
            : this._config.title;
      return html`
        <ha-card>
          <div class="wsc compass-only">
            ${compassTitle
              ? html`<div class="title">${compassTitle}</div>`
              : nothing}
            ${this._renderCompassPanel()}
          </div>
        </ha-card>
      `;
    }

    return html`
      <ha-card>
        <div class="wsc ${s.compact_mode ? "compact" : "full"}">
          ${title ? html`<div class="title">${title}</div>` : nothing}

          ${this._renderHero(condition, temp, tempUnit, humidity, rainOn, rainRate)}
          ${this._renderSun()}

          ${s.compact_mode
            ? nothing
            : html`<div class="grid">
                ${this._renderTiles(lux, temp, tempUnit, humidity, rainObj, rainOn, rainRate, uv)}
              </div>`}
        </div>
      </ha-card>
    `;
  }

  _renderTiles(lux, temp, tempUnit, humidity, rainObj, rainOn, rainRate, uv) {
    const order = this._normalizeTileOrder(this._config.settings?.tile_order);
    const renderers = {
      lux: () => this._renderLux(lux),
      temperature: () => this._renderTemperature(temp, tempUnit),
      feels_like: () => this._renderFeelsLike(tempUnit),
      humidity: () => this._renderHumidity(humidity),
      dewpoint: () => this._renderDewpoint(temp, tempUnit, humidity),
      rain: () => this._renderRain(rainObj, rainOn, rainRate, temp, tempUnit),
      wind: () => this._renderWind(),
      uv: () => this._renderUv(uv),
      pressure: () => this._renderPressure(),
      heat_stress: () => this._renderHeatStress(),
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
    const pos = sunDiagramPosition(azimuth, elevation, above, {
      sunAttrs: attrs,
      nowMs: Date.now(),
    });
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

  _renderHero(condition, temp, tempUnit, humidity, rainOn, rainRate) {
    const s = this._config.settings || {};
    const dew = s.show_dewpoint ? this._dewPoint(temp, humidity) : null;
    const feels = s.show_feels_like ? this._feelsLike(temp) : null;
    const comfort =
      feels == null ? comfortKey(temp, humidity) : null;
    const minmax = s.show_minmax ? this._todayMinMax() : null;
    const rain = this._heroRainParts(rainOn, rainRate);
    // Compass lives on the dedicated compass card — not in the hero.
    this._needleTarget = null;

    const conditionText = this._t(`condition.${condition.labelKey}`);
    const showTime = s.show_hero_time !== false;
    const hideTimeMobile = s.hide_hero_time_mobile === true;
    const hasStats =
      feels != null ||
      comfort != null ||
      dew != null ||
      (rain && (rain.rate || rain.today));

    const rainClick = (e) => {
      e.stopPropagation();
      this._handleClick(
        this._stateObj("rain_entity")
          ? "rain_entity"
          : this._stateObj("rain_rate_entity")
            ? "rain_rate_entity"
            : "rain_today_entity"
      );
    };
    const rainTap =
      this._clickable("rain_entity") ||
      this._clickable("rain_rate_entity") ||
      this._clickable("rain_today_entity");

    return html`
      <div
        class="hero ${showTime ? "has-time" : ""} ${hideTimeMobile ? "hide-time-mobile" : ""} ${this._clickable("temperature_entity") ? "tappable" : ""}"
        @click=${() => this._handleClick("temperature_entity")}
      >
        <div class="hero-icon-wrap">
          ${wscIcon(condition.icon, `hero-icon ${s.animate_icons !== false ? "animated" : ""}`)}
        </div>
        <div class="hero-main">
          <div class="hero-condition">${conditionText}</div>
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
          ${hasStats
            ? html`<div class="hero-stats">
                ${feels
                  ? html`<div class="hero-stat">
                      <div class="hero-stat-label">${this._t("sections.feels_like")}</div>
                      <div class="hero-stat-value">
                        ${round(feels.value, 1)} ${tempUnit}
                      </div>
                    </div>`
                  : comfort
                    ? html`<div class="hero-stat">
                        <div class="hero-stat-value hero-stat-comfort">
                          ${this._t(`comfort.${comfort}`)}
                        </div>
                      </div>`
                    : nothing}
                ${dew != null
                  ? html`<div class="hero-stat">
                      <div class="hero-stat-label">${this._t("sections.dewpoint")}</div>
                      <div class="hero-stat-value">${round(dew, 1)} ${tempUnit}</div>
                    </div>`
                  : nothing}
                ${rain && (rain.rate || rain.today)
                  ? html`<div
                      class="hero-stat hero-stat-rain ${rainTap ? "tappable" : ""}"
                      @click=${rainClick}
                    >
                      ${rain.rate
                        ? html`<div class="hero-stat-value">${rain.rate}</div>`
                        : nothing}
                      ${rain.today
                        ? html`<div class="hero-stat-label">${rain.today}</div>`
                        : nothing}
                    </div>`
                  : nothing}
              </div>`
            : nothing}
        </div>
        ${showTime
          ? html`<div class="hero-time-col">${formatNowTime(this.hass)}</div>`
          : nothing}
      </div>
    `;
  }

  /** Rain rate / today for the hero side panel (not the dry/wet pill). */
  _heroRainParts(rainOn, rainRate) {
    const s = this._config.settings || {};
    if (s.show_rain_hero === false) return null;

    const rainObj = this._stateObj("rain_entity");
    const rateObj = this._stateObj("rain_rate_entity");
    const todayObj = s.show_rain_today ? this._precipToday() : null;
    const today = numericState(todayObj);
    const rate = rainRate != null ? rainRate : numericState(rateObj);

    if (rate == null && today == null) return null;

    const rateUnit = unit(rateObj || rainObj, "mm/h");
    const todayUnit = unit(todayObj, "mm");
    return {
      rate: rate != null ? `${round(rate, 1)} ${rateUnit}` : null,
      today:
        today != null
          ? `${this._t("rain.today")} ${round(today, 1)} ${todayUnit}`
          : null,
    };
  }

  _tile({ icon, iconOpts, label, value, sub, key, accent }) {
    const clickable = key ? this._clickable(key) : false;
    return html`
      <div
        class="tile ${clickable ? "tappable" : ""}"
        @click=${key ? () => this._handleClick(key) : undefined}
      >
        <span class="tile-icon" style=${accent ? `--tile-accent:${accent}` : ""}>
          ${wscIcon(icon, "", iconOpts || {})}
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
      iconOpts: { value: temp, unit: tempUnit },
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

  _renderFeelsLike(tempUnit) {
    const s = this._config.settings || {};
    if (!s.show_feels_like) return nothing;
    const temp = numericState(this._stateObj("temperature_entity"));
    const feels = this._feelsLike(temp);
    if (!feels) return nothing;
    const feelUnit = unit(this._stateObj(feels.key), tempUnit);
    return this._tile({
      icon: "feels_like",
      iconOpts: { value: feels.value, unit: feelUnit },
      label: this._t("sections.feels_like"),
      value: `${round(feels.value, 1)} ${feelUnit}`,
      key: feels.key,
    });
  }

  _renderDewpoint(temp, tempUnit, humidity) {
    const s = this._config.settings || {};
    if (!s.show_dewpoint) return nothing;
    const hasSource =
      this._stateObj("dewpoint_entity") ||
      (this._stateObj("temperature_entity") &&
        this._stateObj("humidity_entity"));
    if (!hasSource) return nothing;
    const dew = this._dewPoint(temp, humidity);
    const dewUnit = unit(this._stateObj("dewpoint_entity"), tempUnit);
    return this._tile({
      icon: "dewpoint",
      label: this._t("sections.dewpoint"),
      value: dew != null ? `${round(dew, 1)} ${dewUnit}` : "—",
      key: this._stateObj("dewpoint_entity")
        ? "dewpoint_entity"
        : "temperature_entity",
    });
  }

  _renderHeatStress() {
    const s = this._config.settings || {};
    if (!s.show_heat_stress) return nothing;
    const obj = this._stateObj("heat_stress_entity");
    if (!obj) return nothing;
    const pct = numericState(obj);
    let levelKey = "moderate";
    let accent;
    if (pct != null) {
      if (pct < 25) {
        levelKey = "low";
        accent = "#4caf50";
      } else if (pct < 50) {
        levelKey = "moderate";
        accent = "#ffb300";
      } else if (pct < 75) {
        levelKey = "high";
        accent = "#fb8c00";
      } else {
        levelKey = "extreme";
        accent = "#e53935";
      }
    }
    return this._tile({
      icon: "heat_stress",
      iconOpts: { value: pct },
      label: this._t("sections.heat_stress"),
      value: pct != null ? `${round(pct, 0)}%` : "—",
      sub: this._t(`heat_stress.${levelKey}`),
      key: "heat_stress_entity",
      accent,
    });
  }

  _renderRain(rainObj, rainOn, rainRate, temp, tempUnit) {
    const s = this._config.settings || {};
    const rateObj = this._stateObj("rain_rate_entity");
    const todayObj = s.show_rain_today ? this._precipToday() : null;
    const today = numericState(todayObj);
    if (!rainObj && rateObj == null && today == null) return nothing;

    const rateUnit = unit(rateObj || rainObj, "mm/h");
    const todayUnit = unit(todayObj, "mm");
    const rate =
      rainRate != null
        ? rainRate
        : numericState(rateObj);
    const rateText = rate != null ? `${round(rate, 1)} ${rateUnit}` : "";
    const precipActive = rainOn || (rate != null && rate > 0);
    const tempC = tempToCelsius(temp, tempUnit);
    const precipIcon = precipActive
      ? precipitationFromTemperature(tempC)?.icon || "rainy"
      : "cloudy";

    let value;
    let statusText = "";
    if (rainObj) {
      statusText = rainOn ? this._t("rain.wet") : this._t("rain.dry");
    }
    // Prefer numeric rate as the main value — status text is too long for narrow tiles.
    if (rate != null) {
      value = rateText;
    } else if (statusText) {
      value = statusText;
    } else if (today != null) {
      value = `${round(today, 1)} ${todayUnit}`;
    } else {
      value = "—";
    }

    const subParts = [];
    if (rate != null && statusText) subParts.push(statusText);
    if (today != null) {
      subParts.push(`${this._t("rain.today")} ${round(today, 1)} ${todayUnit}`);
    }
    let sub = "";
    if (subParts.length === 2) {
      sub = html`<span>${subParts[0]}</span><span class="dot">·</span
        ><span>${subParts[1]}</span>`;
    } else if (subParts.length === 1) {
      sub = subParts[0];
    }

    const key = rainObj
      ? "rain_entity"
      : rateObj
        ? "rain_rate_entity"
        : this._stateObj("precipitation_entity")
          ? "precipitation_entity"
          : "rain_today_entity";

    return this._tile({
      icon: precipIcon,
      label: this._t("sections.rain"),
      value,
      sub,
      key,
      accent: precipActive ? "var(--info-color, #2196f3)" : undefined,
    });
  }

  _renderWind() {
    const speedObj = this._stateObj("wind_speed_entity");
    if (!speedObj) return nothing;
    const s = this._config.settings || {};
    const speed = numericState(speedObj);
    const speedUnit = unit(speedObj, "m/s");
    const dirDeg = windDirectionDegrees(
      numericState(this._stateObj("wind_direction_entity")),
      s.invert_wind_direction
    );
    const compassKey = degToCompass(dirDeg);
    const compass = compassKey ? this._t(`compass.${compassKey}`) : null;
    const gustObj = this._stateObj("wind_gust_entity");
    const gust = numericState(gustObj);
    const gustUnit = unit(gustObj, speedUnit);
    const bft = s.show_beaufort ? beaufort(toMetersPerSecond(speed, speedUnit)) : null;
    const showGust = s.show_wind_gust && gust != null;

    const meta = [];
    if (compass) meta.push(compass);
    if (bft) meta.push(this._t("wind.beaufort", { value: bft.n }));
    if (bft) meta.push(this._t(`beaufort.${bft.key}`));
    if (showGust) {
      meta.push(
        this._t("wind.gust", {
          value: round(gust, 0),
          unit: gustUnit,
        })
      );
    }

    return html`
      <div
        class="tile wind ${this._clickable("wind_speed_entity") ? "tappable" : ""}"
        @click=${() => this._handleClick("wind_speed_entity")}
      >
        ${wscIcon("wind", "tile-icon", { value: bft ? bft.n : 0 })}
        <div class="tile-body">
          <div class="tile-label">${this._t("sections.wind")}</div>
          <div class="tile-value">
            ${speed != null ? `${round(speed, 1)} ${speedUnit}` : "—"}
          </div>
          ${meta.length
            ? html`<div class="tile-sub">
                ${meta.map(
                  (part, i) => html`${i
                      ? html`<span class="dot">·</span>`
                      : nothing}<span>${part}</span>`
                )}
              </div>`
            : nothing}
        </div>
      </div>
    `;
  }

  _renderCompass(deg, compass, { large = false } = {}) {
    // Labels use meteorological *from*; needle points where the wind blows *toward*.
    const needleDeg = ((Number(deg) + 180) % 360 + 360) % 360;
    this._needleTarget = needleDeg;
    // Needle hub at viewBox center (50,50). Scale keeps tips clear of N/E/S/W.
    // Rotation is applied in _startNeedleAnimation (smooth shortest-path easing).
    const initial =
      this._needleCurrent != null ? this._needleCurrent : needleDeg;
    return html`
      <div
        class="compass ${large ? "lg" : ""}"
        title="${compass || ""} (${round(deg, 0)}°)"
      >
        <svg
          class="needle-svg"
          viewBox="0 0 100 100"
          style="transform: rotate(${initial}deg) scale(0.7)"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="wsc-needle" x1="0.5" y1="1" x2="0.5" y2="0">
              <stop offset="0%" stop-color="#0A84FF"></stop>
              <stop offset="100%" stop-color="#64D2FF"></stop>
            </linearGradient>
          </defs>
          <path
            fill="url(#wsc-needle)"
            d="M50 16 L61 70 L50 61 L39 70 Z"
          ></path>
          <circle cx="50" cy="50" r="6.5" fill="url(#wsc-needle)"></circle>
          <circle cx="50" cy="50" r="2.8" fill="#fff" opacity="0.95"></circle>
        </svg>
        <span class="c-n">${this._t("compass.N")}</span>
        <span class="c-e">${this._t("compass.E")}</span>
        <span class="c-s">${this._t("compass.S")}</span>
        <span class="c-w">${this._t("compass.W")}</span>
      </div>
    `;
  }

  _renderCompassPanel() {
    const s = this._config.settings || {};
    const speedObj = this._stateObj("wind_speed_entity");
    const dirDeg = windDirectionDegrees(
      numericState(this._stateObj("wind_direction_entity")),
      s.invert_wind_direction
    );
    if (dirDeg == null && !speedObj) {
      this._needleTarget = null;
      return html`<div class="compass-panel empty">
        ${this._t("common.compass_configure")}
      </div>`;
    }
    if (dirDeg == null) this._needleTarget = null;

    const speed = numericState(speedObj);
    const speedUnit = unit(speedObj, "m/s");
    const compassKey = degToCompass(dirDeg);
    const compass = compassKey ? this._t(`compass.${compassKey}`) : null;
    const gustObj = this._stateObj("wind_gust_entity");
    const gust = numericState(gustObj);
    const gustUnit = unit(gustObj, speedUnit);
    const bft = s.show_beaufort
      ? beaufort(toMetersPerSecond(speed, speedUnit))
      : null;
    const showGust = s.show_wind_gust && gust != null;

    const meta = [];
    if (bft) meta.push(this._t("wind.beaufort", { value: bft.n }));
    if (bft) meta.push(this._t(`beaufort.${bft.key}`));
    if (showGust) {
      meta.push(
        this._t("wind.gust", {
          value: round(gust, 0),
          unit: gustUnit,
        })
      );
    }

    return html`
      <div
        class="compass-panel ${this._clickable("wind_direction_entity") ||
        this._clickable("wind_speed_entity")
          ? "tappable"
          : ""}"
        @click=${() =>
          this._handleClick(
            this._config.wind_direction_entity
              ? "wind_direction_entity"
              : "wind_speed_entity"
          )}
      >
        ${dirDeg != null
          ? this._renderCompass(dirDeg, compass, { large: true })
          : html`<div class="compass lg placeholder"></div>`}
        <div class="compass-panel-dir">${compass || "—"}</div>
        <div class="compass-panel-deg">
          ${dirDeg != null ? `${round(dirDeg, 0)}°` : "—"}
        </div>
        <div class="compass-panel-speed">
          ${speed != null ? `${round(speed, 1)} ${speedUnit}` : "—"}
        </div>
        ${meta.length
          ? html`<div class="compass-panel-meta">
              ${meta.map(
                (part, i) => html`${i
                    ? html`<span class="dot">·</span>`
                    : nothing}<span>${part}</span>`
              )}
            </div>`
          : nothing}
      </div>
    `;
  }

  /** Shortest signed delta from one bearing to another (−180…180]. */
  _shortestAngleDelta(from, to) {
    const a = ((Number(from) % 360) + 360) % 360;
    const b = ((Number(to) % 360) + 360) % 360;
    return ((b - a + 540) % 360) - 180;
  }

  _applyNeedleTransform(deg) {
    const el = this.renderRoot?.querySelector?.(".needle-svg");
    if (el) {
      el.style.transform = `rotate(${deg}deg) scale(0.7)`;
    }
  }

  _stopNeedleAnimation() {
    if (this._needleRaf) {
      cancelAnimationFrame(this._needleRaf);
      this._needleRaf = null;
    }
    this._needleLastTs = null;
  }

  /**
   * Ease the needle toward `_needleTarget` along the shortest arc, then keep
   * a gentle ±5° sway so it looks like a live compass.
   */
  _startNeedleAnimation() {
    if (this._needleRaf) return;
    const tau = 700;
    const swayAmp = 5;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const step = (now) => {
      const target = this._needleTarget;
      if (target == null) {
        this._needleRaf = null;
        this._needleLastTs = null;
        return;
      }

      if (this._needleCurrent == null) {
        this._needleCurrent = target;
      }

      const prev = this._needleLastTs ?? now;
      const dt = Math.min(48, Math.max(0, now - prev));
      this._needleLastTs = now;

      const delta = this._shortestAngleDelta(this._needleCurrent, target);
      const alpha = 1 - Math.exp(-dt / tau);
      this._needleCurrent += delta * alpha;

      // Organic wobble: two slow sines summing to ~±5°.
      const t = now * 0.001;
      const sway = reduceMotion
        ? 0
        : swayAmp *
          (0.62 * Math.sin(t * 1.35) + 0.38 * Math.sin(t * 2.1 + 1.1));

      this._applyNeedleTransform(this._needleCurrent + sway);
      this._needleRaf = requestAnimationFrame(step);
    };
    this._needleRaf = requestAnimationFrame(step);
  }

  _renderUv(uv) {
    if (!this._stateObj("uv_entity")) return nothing;
    const level = uvLevel(uv);
    const uvNum = uv != null ? round(uv, 0) : null;
    return this._tile({
      icon: "uv",
      iconOpts: {
        value: uvNum != null ? uvNum : "",
        color: level ? level.color : "#ffb300",
      },
      label: this._t("sections.uv"),
      value: uvNum != null ? `${uvNum}` : "—",
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
    const rate = numericState(this._stateObj("pressure_trend_entity"));
    const rateUnit = unit(this._stateObj("pressure_trend_entity"), "hPa/h");
    const rateText =
      rate != null && Math.abs(rate) >= 0.05
        ? `${rate > 0 ? "+" : ""}${round(rate, 2)} ${rateUnit}`
        : "";
    const decimals = /hpa|mbar|\bmb\b/i.test(unitStr) ? 0 : 1;
    return this._tile({
      icon: "gauge",
      label: this._t("sections.pressure"),
      value: value != null ? `${round(value, decimals)} ${unitStr}` : "—",
      sub: trend
        ? html`${this._t(`pressure.${trend.labelKey}`)}${rateText
            ? html`<span class="dot">·</span><span>${rateText}</span>`
            : nothing}`
        : rateText,
      key: "pressure_entity",
    });
  }

  _renderBattery() {
    const s = this._config.settings || {};
    if (!s.show_battery) return nothing;
    const obj = this._stateObj("battery_entity");
    const voltObj = s.show_voltage ? this._stateObj("voltage_entity") : null;
    const capObj = s.show_voltage
      ? this._stateObj("capacitor_voltage_entity")
      : null;
    if (!obj && !voltObj && !capObj) return nothing;
    const pct = numericState(obj);
    let accent;
    if (pct != null && pct < 15) accent = "var(--error-color, #e53935)";
    else if (pct != null && pct < 40) accent = "var(--warning-color, #ffa726)";

    const mv = numericState(voltObj);
    const voltUnit = unit(voltObj, "mV");
    let voltText = "";
    if (mv != null) {
      // Zigbee2MQTT reports mV; show volts when the number looks like millivolts.
      if (voltUnit.toLowerCase() === "mv" || mv >= 1000) {
        voltText = `${round(mv / 1000, 2)} V`;
      } else {
        voltText = `${round(mv, 0)} ${voltUnit}`;
      }
    }
    const cap = numericState(capObj);
    const capUnit = unit(capObj, "V");
    const capText =
      cap != null ? `${this._t("battery.capacitor")} ${round(cap, 2)} ${capUnit}` : "";

    let sub = "";
    if (voltText && capText) {
      sub = html`<span>${voltText}</span><span class="dot">·</span
        ><span>${capText}</span>`;
    } else {
      sub = voltText || capText;
    }

    return this._tile({
      icon: batteryIcon(pct),
      label: this._t("sections.battery"),
      value:
        pct != null
          ? `${round(pct, 0)}%`
          : voltText || (cap != null ? `${round(cap, 2)} ${capUnit}` : "—"),
      sub: pct != null ? sub : capText && voltText ? capText : "",
      key: obj
        ? "battery_entity"
        : voltObj
          ? "voltage_entity"
          : "capacitor_voltage_entity",
      accent,
    });
  }

  static get styles() {
    return css`
      :host {
        --wsc-radius: 18px;
        --wsc-gap: 10px;
        /* Derive muted text from primary so contrast stays OK in light & dark themes
           even when --secondary-text-color is too dark for nested card surfaces. */
        --wsc-muted-text: color-mix(
          in srgb,
          var(--primary-text-color, #fff) 78%,
          transparent
        );
        container-type: inline-size;
        container-name: wsc;
        display: block;
        color: var(--primary-text-color);
      }
      ha-card {
        overflow: hidden;
      }
      .wsc {
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-width: 0;
      }
      .wsc.full {
        gap: 8px;
      }
      .wsc.compact {
        gap: 6px;
        padding: 10px;
      }
      @container wsc (min-width: 520px) {
        .wsc.full {
          padding: 12px;
          gap: 10px;
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
        grid-template-columns: auto minmax(0, 1fr);
        align-items: center;
        gap: 16px 22px;
        padding: 18px 22px;
        border-radius: var(--wsc-radius);
        background: var(--ha-card-background, var(--card-background-color, #fff));
        box-shadow: inset 0 0 0 1px var(--divider-color, rgba(0, 0, 0, 0.08));
      }
      .hero.has-time {
        grid-template-columns: auto minmax(0, 1fr) auto;
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

      .hero-icon-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        align-self: stretch;
        padding: 0 4px 0 0;
      }

      .hero-icon {
        width: 100px;
        height: 100px;
        overflow: visible;
      }
      .hero-icon.animated .icon-spin {
        transform-box: view-box;
        animation: wsc-spin 18s linear infinite;
      }
      .hero-icon.animated .icon-spin-slow {
        animation-duration: 28s;
      }
      .hero-icon.animated .icon-drift {
        animation: wsc-drift 5.5s ease-in-out infinite;
      }
      .hero-icon.animated .icon-drop {
        transform-box: fill-box;
        transform-origin: center top;
        animation: wsc-drop 1s linear infinite;
        will-change: transform, opacity;
      }
      @keyframes wsc-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes wsc-drift {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(3px); }
      }
      @keyframes wsc-drop {
        0% { transform: translate3d(0, -16px, 0); opacity: 0; }
        10% { opacity: 0.95; }
        90% { opacity: 0.95; }
        100% { transform: translate3d(0, 24px, 0); opacity: 0; }
      }
      @media (prefers-reduced-motion: reduce) {
        .hero-icon.animated .icon-spin,
        .hero-icon.animated .icon-drift,
        .hero-icon.animated .icon-drop {
          animation: none;
        }
      }
      .hero-main {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }
      .hero-condition {
        font-size: 0.95rem;
        color: var(--wsc-muted-text, var(--secondary-text-color));
        margin-bottom: 2px;
      }
      .hero-temp {
        font-size: 2.15rem;
        font-weight: 650;
        line-height: 1.05;
        color: var(--primary-text-color);
        letter-spacing: -0.02em;
        font-variant-numeric: tabular-nums;
      }
      .hero-time-col {
        flex: 0 0 auto;
        align-self: center;
        padding-left: 12px;
        font-size: 4.5rem;
        font-weight: 650;
        line-height: 1;
        color: var(--primary-text-color);
        letter-spacing: -0.02em;
        font-variant-numeric: tabular-nums;
        text-align: right;
        white-space: nowrap;
      }
      .hero-minmax {
        display: flex;
        gap: 12px;
        margin-top: 4px;
        font-size: 0.95rem;
        font-weight: 550;
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
      .hero-stats {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 10px 22px;
        margin-top: 8px;
      }
      .hero-stat {
        display: flex;
        flex-direction: column;
        gap: 1px;
        min-width: 0;
      }
      .hero-stat-label {
        font-size: 0.72rem;
        font-weight: 550;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        color: var(--wsc-muted-text, var(--secondary-text-color));
      }
      .hero-stat-value {
        font-size: 1.05rem;
        font-weight: 650;
        line-height: 1.15;
        color: var(--primary-text-color);
      }
      .hero-stat-comfort {
        font-size: 0.92rem;
        font-weight: 550;
      }
      .hero-stat-rain .hero-stat-label {
        text-transform: none;
        letter-spacing: 0;
        font-size: 0.8rem;
        font-weight: 500;
      }
      .dot {
        margin: 0 3px;
        opacity: 0.6;
      }

      /* Sun path panel — same surface as hero / tiles in light and dark mode */
      .sun-panel {
        padding: 6px 12px 8px;
        border-radius: var(--wsc-radius);
        background: var(--ha-card-background, var(--card-background-color, #fff));
        box-shadow: inset 0 0 0 1px var(--divider-color, rgba(0, 0, 0, 0.08));
        overflow: hidden;
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
      /* Night palette: cooler path colours only — panel chrome stays like other boxes. */
      .sun-panel.night-palette {
        --wsc-night-color: #5b7fd6;
      }
      .sun-panel.night-palette .dot.day.past {
        fill: #e8961e;
        opacity: 1;
      }
      .sun-panel.night-palette .dot.day.future {
        fill: #c4a06a;
        opacity: 0.35;
      }
      .sun-panel.night-palette .dot.night.past {
        fill: #5b7fd6;
        opacity: 1;
      }
      .sun-panel.night-palette .dot.night.future {
        opacity: 0.4;
      }
      .sun-panel.night-palette .sun-horizon {
        stroke: var(--primary-text-color, #3a3a3a);
        stroke-opacity: 0.35;
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
        z-index: 4;
        pointer-events: none;
        transition: left 0.6s ease, top 0.6s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: radial-gradient(
          circle,
          rgba(255, 177, 0, 0.35) 0%,
          rgba(255, 177, 0, 0.12) 45%,
          rgba(255, 177, 0, 0) 72%
        );
        box-shadow: 0 0 12px rgba(255, 177, 0, 0.45);
      }
      .sun-marker .wsc-icon,
      .sun-marker-icon {
        width: 30px;
        height: 30px;
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
      }
      .sun-marker.night {
        background: radial-gradient(
          circle,
          rgba(91, 127, 214, 0.3) 0%,
          rgba(91, 127, 214, 0.1) 45%,
          rgba(91, 127, 214, 0) 72%
        );
        box-shadow: 0 0 12px rgba(91, 127, 214, 0.4);
      }
      .sun-marker.night .wsc-icon,
      .sun-marker.night .sun-marker-icon {
        width: 26px;
        height: 26px;
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
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
        color: var(--wsc-muted-text, var(--secondary-text-color));
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
        gap: 6px;
        min-width: 0;
      }
      /* Prefer 2 columns in typical phone / half-width panels so labels fit.
         3+ columns only when each tile has enough room. */
      @container wsc (max-width: 300px) {
        .grid {
          grid-template-columns: 1fr;
        }
      }
      @container wsc (min-width: 640px) {
        .grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }
      @container wsc (min-width: 920px) {
        .grid {
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
        }
      }
      @container wsc (max-width: 560px) {
        .tile {
          gap: 7px;
          padding: 8px 9px;
          align-items: center;
        }
        .tile-icon,
        .tile-icon .wsc-icon {
          width: 22px;
          height: 22px;
          margin-top: 0;
        }
        .tile-label {
          font-size: 0.62rem;
          letter-spacing: 0.02em;
        }
        .tile-value {
          font-size: 0.92rem;
        }
        .tile-sub {
          font-size: 0.7rem;
          line-height: 1.2;
        }
        .sun-panel {
          padding: 4px 8px 6px;
        }
        .sun-center {
          gap: 10px;
          top: 40%;
        }
        .sun-stat-value {
          font-size: 0.9rem;
        }
        .sun-stat-label {
          font-size: 0.58rem;
        }
        .sun-edge {
          font-size: 0.85rem;
        }
      }
      @container wsc (max-width: 520px) {
        .hero.has-time {
          grid-template-columns: auto minmax(0, 1fr) auto;
        }
        .hero.has-time.hide-time-mobile {
          grid-template-columns: auto minmax(0, 1fr);
        }
        .hero.hide-time-mobile .hero-time-col {
          display: none;
        }
        .hero-time-col {
          font-size: 3.5rem;
          padding-left: 8px;
        }
        .hero-stats {
          gap: 8px 16px;
        }
        .hero-stat {
          min-width: 72px;
        }
      }
      @container wsc (max-width: 420px) {
        .hero {
          gap: 12px 14px;
          padding: 14px 16px;
        }
        .hero-icon {
          width: 75px;
          height: 75px;
        }
        .hero-time-col {
          font-size: 3rem;
        }
        .hero-temp {
          font-size: 1.75rem;
        }
        .hero-stat-value {
          font-size: 0.95rem;
        }
      }
      /* Fallback when container queries are unavailable */
      @supports not (container-type: inline-size) {
        @media (max-width: 360px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
        @media (min-width: 680px) {
          .grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (min-width: 960px) {
          .grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
      }

      .tile {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 10px;
        border-radius: 14px;
        background: var(--ha-card-background, var(--card-background-color, #fff));
        box-shadow: inset 0 0 0 1px var(--divider-color, rgba(0, 0, 0, 0.08));
        min-height: 0;
        min-width: 0;
        overflow: hidden;
        box-sizing: border-box;
      }
      .tile-icon {
        width: 24px;
        height: 24px;
        color: var(--tile-accent, var(--state-icon-color, var(--primary-color)));
        flex: 0 0 auto;
      }
      .tile-icon .wsc-icon {
        width: 24px;
        height: 24px;
      }
      .tile-body {
        display: flex;
        flex-direction: column;
        gap: 1px;
        min-width: 0;
        flex: 1 1 auto;
        overflow: hidden;
      }
      .tile-label {
        font-size: 0.65rem;
        text-transform: uppercase;
        letter-spacing: 0.02em;
        line-height: 1.15;
        color: var(--wsc-muted-text, var(--secondary-text-color));
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tile-value {
        font-size: 0.98rem;
        font-weight: 600;
        line-height: 1.2;
        color: var(--primary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tile-sub {
        font-size: 0.72rem;
        color: var(--wsc-muted-text, var(--secondary-text-color));
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 2px 4px;
        line-height: 1.2;
        white-space: normal;
        overflow: hidden;
      }
      .mini-icon {
        width: 14px;
        height: 14px;
      }

      .compass {
        position: relative;
        width: 52px;
        height: 52px;
        border-radius: 50%;
        flex: 0 0 auto;
        box-shadow: inset 0 0 0 1px var(--divider-color, rgba(0, 0, 0, 0.15));
        color: var(--wsc-muted-text, var(--secondary-text-color));
        font-size: 0.6rem;
      }
      .compass.lg {
        width: min(70vw, 220px);
        height: min(70vw, 220px);
        font-size: 1rem;
        font-weight: 600;
        box-shadow: inset 0 0 0 1.5px var(--divider-color, rgba(0, 0, 0, 0.18));
      }
      .compass.lg.placeholder {
        opacity: 0.35;
      }
      .compass .needle-svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        transform-origin: 50% 50%;
        pointer-events: none;
        overflow: visible;
        z-index: 1;
        will-change: transform;
      }
      .compass span {
        position: absolute;
        transform: translate(-50%, -50%);
        z-index: 2;
      }
      .compass .c-n { top: 8px; left: 50%; }
      .compass .c-s { top: 44px; left: 50%; }
      .compass .c-e { top: 50%; left: 44px; }
      .compass .c-w { top: 50%; left: 8px; }
      .compass.lg .c-n { top: 18px; }
      .compass.lg .c-s { top: calc(100% - 18px); }
      .compass.lg .c-e { left: calc(100% - 18px); }
      .compass.lg .c-w { left: 18px; }

      .compass-only {
        padding: 8px 12px 16px;
      }
      .compass-panel {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 12px 8px 8px;
        text-align: center;
      }
      .compass-panel.empty {
        padding: 28px 16px;
        color: var(--wsc-muted-text, var(--secondary-text-color));
        font-size: 0.9rem;
      }
      .compass-panel-dir {
        margin-top: 8px;
        font-size: 1.75rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        line-height: 1.1;
      }
      .compass-panel-deg {
        font-size: 1rem;
        color: var(--wsc-muted-text, var(--secondary-text-color));
      }
      .compass-panel-speed {
        margin-top: 4px;
        font-size: 1.35rem;
        font-weight: 650;
      }
      .compass-panel-meta {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 4px 6px;
        font-size: 0.85rem;
        color: var(--wsc-muted-text, var(--secondary-text-color));
      }
      .compass-panel-meta .dot {
        opacity: 0.55;
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

class WeatherStationCompassCard extends WeatherStationCard {
  static getStubConfig() {
    return {
      type: `custom:${COMPASS_CARD_NAME}`,
      title: "Compass",
      wind_direction_entity: "",
      wind_speed_entity: "",
      settings: {
        compass_only: true,
        show_beaufort: true,
        show_wind_gust: true,
        invert_wind_direction: false,
        show_interactions: true,
      },
    };
  }

  setConfig(config) {
    super.setConfig({
      ...config,
      type: config?.type || `custom:${COMPASS_CARD_NAME}`,
      settings: {
        ...(config?.settings || {}),
        compass_only: true,
      },
    });
  }
}

if (!customElements.get(COMPASS_CARD_NAME)) {
  customElements.define(COMPASS_CARD_NAME, WeatherStationCompassCard);
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
if (!window.customCards.find((c) => c.type === COMPASS_CARD_NAME)) {
  window.customCards.push({
    type: COMPASS_CARD_NAME,
    name: "Weather Station Compass",
    description: "Large standalone wind compass with smooth needle.",
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

export { WeatherStationCard, WeatherStationCompassCard };
