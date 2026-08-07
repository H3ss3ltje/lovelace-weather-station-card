import { LitElement, html, css, nothing } from "lit";
import { handleAction, hasAction } from "custom-card-helpers";

import {
  CARD_VERSION,
  CARD_NAME,
  EDITOR_NAME,
  DEFAULT_SETTINGS,
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
  sunPathSegments,
  toMetersPerSecond,
  beaufort,
  SUN_PATH_D,
} from "./utils.js";
import { localize } from "./localize/localize.js";

import "./editor.js";

class WeatherStationCard extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
      _expanded: { state: true },
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
    this._config = {
      ...config,
      settings: { ...DEFAULT_SETTINGS, ...(config.settings || {}) },
    };
    this._pressureHistory = this._pressureHistory || [];
    this._tempStats = this._tempStats || null;
    if (this._expanded === undefined) this._expanded = false;
  }

  getCardSize() {
    return 6;
  }

  _t(key, replace) {
    return localize(this.hass, key, replace);
  }

  _toggleExpanded(ev) {
    ev.stopPropagation();
    this._expanded = !this._expanded;
  }

  // Track today's min/max in memory (reset at local midnight). Used only when
  // dedicated min/max entities are not configured.
  _recordTemp(temp) {
    if (temp == null) return;
    const day = new Date().toDateString();
    if (!this._tempStats || this._tempStats.day !== day) {
      this._tempStats = { day, min: temp, max: temp };
    } else {
      this._tempStats.min = Math.min(this._tempStats.min, temp);
      this._tempStats.max = Math.max(this._tempStats.max, temp);
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
      return { icon: "mdi:trending-neutral", labelKey: "steady" };
    }
    const oldest = this._pressureHistory[0].v;
    const pct = ((value - oldest) / oldest) * 100;
    if (pct >= threshold) return { icon: "mdi:arrow-up", labelKey: "rising" };
    if (pct <= -threshold) return { icon: "mdi:arrow-down", labelKey: "falling" };
    return { icon: "mdi:trending-neutral", labelKey: "steady" };
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
        sunny: { icon: "mdi:weather-sunny", labelKey: "clear_sky" },
        cloudy: { icon: "mdi:weather-cloudy", labelKey: "cloudy" },
        rainy: { icon: "mdi:weather-rainy", labelKey: "rain" },
        night: { icon: "mdi:weather-night", labelKey: "clear_night" },
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
        <div class="wsc">
          ${title ? html`<div class="title">${title}</div>` : nothing}

          ${this._renderHero(condition, temp, tempUnit, humidity)}
          ${this._renderSun()}

          <div class="grid">
            ${this._renderLux(lux)}
            ${this._renderTemperature(temp, tempUnit)}
            ${this._renderHumidity(humidity)}
            ${this._renderRain(rainObj, rainOn, rainMm)}
            ${this._renderWind()}
            ${this._renderUv(uv)}
            ${this._renderPressure()}
            ${this._renderBattery()}
          </div>

          ${this._renderExpand(temp, tempUnit, humidity)}
        </div>
      </ha-card>
    `;
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
    const seg = sunPathSegments(pos.t);
    // Day: thick solid path already travelled, thin dashed path still ahead.
    // Night: full arc stays thin; moon sits under the horizon line.
    const beforeD = isNight ? "" : seg.beforeD;
    const afterD = isNight ? SUN_PATH_D : seg.afterD;

    // Full-height scene: tall dome above the horizon (y=60) with clear space
    // below it so the night moon reads as "under the horizon".
    const VB_Y = 0;
    const VB_H = 84;
    const HORIZON_Y = 60;
    const sunLeft = `${(pos.x / 200) * 100}%`;
    const sunTop = `${((pos.y - VB_Y) / VB_H) * 100}%`;
    // Moon centered under the horizon, not on it.
    const moonTop = `${((72 - VB_Y) / VB_H) * 100}%`;

    const elevLabel = Number.isFinite(elevation) ? `${round(elevation, 1)}°` : "—";
    const azLabel = Number.isFinite(azimuth) ? `${round(azimuth, 0)}°` : "—";
    const tapKey = sun ? "sun_entity" : azObj ? "azimuth_entity" : "elevation_entity";

    return html`
      <div
        class="sun-panel ${this._clickable(tapKey) ? "tappable" : ""}"
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
              x1="8"
              y1=${HORIZON_Y}
              x2="192"
              y2=${HORIZON_Y}
            />
            <path class="sun-arc sun-arc-after" d=${afterD} fill="none" />
            <path class="sun-arc sun-arc-before" d=${beforeD} fill="none" />
          </svg>

          ${isNight
            ? html`<ha-icon
                class="sun-marker night"
                style="left:50%;top:${moonTop}"
                .icon=${"mdi:weather-night"}
              ></ha-icon>`
            : html`<ha-icon
                class="sun-marker day"
                style="left:${sunLeft};top:${sunTop}"
                .icon=${"mdi:white-balance-sunny"}
              ></ha-icon>`}

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
                <div class="sun-edge sun-edge-rise">${sunrise || "—"}</div>
                <div class="sun-edge sun-edge-set">${sunset || "—"}</div>
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
    return html`
      <div
        class="hero ${this._clickable("temperature_entity") ? "tappable" : ""}"
        @click=${() => this._handleClick("temperature_entity")}
      >
        <ha-icon class="hero-icon" .icon=${condition.icon}></ha-icon>
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
                  <ha-icon .icon=${"mdi:arrow-down-thin"}></ha-icon>
                  ${round(minmax.min, 1)}°
                </span>
                <span class="mm mm-max">
                  <ha-icon .icon=${"mdi:arrow-up-thin"}></ha-icon>
                  ${round(minmax.max, 1)}°
                </span>
              </div>`
            : nothing}
        </div>
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
        <ha-icon
          class="tile-icon"
          style=${accent ? `--tile-accent:${accent}` : ""}
          .icon=${icon}
        ></ha-icon>
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
      icon: level ? level.icon : "mdi:brightness-7",
      label: this._t("sections.light"),
      value: formatLux(lux),
      sub: level ? this._t(`lux.${level.labelKey}`) : "",
      key: "lux_entity",
    });
  }

  _renderTemperature(temp, tempUnit) {
    if (!this._stateObj("temperature_entity")) return nothing;
    return this._tile({
      icon: "mdi:thermometer",
      label: this._t("sections.temperature"),
      value: temp != null ? `${round(temp, 1)} ${tempUnit}` : "—",
      key: "temperature_entity",
    });
  }

  _renderHumidity(humidity) {
    if (!this._stateObj("humidity_entity")) return nothing;
    return this._tile({
      icon: "mdi:water-percent",
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
      icon: rainOn ? "mdi:weather-rainy" : "mdi:weather-partly-rainy",
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
        <div class="wind-info">
          <ha-icon class="tile-icon" .icon=${"mdi:weather-windy"}></ha-icon>
          <div class="tile-body">
            <div class="tile-label">${this._t("sections.wind")}</div>
            <div class="tile-value">
              ${speed != null ? `${round(speed, 1)} ${speedUnit}` : "—"}
            </div>
            ${compass ? html`<div class="tile-sub">${compass}</div>` : nothing}
            ${bft
              ? html`<div class="tile-sub">
                  ${this._t("wind.beaufort", { value: bft.n })}
                  <span class="dot">·</span> ${this._t(`beaufort.${bft.key}`)}
                </div>`
              : nothing}
            ${s.show_wind_gust && gust != null
              ? html`<div class="tile-sub">
                  <ha-icon class="mini-icon" .icon=${"mdi:weather-windy-variant"}></ha-icon>
                  ${this._t("wind.gust", {
                    value: round(gust, 0),
                    unit: gustUnit,
                  })}
                </div>`
              : nothing}
          </div>
        </div>
        ${dirDeg != null ? this._renderCompass(dirDeg, compass) : nothing}
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
          <ha-icon .icon=${"mdi:navigation"}></ha-icon>
        </div>
      </div>
    `;
  }

  _renderUv(uv) {
    if (!this._stateObj("uv_entity")) return nothing;
    const level = uvLevel(uv);
    return this._tile({
      icon: "mdi:sun-wireless",
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
      icon: "mdi:gauge",
      label: this._t("sections.pressure"),
      value: value != null ? `${round(value, 0)} ${unitStr}` : "—",
      sub: trend
        ? html`<ha-icon class="mini-icon" .icon=${trend.icon}></ha-icon>
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

  _renderExpand(temp, tempUnit, humidity) {
    const s = this._config.settings || {};
    if (!s.show_expand) return nothing;

    const rows = [];
    const dew = calcDewPoint(temp, humidity);
    if (dew != null)
      rows.push({ label: this._t("sections.dewpoint"), value: `${round(dew, 1)} ${tempUnit}` });

    const mm = this._todayMinMax();
    if (mm) {
      rows.push({ label: this._t("details.min_today"), value: `${round(mm.min, 1)} ${tempUnit}` });
      rows.push({ label: this._t("details.max_today"), value: `${round(mm.max, 1)} ${tempUnit}` });
    }

    const todayObj = this._stateObj("rain_today_entity");
    const rainToday = numericState(todayObj);
    if (rainToday != null)
      rows.push({
        label: this._t("details.rain_today"),
        value: `${round(rainToday, 1)} ${unit(todayObj, "mm")}`,
      });

    const speedObj = this._stateObj("wind_speed_entity");
    const bft = beaufort(
      toMetersPerSecond(numericState(speedObj), unit(speedObj, "m/s"))
    );
    if (bft)
      rows.push({
        label: this._t("details.beaufort"),
        value: `${this._t("wind.beaufort", { value: bft.n })} · ${this._t(
          `beaufort.${bft.key}`
        )}`,
      });

    const gustObj = this._stateObj("wind_gust_entity");
    const gust = numericState(gustObj);
    if (gust != null)
      rows.push({
        label: this._t("details.wind_gust"),
        value: `${round(gust, 0)} ${unit(gustObj, "m/s")}`,
      });

    const sunObj = this._stateObj("sun_entity");
    if (sunObj) {
      const rise = formatSunTime(this.hass, sunObj.attributes?.next_rising);
      const set = formatSunTime(this.hass, sunObj.attributes?.next_setting);
      if (rise) rows.push({ label: this._t("sun.sunrise"), value: rise });
      if (set) rows.push({ label: this._t("sun.sunset"), value: set });
    }

    if (!rows.length) return nothing;

    return html`
      <button class="details-toggle" @click=${this._toggleExpanded}>
        <span>${this._t(this._expanded ? "details.less" : "details.more")}</span>
        <ha-icon
          .icon=${this._expanded ? "mdi:chevron-up" : "mdi:chevron-down"}
        ></ha-icon>
      </button>
      ${this._expanded
        ? html`<div class="details">
            ${rows.map(
              (r) => html`<div class="detail">
                <span class="detail-label">${r.label}</span>
                <span class="detail-value">${r.value}</span>
              </div>`
            )}
          </div>`
        : nothing}
    `;
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
        padding: 14px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        min-width: 0;
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
      .hero-icon {
        grid-row: 1 / 3;
        --mdc-icon-size: 46px;
        color: var(--state-icon-color, var(--primary-color));
      }
      .hero-main {
        display: flex;
        flex-direction: column;
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
      .hero-minmax .mm ha-icon {
        --mdc-icon-size: 15px;
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
      .sun-scene {
        position: relative;
        width: 100%;
        max-width: 460px;
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
      /* Single dotted arc; thickness changes before vs after the sun. */
      .sun-arc {
        stroke: #e8961e;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      /* Path already travelled by the sun: thick dots. */
      .sun-arc-before {
        stroke-width: 2.6;
        stroke-dasharray: 0.1 5;
        opacity: 1;
      }
      /* Path still to come: thin dots, softer. */
      .sun-arc-after {
        stroke-width: 1.4;
        stroke-dasharray: 0.1 5.5;
        opacity: 0.5;
      }
      .sun-scene.night .sun-arc-after {
        opacity: 0.4;
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
        --mdc-icon-size: 26px;
        color: #ffc107;
        filter: drop-shadow(0 0 6px rgba(255, 193, 7, 0.55));
        z-index: 2;
        pointer-events: none;
        transition: left 0.6s ease, top 0.6s ease;
      }
      .sun-marker.night {
        color: #cfd8e3;
        filter: drop-shadow(0 0 5px rgba(207, 216, 227, 0.45));
        --mdc-icon-size: 22px;
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
      .sun-edge {
        position: absolute;
        bottom: 2px;
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--secondary-text-color);
        z-index: 1;
      }
      .sun-edge-rise {
        left: 2%;
      }
      .sun-edge-set {
        right: 2%;
      }

      .details-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        width: 100%;
        padding: 6px;
        border: none;
        background: none;
        cursor: pointer;
        font: inherit;
        font-size: 0.85rem;
        font-weight: 500;
        color: var(--secondary-text-color);
        border-radius: 10px;
      }
      .details-toggle:hover {
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
        color: var(--primary-text-color);
      }
      .details-toggle ha-icon {
        --mdc-icon-size: 18px;
      }
      .details {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 6px 16px;
        padding: 4px 6px 6px;
      }
      @container wsc (max-width: 320px) {
        .details {
          grid-template-columns: 1fr;
        }
      }
      .detail {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        font-size: 0.85rem;
        padding: 3px 0;
        border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.06));
      }
      .detail-label {
        color: var(--secondary-text-color);
      }
      .detail-value {
        color: var(--primary-text-color);
        font-weight: 500;
        text-align: right;
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
      }

      .tile {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px;
        border-radius: var(--wsc-radius);
        background: var(--ha-card-background, var(--card-background-color, #fff));
        box-shadow: inset 0 0 0 1px var(--divider-color, rgba(0, 0, 0, 0.08));
        min-height: 56px;
        min-width: 0;
        overflow: hidden;
        box-sizing: border-box;
      }
      .tile-icon {
        --mdc-icon-size: 24px;
        color: var(--tile-accent, var(--state-icon-color, var(--primary-color)));
        flex: 0 0 auto;
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
      .mini-icon {
        --mdc-icon-size: 15px;
      }

      .wind {
        justify-content: space-between;
        grid-column: span 1;
      }
      @container wsc (min-width: 480px) {
        .wind:has(.compass) {
          grid-column: span 2;
        }
      }
      .wind-info {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
        flex: 1 1 auto;
        overflow: hidden;
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
      .compass .needle ha-icon {
        --mdc-icon-size: 22px;
        color: var(--primary-color);
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
