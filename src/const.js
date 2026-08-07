export const CARD_VERSION = "1.0.0";

export const CARD_NAME = "weather-station-card";
export const EDITOR_NAME = "weather-station-card-editor";

/**
 * Configuration keys for the entities the user can pick.
 * `required` controls whether the section is hidden when the entity is missing.
 */
export const ENTITY_FIELDS = [
  { key: "temperature_entity", label: "Temperature", icon: "mdi:thermometer" },
  { key: "humidity_entity", label: "Humidity", icon: "mdi:water-percent" },
  { key: "lux_entity", label: "Light / Lux", icon: "mdi:brightness-7" },
  { key: "uv_entity", label: "UV Index", icon: "mdi:sun-wireless" },
  { key: "rain_entity", label: "Rain", icon: "mdi:weather-rainy" },
  { key: "wind_speed_entity", label: "Wind speed", icon: "mdi:weather-windy" },
  { key: "wind_direction_entity", label: "Wind direction", icon: "mdi:compass" },
  { key: "wind_gust_entity", label: "Wind gust", icon: "mdi:weather-windy-variant" },
  { key: "pressure_entity", label: "Pressure", icon: "mdi:gauge" },
  { key: "battery_entity", label: "Battery", icon: "mdi:battery-high" },
  { key: "sun_entity", label: "Sun (day/night)", icon: "mdi:weather-sunny" },
];

/**
 * Default values for the `settings` object. Everything that is potentially
 * "extra" is disabled by default per the design brief (dew point, pressure
 * trend). Sections that are core to a weather station default to on.
 */
export const DEFAULT_SETTINGS = {
  show_dewpoint: false,
  show_pressure_trend: false,
  show_battery: true,
  show_wind_gust: true,
  show_interactions: true,
  show_daynight: true,
  pressure_trend_threshold: 1, // percent change to flag rising/falling
  manual_condition: "", // used when no sun entity + user wants a fixed icon
};

/**
 * Boolean settings surfaced as toggles in the editor.
 */
export const SETTING_TOGGLES = [
  { key: "show_dewpoint", label: "Enable dew point" },
  { key: "show_pressure_trend", label: "Enable pressure trend" },
  { key: "show_battery", label: "Enable battery" },
  { key: "show_wind_gust", label: "Enable wind gust" },
  { key: "show_interactions", label: "Enable interactions (tap actions)" },
  { key: "show_daynight", label: "Enable day / night mode" },
];

export const COMPASS_POINTS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

export const UV_LEVELS = [
  { max: 2, label: "Low", color: "#4caf50" },
  { max: 5, label: "Moderate", color: "#ffb300" },
  { max: 7, label: "High", color: "#fb8c00" },
  { max: 10, label: "Very high", color: "#e53935" },
  { max: Infinity, label: "Extreme", color: "#8e24aa" },
];

export const LUX_LEVELS = [
  { max: 100, label: "Dark", icon: "mdi:brightness-2" },
  { max: 1000, label: "Low light", icon: "mdi:brightness-5" },
  { max: 10000, label: "Bright", icon: "mdi:brightness-6" },
  { max: Infinity, label: "Very bright", icon: "mdi:brightness-7" },
];
