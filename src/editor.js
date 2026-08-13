import { LitElement, html, css, nothing } from "lit";
import { fireEvent } from "custom-card-helpers";

import { EDITOR_NAME, DEFAULT_SETTINGS, DEFAULT_TILE_ORDER } from "./const.js";
import { localize } from "./localize/localize.js";

class WeatherStationCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
    };
  }

  setConfig(config) {
    const settings = { ...DEFAULT_SETTINGS, ...(config.settings || {}) };
    settings.tile_order = this._normalizeTileOrder(settings.tile_order);
    this._config = {
      ...config,
      settings,
    };
  }

  _t(key, replace) {
    return localize(this.hass, key, replace);
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

  _schema() {
    const showTrend = this._config?.settings?.show_pressure_trend;
    const dayNightOff = this._config?.settings?.show_daynight === false;

    return [
      { name: "title", selector: { text: {} } },
      {
        type: "expandable",
        name: "",
        title: this._t("editor.entities"),
        icon: "mdi:format-list-bulleted",
        schema: [
          { name: "temperature_entity", selector: { entity: {} } },
          { name: "humidity_entity", selector: { entity: {} } },
          { name: "lux_entity", selector: { entity: {} } },
          { name: "uv_entity", selector: { entity: {} } },
          {
            name: "",
            type: "grid",
            schema: [
              { name: "rain_entity", selector: { entity: {} } },
              { name: "rain_rate_entity", selector: { entity: {} } },
              { name: "precipitation_entity", selector: { entity: {} } },
              { name: "rain_today_entity", selector: { entity: {} } },
            ],
          },
          {
            name: "",
            type: "grid",
            schema: [
              { name: "wind_speed_entity", selector: { entity: {} } },
              { name: "wind_direction_entity", selector: { entity: {} } },
              { name: "wind_gust_entity", selector: { entity: {} } },
            ],
          },
          {
            name: "",
            type: "grid",
            schema: [
              { name: "pressure_entity", selector: { entity: {} } },
              { name: "pressure_trend_entity", selector: { entity: {} } },
            ],
          },
          {
            name: "",
            type: "grid",
            schema: [
              { name: "battery_entity", selector: { entity: {} } },
              { name: "voltage_entity", selector: { entity: {} } },
              { name: "capacitor_voltage_entity", selector: { entity: {} } },
            ],
          },
          {
            name: "",
            type: "grid",
            schema: [
              { name: "dewpoint_entity", selector: { entity: {} } },
              { name: "apparent_temperature_entity", selector: { entity: {} } },
              { name: "wind_chill_entity", selector: { entity: {} } },
              { name: "humidex_entity", selector: { entity: {} } },
              { name: "heat_stress_entity", selector: { entity: {} } },
            ],
          },
          { name: "condition_entity", selector: { entity: {} } },
          { name: "sun_entity", selector: { entity: { domain: "sun" } } },
          {
            name: "",
            type: "grid",
            schema: [
              { name: "azimuth_entity", selector: { entity: {} } },
              { name: "elevation_entity", selector: { entity: {} } },
            ],
          },
          {
            name: "",
            type: "grid",
            schema: [
              { name: "temperature_min_entity", selector: { entity: {} } },
              { name: "temperature_max_entity", selector: { entity: {} } },
            ],
          },
        ],
      },
      {
        type: "expandable",
        name: "settings",
        title: this._t("editor.settings"),
        icon: "mdi:cog",
        schema: [
          {
            name: "",
            type: "grid",
            schema: [
              { name: "show_daynight", selector: { boolean: {} } },
              { name: "show_sun", selector: { boolean: {} } },
              { name: "night_palette", selector: { boolean: {} } },
              { name: "compact_mode", selector: { boolean: {} } },
              { name: "lux_in_klux", selector: { boolean: {} } },
              { name: "show_dewpoint", selector: { boolean: {} } },
              { name: "show_feels_like", selector: { boolean: {} } },
              { name: "show_heat_stress", selector: { boolean: {} } },
              { name: "show_minmax", selector: { boolean: {} } },
              { name: "show_rain_today", selector: { boolean: {} } },
              { name: "show_beaufort", selector: { boolean: {} } },
              { name: "show_wind_gust", selector: { boolean: {} } },
              { name: "invert_wind_direction", selector: { boolean: {} } },
              { name: "show_battery", selector: { boolean: {} } },
              { name: "show_voltage", selector: { boolean: {} } },
              { name: "show_pressure_trend", selector: { boolean: {} } },
              { name: "show_interactions", selector: { boolean: {} } },
            ],
          },
          ...(dayNightOff
            ? [
                {
                  name: "manual_condition",
                  selector: {
                    select: {
                      mode: "dropdown",
                      options: [
                        { value: "", label: this._t("editor.automatic") },
                        { value: "sunny", label: this._t("editor.sunny") },
                        { value: "cloudy", label: this._t("editor.cloudy") },
                        { value: "rainy", label: this._t("editor.rainy") },
                        { value: "night", label: this._t("editor.night") },
                      ],
                    },
                  },
                },
              ]
            : []),
          ...(showTrend
            ? [
                {
                  name: "pressure_trend_threshold",
                  selector: {
                    number: {
                      min: 0.1,
                      max: 10,
                      step: 0.1,
                      unit_of_measurement: "hPa/h",
                      mode: "box",
                    },
                  },
                },
              ]
            : []),
        ],
      },
    ];
  }

  _computeLabel = (schema) => {
    if (!schema.name) return schema.title || "";
    return this._t(`editor.${schema.name}`) || schema.title || schema.name;
  };

  _valueChanged(ev) {
    if (!this._config) return;
    const value = ev.detail.value;
    const prevOrder = this._config.settings?.tile_order;
    const config = {
      ...value,
      settings: {
        ...DEFAULT_SETTINGS,
        ...(value.settings || {}),
        tile_order: this._normalizeTileOrder(
          value.settings?.tile_order || prevOrder
        ),
      },
    };
    Object.keys(config).forEach((k) => {
      if (config[k] === "" && k.endsWith("_entity")) delete config[k];
    });
    this._config = config;
    fireEvent(this, "config-changed", { config });
  }

  _moveTile(index, delta) {
    const order = [...this._normalizeTileOrder(this._config.settings?.tile_order)];
    const next = index + delta;
    if (next < 0 || next >= order.length) return;
    const tmp = order[index];
    order[index] = order[next];
    order[next] = tmp;
    const config = {
      ...this._config,
      settings: {
        ...this._config.settings,
        tile_order: order,
      },
    };
    this._config = config;
    fireEvent(this, "config-changed", { config });
  }

  _resetTileOrder() {
    const config = {
      ...this._config,
      settings: {
        ...this._config.settings,
        tile_order: [...DEFAULT_TILE_ORDER],
      },
    };
    this._config = config;
    fireEvent(this, "config-changed", { config });
  }

  _renderTileOrder() {
    if (this._config?.settings?.compact_mode) return nothing;
    const order = this._normalizeTileOrder(this._config.settings?.tile_order);
    return html`
      <div class="tile-order">
        <div class="tile-order-header">
          <div class="tile-order-title">${this._t("editor.tile_order")}</div>
          <button type="button" class="reset" @click=${this._resetTileOrder}>
            ${this._t("editor.tile_order_reset")}
          </button>
        </div>
        <div class="tile-order-hint">${this._t("editor.tile_order_hint")}</div>
        <div class="tile-order-list">
          ${order.map(
            (key, index) => html`
              <div class="tile-order-row">
                <span class="tile-order-label"
                  >${this._t(`editor.tile_${key}`)}</span
                >
                <div class="tile-order-actions">
                  <button
                    type="button"
                    ?disabled=${index === 0}
                    @click=${() => this._moveTile(index, -1)}
                    title="Up"
                  >
                    <ha-icon .icon=${"mdi:chevron-up"}></ha-icon>
                  </button>
                  <button
                    type="button"
                    ?disabled=${index === order.length - 1}
                    @click=${() => this._moveTile(index, 1)}
                    title="Down"
                  >
                    <ha-icon .icon=${"mdi:chevron-down"}></ha-icon>
                  </button>
                </div>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }

  render() {
    if (!this.hass || !this._config) return nothing;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
      ${this._renderTileOrder()}
      <div class="hint">${this._t("editor.hint")}</div>
    `;
  }

  static get styles() {
    return css`
      .hint {
        margin-top: 12px;
        font-size: 0.8rem;
        color: var(--secondary-text-color);
        line-height: 1.4;
      }
      .tile-order {
        margin-top: 16px;
        padding: 12px;
        border-radius: 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }
      .tile-order-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .tile-order-title {
        font-weight: 600;
        color: var(--primary-text-color);
      }
      .tile-order-hint {
        margin: 4px 0 10px;
        font-size: 0.75rem;
        color: var(--secondary-text-color);
        line-height: 1.35;
      }
      .tile-order-list {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .tile-order-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 6px 8px;
        border-radius: 8px;
        background: var(--card-background-color, #fff);
        box-shadow: inset 0 0 0 1px var(--divider-color, rgba(0, 0, 0, 0.08));
      }
      .tile-order-label {
        font-size: 0.9rem;
        color: var(--primary-text-color);
      }
      .tile-order-actions {
        display: flex;
        gap: 2px;
      }
      .tile-order-actions button,
      .reset {
        border: none;
        background: transparent;
        color: var(--primary-color);
        cursor: pointer;
        padding: 2px 4px;
        border-radius: 6px;
        font: inherit;
        font-size: 0.8rem;
      }
      .tile-order-actions button:hover:not(:disabled),
      .reset:hover {
        background: var(--divider-color, rgba(0, 0, 0, 0.08));
      }
      .tile-order-actions button:disabled {
        opacity: 0.35;
        cursor: default;
      }
      .tile-order-actions ha-icon {
        --mdc-icon-size: 20px;
      }
    `;
  }
}

if (!customElements.get(EDITOR_NAME)) {
  customElements.define(EDITOR_NAME, WeatherStationCardEditor);
}

export { WeatherStationCardEditor };
