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
} from "./utils.js";
import { localize } from "./localize/localize.js";

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
    this._config = {
      ...config,
      settings: { ...DEFAULT_SETTINGS, ...(config.settings || {}) },
    };
    this._pressureHistory = this._pressureHistory || [];
  }

  getCardSize() {
    return 6;
  }

  _t(key, replace) {
    return localize(this.hass, key, replace);
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
        </div>
      </ha-card>
    `;
  }

  _renderSun() {
    const s = this._config.settings || {};
    if (!s.show_sun) return nothing;
    const sun = this._stateObj("sun_entity");
    if (!sun) return nothing;

    const attrs = sun.attributes || {};
    const above = sun.state === "above_horizon";
    const elevation = Number(attrs.elevation);
    const azimuth = Number(attrs.azimuth);
    const sunrise = formatSunTime(this.hass, attrs.next_rising);
    const sunset = formatSunTime(this.hass, attrs.next_setting);
    const pos = sunDiagramPosition(azimuth, elevation, above);
    const elevLabel = Number.isFinite(elevation) ? `${round(elevation, 1)}°` : "—";
    const azLabel = Number.isFinite(azimuth) ? `${round(azimuth, 0)}°` : "—";

    return html`
      <div
        class="sun-panel ${this._clickable("sun_entity") ? "tappable" : ""}"
        @click=${() => this._handleClick("sun_entity")}
      >
        <div class="sun-diagram" aria-hidden="true">
          <svg viewBox="0 0 200 110" xmlns="http://www.w3.org/2000/svg">
            <path
              class="sun-arc"
              d="M 28 88 A 72 72 0 0 1 172 88"
              fill="none"
            />
            <line class="sun-horizon" x1="16" y1="88" x2="184" y2="88" />
            <circle
              class="sun-disc ${above ? "day" : "night"}"
              cx="${pos.x}"
              cy="${pos.y}"
              r="9"
            />
          </svg>
        </div>

        <div class="sun-times">
          <div class="sun-time">
            <ha-icon .icon=${"mdi:weather-sunset-up"}></ha-icon>
            <div>
              <div class="sun-time-label">${this._t("sun.sunrise")}</div>
              <div class="sun-time-value">${sunrise || "—"}</div>
            </div>
          </div>
          <div class="sun-time">
            <ha-icon .icon=${"mdi:weather-sunset-down"}></ha-icon>
            <div>
              <div class="sun-time-label">${this._t("sun.sunset")}</div>
              <div class="sun-time-value">${sunset || "—"}</div>
            </div>
          </div>
        </div>

        <div class="sun-meta">
          <div class="sun-meta-item">
            <span class="sun-meta-label">${this._t("sun.azimuth")}</span>
            <span class="sun-meta-value">${azLabel}</span>
          </div>
          <div class="sun-meta-item">
            <span class="sun-meta-label">${this._t("sun.elevation")}</span>
            <span class="sun-meta-value">${elevLabel}</span>
          </div>
        </div>
      </div>
    `;
  }

  _renderHero(condition, temp, tempUnit, humidity) {
    const s = this._config.settings || {};
    const dew = s.show_dewpoint ? calcDewPoint(temp, humidity) : null;
    const comfort = comfortKey(temp, humidity);
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
    if (!rainObj) return nothing;
    const unitStr = unit(rainObj, "mm/h");
    return this._tile({
      icon: rainOn ? "mdi:weather-rainy" : "mdi:weather-partly-rainy",
      label: this._t("sections.rain"),
      value: rainOn ? this._t("rain.detected") : this._t("rain.dry"),
      sub: rainMm != null ? `${round(rainMm, 1)} ${unitStr}` : "",
      key: "rain_entity",
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

  static get styles() {
    return css`
      :host {
        --wsc-radius: 18px;
        --wsc-gap: 10px;
      }
      ha-card {
        overflow: hidden;
      }
      .wsc {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 14px;
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

      /* Sun path panel */
      .sun-panel {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 12px 14px 14px;
        border-radius: var(--wsc-radius);
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }
      .sun-diagram {
        width: 100%;
        max-width: 280px;
        margin: 0 auto;
      }
      .sun-diagram svg {
        width: 100%;
        height: auto;
        display: block;
      }
      .sun-arc {
        stroke: var(--divider-color, rgba(127, 127, 127, 0.45));
        stroke-width: 2;
        stroke-dasharray: 4 5;
        stroke-linecap: round;
      }
      .sun-horizon {
        stroke: var(--secondary-text-color);
        stroke-width: 1.5;
        opacity: 0.55;
      }
      .sun-disc {
        fill: var(--amber-color, #ffb300);
        stroke: var(--ha-card-background, var(--card-background-color, #fff));
        stroke-width: 2;
      }
      .sun-disc.night {
        fill: var(--disabled-text-color, #9e9e9e);
        opacity: 0.85;
      }
      .sun-times {
        display: flex;
        justify-content: space-between;
        gap: 12px;
      }
      .sun-time {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 0;
      }
      .sun-time ha-icon {
        --mdc-icon-size: 22px;
        color: var(--state-icon-color, var(--primary-color));
      }
      .sun-time-label {
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--secondary-text-color);
      }
      .sun-time-value {
        font-size: 1.05rem;
        font-weight: 600;
        color: var(--primary-text-color);
      }
      .sun-meta {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }
      .sun-meta-item {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 8px;
        padding: 6px 10px;
        border-radius: 12px;
        background: var(--ha-card-background, var(--card-background-color, transparent));
        box-shadow: inset 0 0 0 1px var(--divider-color, rgba(0, 0, 0, 0.06));
      }
      .sun-meta-label {
        font-size: 0.75rem;
        color: var(--secondary-text-color);
      }
      .sun-meta-value {
        font-size: 0.95rem;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--wsc-gap);
      }
      @media (min-width: 500px) {
        .grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }

      .tile {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 14px;
        border-radius: var(--wsc-radius);
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
        min-height: 56px;
      }
      .tile-icon {
        --mdc-icon-size: 26px;
        color: var(--tile-accent, var(--state-icon-color, var(--primary-color)));
        flex: 0 0 auto;
      }
      .tile-body {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .tile-label {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--secondary-text-color);
      }
      .tile-value {
        font-size: 1.05rem;
        font-weight: 600;
        color: var(--primary-text-color);
        white-space: nowrap;
      }
      .tile-sub {
        font-size: 0.8rem;
        color: var(--secondary-text-color);
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .mini-icon {
        --mdc-icon-size: 15px;
      }

      .wind {
        justify-content: space-between;
      }
      .wind-info {
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 0;
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
