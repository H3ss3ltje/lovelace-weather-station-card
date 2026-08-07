import { LitElement, html, css, nothing } from "lit";
import { fireEvent } from "custom-card-helpers";

import { EDITOR_NAME, DEFAULT_SETTINGS } from "./const.js";
import { localize } from "./localize/localize.js";

class WeatherStationCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
    };
  }

  setConfig(config) {
    this._config = {
      ...config,
      settings: { ...DEFAULT_SETTINGS, ...(config.settings || {}) },
    };
  }

  _t(key, replace) {
    return localize(this.hass, key, replace);
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
          { name: "rain_entity", selector: { entity: {} } },
          {
            name: "",
            type: "grid",
            schema: [
              { name: "wind_speed_entity", selector: { entity: {} } },
              { name: "wind_direction_entity", selector: { entity: {} } },
              { name: "wind_gust_entity", selector: { entity: {} } },
            ],
          },
          { name: "pressure_entity", selector: { entity: {} } },
          { name: "battery_entity", selector: { entity: {} } },
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
          { name: "rain_today_entity", selector: { entity: {} } },
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
              { name: "show_dewpoint", selector: { boolean: {} } },
              { name: "show_minmax", selector: { boolean: {} } },
              { name: "show_rain_today", selector: { boolean: {} } },
              { name: "show_beaufort", selector: { boolean: {} } },
              { name: "show_expand", selector: { boolean: {} } },
              { name: "show_wind_gust", selector: { boolean: {} } },
              { name: "show_battery", selector: { boolean: {} } },
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
                      unit_of_measurement: "%",
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
    const config = {
      ...value,
      settings: { ...DEFAULT_SETTINGS, ...(value.settings || {}) },
    };
    Object.keys(config).forEach((k) => {
      if (config[k] === "" && k.endsWith("_entity")) delete config[k];
    });
    fireEvent(this, "config-changed", { config });
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
      code {
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
        padding: 1px 5px;
        border-radius: 6px;
      }
    `;
  }
}

if (!customElements.get(EDITOR_NAME)) {
  customElements.define(EDITOR_NAME, WeatherStationCardEditor);
}

export { WeatherStationCardEditor };
