import { LitElement, html, css, nothing } from "lit";
import { fireEvent } from "custom-card-helpers";

import { EDITOR_NAME, DEFAULT_SETTINGS } from "./const.js";

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

  // ha-form schema. Entities live at the top level, options are grouped
  // under a nested `settings` object (like Power Flow Card Plus).
  _schema() {
    const showTrend = this._config?.settings?.show_pressure_trend;
    const dayNightOff = this._config?.settings?.show_daynight === false;

    return [
      { name: "title", selector: { text: {} } },
      {
        type: "expandable",
        name: "",
        title: "Entities",
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
        ],
      },
      {
        type: "expandable",
        name: "settings",
        title: "Settings",
        icon: "mdi:cog",
        schema: [
          {
            name: "",
            type: "grid",
            schema: [
              { name: "show_daynight", selector: { boolean: {} } },
              { name: "show_dewpoint", selector: { boolean: {} } },
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
                        { value: "", label: "Automatic" },
                        { value: "sunny", label: "Sunny" },
                        { value: "cloudy", label: "Cloudy" },
                        { value: "rainy", label: "Rainy" },
                        { value: "night", label: "Night" },
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
    const labels = {
      title: "Card title",
      temperature_entity: "Temperature",
      humidity_entity: "Humidity",
      lux_entity: "Light / Lux",
      uv_entity: "UV Index",
      rain_entity: "Rain",
      wind_speed_entity: "Wind speed",
      wind_direction_entity: "Wind direction",
      wind_gust_entity: "Wind gust",
      pressure_entity: "Pressure",
      battery_entity: "Battery",
      sun_entity: "Sun (day/night)",
      show_daynight: "Day / night mode",
      show_dewpoint: "Dew point",
      show_wind_gust: "Wind gust",
      show_battery: "Battery",
      show_pressure_trend: "Pressure trend",
      show_interactions: "Interactions",
      manual_condition: "Manual condition",
      pressure_trend_threshold: "Trend threshold",
    };
    return labels[schema.name] || schema.title || schema.name;
  };

  _valueChanged(ev) {
    if (!this._config) return;
    const value = ev.detail.value;
    const config = {
      ...value,
      settings: { ...DEFAULT_SETTINGS, ...(value.settings || {}) },
    };
    // Drop empty entity strings so hidden sections stay hidden.
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
      <div class="hint">
        Tip: set individual tap / hold actions in YAML, e.g.
        <code>temperature_action:</code>, <code>wind_action:</code>. Sections are
        hidden automatically when their entity is not configured.
      </div>
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
