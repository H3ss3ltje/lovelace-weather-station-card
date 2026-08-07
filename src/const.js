export const CARD_VERSION = "1.2.0";

export const CARD_NAME = "weather-station-card";
export const EDITOR_NAME = "weather-station-card-editor";

/**
 * Configuration keys for the entities the user can pick.
 */
export const ENTITY_FIELDS = [
  { key: "temperature_entity", icon: "mdi:thermometer" },
  { key: "humidity_entity", icon: "mdi:water-percent" },
  { key: "lux_entity", icon: "mdi:brightness-7" },
  { key: "uv_entity", icon: "mdi:sun-wireless" },
  { key: "rain_entity", icon: "mdi:weather-rainy" },
  { key: "wind_speed_entity", icon: "mdi:weather-windy" },
  { key: "wind_direction_entity", icon: "mdi:compass" },
  { key: "wind_gust_entity", icon: "mdi:weather-windy-variant" },
  { key: "pressure_entity", icon: "mdi:gauge" },
  { key: "battery_entity", icon: "mdi:battery-high" },
  { key: "sun_entity", icon: "mdi:weather-sunny" },
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
  show_sun: true,
  pressure_trend_threshold: 1, // percent change to flag rising/falling
  manual_condition: "", // used when no sun entity + user wants a fixed icon
};

export const COMPASS_POINTS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

/** UV bands — `labelKey` is looked up under `uv.*` in translations. */
export const UV_LEVELS = [
  { max: 2, labelKey: "low", color: "#4caf50" },
  { max: 5, labelKey: "moderate", color: "#ffb300" },
  { max: 7, labelKey: "high", color: "#fb8c00" },
  { max: 10, labelKey: "very_high", color: "#e53935" },
  { max: Infinity, labelKey: "extreme", color: "#8e24aa" },
];

/** Lux bands — `labelKey` is looked up under `lux.*` in translations. */
export const LUX_LEVELS = [
  { max: 100, labelKey: "dark", icon: "mdi:brightness-2" },
  { max: 1000, labelKey: "low_light", icon: "mdi:brightness-5" },
  { max: 10000, labelKey: "bright", icon: "mdi:brightness-6" },
  { max: Infinity, labelKey: "very_bright", icon: "mdi:brightness-7" },
];
