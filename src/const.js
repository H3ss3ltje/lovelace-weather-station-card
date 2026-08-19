export const CARD_VERSION = "1.8.7";

export const CARD_NAME = "weather-station-card";
export const EDITOR_NAME = "weather-station-card-editor";
export const COMPASS_CARD_NAME = "weather-station-compass-card";

/**
 * Configuration keys for the entities the user can pick.
 * Covers a full Zigbee2MQTT weather-station expose set.
 */
export const ENTITY_FIELDS = [
  { key: "temperature_entity", icon: "mdi:thermometer" },
  { key: "humidity_entity", icon: "mdi:water-percent" },
  { key: "lux_entity", icon: "mdi:brightness-7" },
  { key: "uv_entity", icon: "mdi:sun-wireless" },
  { key: "rain_entity", icon: "mdi:weather-rainy" },
  { key: "rain_rate_entity", icon: "mdi:weather-pouring" },
  { key: "precipitation_entity", icon: "mdi:cup-water" },
  { key: "wind_speed_entity", icon: "mdi:weather-windy" },
  { key: "wind_direction_entity", icon: "mdi:compass" },
  { key: "wind_gust_entity", icon: "mdi:weather-windy-variant" },
  { key: "pressure_entity", icon: "mdi:gauge" },
  { key: "pressure_trend_entity", icon: "mdi:trending-up" },
  { key: "battery_entity", icon: "mdi:battery-high" },
  { key: "voltage_entity", icon: "mdi:flash" },
  { key: "capacitor_voltage_entity", icon: "mdi:sine-wave" },
  { key: "dewpoint_entity", icon: "mdi:water-thermometer" },
  { key: "apparent_temperature_entity", icon: "mdi:thermometer-lines" },
  { key: "wind_chill_entity", icon: "mdi:snowflake-thermometer" },
  { key: "humidex_entity", icon: "mdi:sun-thermometer" },
  { key: "heat_stress_entity", icon: "mdi:heat-wave" },
  { key: "condition_entity", icon: "mdi:weather-partly-cloudy" },
  { key: "sun_entity", icon: "mdi:weather-sunny" },
  { key: "azimuth_entity", icon: "mdi:compass-outline" },
  { key: "elevation_entity", icon: "mdi:angle-acute" },
  { key: "temperature_min_entity", icon: "mdi:thermometer-low" },
  { key: "temperature_max_entity", icon: "mdi:thermometer-high" },
  { key: "rain_today_entity", icon: "mdi:weather-pouring" },
];

/** Default order of sensor tiles in the grid (full-station layout). */
export const DEFAULT_TILE_ORDER = [
  "lux",
  "temperature",
  "feels_like",
  "humidity",
  "dewpoint",
  "rain",
  "wind",
  "uv",
  "pressure",
  "heat_stress",
  "battery",
];

/**
 * Default values for the `settings` object.
 */
export const DEFAULT_SETTINGS = {
  hide_title: false,
  show_dewpoint: true,
  show_pressure_trend: true,
  show_battery: true,
  show_voltage: true,
  show_wind_gust: true,
  show_interactions: true,
  show_daynight: true,
  show_sun: true,
  show_minmax: true,
  show_rain_today: true,
  show_rain_hero: true,
  show_beaufort: true,
  show_feels_like: true,
  show_heat_stress: true,
  invert_wind_direction: false,
  compact_mode: false,
  compass_only: false,
  night_palette: true,
  lux_in_klux: false,
  lux_scale: 1,
  animate_icons: true,
  // Hero sky icons from lux (klux). Rain still overrides these bands.
  lux_cloudy_max_klux: 5,
  lux_partly_cloudy_max_klux: 20,
  lux_sunny_max_klux: 150,
  tile_order: [...DEFAULT_TILE_ORDER],
  pressure_trend_threshold: 0.3, // hPa/h when using pressure_trend_entity
  manual_condition: "",
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

/**
 * Outdoor lux bands for sensors spanning ~0–200 klx (0–200000 lx).
 * `max` is inclusive upper bound in lux.
 */
export const LUX_LEVELS = [
  { max: 100, labelKey: "dark", icon: "lux_dark" },
  { max: 2000, labelKey: "low_light", icon: "lux_low" },
  { max: 20000, labelKey: "bright", icon: "lux_bright" },
  { max: 80000, labelKey: "very_bright", icon: "lux_very_bright" },
  { max: Infinity, labelKey: "full_sun", icon: "lux_full_sun" },
];
