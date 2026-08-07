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
  comfortLabel,
  degToCompass,
  luxLevel,
  formatLux,
  uvLevel,
  batteryIcon,
  deriveCondition,
  isRainDetected,
  round,
  unit,
} from "./utils.js";

import "./editor.js";

class WeatherStationCard extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
    };
  }

  // Home Assistant calls this to build the visual editor.
  static async getConfigElement() {
    return document.createElement(EDITOR_NAME);
  }

  // Used by the "add card" picker to prefill a stub config.
  static getStubConfig() {
    return {
      type: `custom:${CARD_NAME}`,
      title: "Weather Station",
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
      title: "Weather Station",
      ...config,
      settings: { ...DEFAULT_SETTINGS, ...(config.settings || {}) },
    };
    // In-memory pressure buffer for the optional trend indicator.
    this._pressureHistory = this._pressureHistory || [];
  }

  getCardSize() {
    return 6;
  }

  shouldUpdate(changedProps) {
    if (!this._config) return false;
    // custom-card-helpers only watches a single `config.entity`, but this
    // card uses many `*_entity` keys — so we do our own change detection.
    if (changedProps.has("_config")) return true;
    if (!changedProps.has("hass")) return true;

    const oldHass = changedProps.get("hass");
    if (!oldHass) return true;

    return ENTITY_FIELDS.some(({ key }) => {
      const entity = this._config[key];
      if (!entity) return false;
      return oldHass.states[entity] !== this.hass.states[entity];
    });
  }

  // ---- helpers -----------------------------------------------------------

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
    // No sun entity: fall back to a lux threshold if present, else assume day.
    const lux = numericState(this._stateObj("lux_entity"));
    if (lux != null) return lux > 50;
    return true;
  }

  _recordPressure(value) {
    if (value == null) return;
    const now = Date.now();
    this._pressureHistory.push({ t: now, v: value });
    // keep last ~3 hours
    const cutoff = now - 3 * 60 * 60 * 1000;
    this._pressureHistory = this._pressureHistory.filter((p) => p.t >= cutoff);
  }

  _pressureTrend(value) {
    const threshold = Number(this._config.settings.pressure_trend_threshold) || 1;
    if (this._pressureHistory.length < 2 || value == null) {
      return { icon: "mdi:trending-neutral", label: "Steady" };
    }
    const oldest = this._pressureHistory[0].v;
    const pct = ((value - oldest) / oldest) * 100;
    if (pct >= threshold) return { icon: "mdi:arrow-up", label: "Rising" };
    if (pct <= -threshold) return { icon: "mdi:arrow-down", label: "Falling" };
    return { icon: "mdi:trending-neutral", label: "Steady" };
  }

  // ---- interactions ------------------------------------------------------

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

  // ---- render ------------------------------------------------------------

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
        sunny: { icon: "mdi:weather-sunny", label: "Clear sky" },
        cloudy: { icon: "mdi:weather-cloudy", label: "Cloudy" },
        rainy: { icon: "mdi:weather-rainy", label: "Rain" },
        night: { icon: "mdi:weather-night", label: "Clear night" },
      };
      condition = map[this._config.settings.manual_condition] || deriveCondition({ isDay, rainMm, rainOn, lux, uv });
    } else {
      condition = deriveCondition({ isDay, rainMm, rainOn, lux, uv });
    }

    return html`
      <ha-card>
        <div class="wsc">
          ${this._config.title
            ? html`<div class="title">${this._config.title}</div>`
            : nothing}

          ${this._renderHero(condition, temp, tempUnit, humidity)}

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

  _renderHero(condition, temp, tempUnit, humidity) {
    const s = this._config.settings || {};
    const dew = s.show_dewpoint ? calcDewPoint(temp, humidity) : null;
    return html`
      <div
        class="hero ${this._clickable("temperature_entity") ? "tappable" : ""}"
        @click=${() => this._handleClick("temperature_entity")}
      >
        <ha-icon class="hero-icon" .icon=${condition.icon}></ha-icon>
        <div class="hero-main">
          <div class="hero-condition">${condition.label}</div>
          <div class="hero-temp">
            ${temp != null ? `${round(temp, 1)} ${tempUnit}` : "—"}
          </div>
        </div>
        ${temp != null
          ? html`<div class="hero-sub">
              <span>${comfortLabel(temp, humidity)}</span>
              ${dew != null
                ? html`<span class="muted">Dewpoint ${dew} ${tempUnit}</span>`
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
      label: "Light",
      value: formatLux(lux),
      sub: level ? level.label : "",
      key: "lux_entity",
    });
  }

  _renderTemperature(temp, tempUnit) {
    if (!this._stateObj("temperature_entity")) return nothing;
    return this._tile({
      icon: "mdi:thermometer",
      label: "Temperature",
      value: temp != null ? `${round(temp, 1)} ${tempUnit}` : "—",
      key: "temperature_entity",
    });
  }

  _renderHumidity(humidity) {
    if (!this._stateObj("humidity_entity")) return nothing;
    return this._tile({
      icon: "mdi:water-percent",
      label: "Humidity",
      value: humidity != null ? `${round(humidity, 0)}%` : "—",
      key: "humidity_entity",
    });
  }

  _renderRain(rainObj, rainOn, rainMm) {
    if (!rainObj) return nothing;
    const unitStr = unit(rainObj, "mm/h");
    return this._tile({
      icon: rainOn ? "mdi:weather-rainy" : "mdi:weather-partly-rainy",
      label: "Rain",
      value: rainOn ? "Rain detected" : "Dry",
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
    const compass = degToCompass(dirDeg);
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
            <div class="tile-label">Wind</div>
            <div class="tile-value">
              ${speed != null ? `${round(speed, 1)} ${speedUnit}` : "—"}
            </div>
            ${compass ? html`<div class="tile-sub">${compass}</div>` : nothing}
            ${s.show_wind_gust && gust != null
              ? html`<div class="tile-sub">
                  <ha-icon class="mini-icon" .icon=${"mdi:weather-windy-variant"}></ha-icon>
                  Gust ${round(gust, 0)} ${gustUnit}
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
        <span class="c-n">N</span>
        <span class="c-e">E</span>
        <span class="c-s">S</span>
        <span class="c-w">W</span>
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
      label: "UV Index",
      value: uv != null ? `${round(uv, 0)}` : "—",
      sub: level ? level.label : "",
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
      label: "Pressure",
      value: value != null ? `${round(value, 0)} ${unitStr}` : "—",
      sub: trend
        ? html`<ha-icon class="mini-icon" .icon=${trend.icon}></ha-icon> ${trend.label}`
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
      label: "Battery",
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

      /* Hero */
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

      /* Grid of tiles */
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

      /* Wind + compass */
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

      /* Interactions */
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

// Register with the Lovelace card picker.
window.customCards = window.customCards || [];
if (!window.customCards.find((c) => c.type === CARD_NAME)) {
  window.customCards.push({
    type: CARD_NAME,
    name: "Weather Station Card",
    description: "A modern, Mushroom-inspired weather station card.",
    preview: true,
    documentationURL:
      "https://github.com/your-username/lovelace-weather-station-card",
  });
}

/* eslint-disable no-console */
console.info(
  `%c WEATHER-STATION-CARD %c v${CARD_VERSION} `,
  "color: white; background: #03a9f4; font-weight: 700;",
  "color: #03a9f4; background: white; font-weight: 700;"
);

export { WeatherStationCard };
