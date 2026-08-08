export const CARD_VERSION = "1.6.5";

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
  "humidity",
  "rain",
  "wind",
  "uv",
  "pressure",
  "battery",
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
  show_minmax: true, // today's min/max temperature
  show_rain_today: true, // rain total today (needs rain_today_entity)
  show_beaufort: true, // Beaufort scale + description on wind
  compact_mode: false, // hero + sun only (hide tile grid)
  night_palette: true, // stronger moon / night path colours after sunset
  lux_in_klux: false, // true if lux_entity reports kilolux (0–200) instead of lux
  tile_order: [...DEFAULT_TILE_ORDER],
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

/**
 * Outdoor lux bands for sensors spanning ~0–200 klx (0–200000 lx).
 * `max` is inclusive upper bound in lux.
 */
export const LUX_LEVELS = [
  { max: 100, labelKey: "dark", icon: "lux_dark" }, // ≤ 0.1 klx
  { max: 2000, labelKey: "low_light", icon: "lux_low" }, // ≤ 2 klx
  { max: 20000, labelKey: "bright", icon: "lux_bright" }, // ≤ 20 klx
  { max: 80000, labelKey: "very_bright", icon: "lux_very_bright" }, // ≤ 80 klx
  { max: Infinity, labelKey: "full_sun", icon: "lux_full_sun" }, // 80–200 klx
];
