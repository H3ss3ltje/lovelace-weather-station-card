import { COMPASS_POINTS, UV_LEVELS, LUX_LEVELS } from "./const.js";

/**
 * Return a numeric value from an entity state, or null when unavailable.
 */
export function numericState(stateObj) {
  if (!stateObj) return null;
  const val = Number(stateObj.state);
  return Number.isFinite(val) ? val : null;
}

/**
 * Magnus-Tetens approximation for dew point.
 * temp in °C, humidity in % (0-100). Returns °C rounded to 1 decimal.
 * https://en.wikipedia.org/wiki/Dew_point#Calculating_the_dew_point
 */
export function calcDewPoint(tempC, humidity) {
  if (tempC == null || humidity == null || humidity <= 0) return null;
  const a = 17.62;
  const b = 243.12; // °C
  const gamma = Math.log(humidity / 100) + (a * tempC) / (b + tempC);
  const dp = (b * gamma) / (a - gamma);
  return Math.round(dp * 10) / 10;
}

/**
 * A friendly "feels like" key derived from temp + humidity.
 * Resolve via localize(hass, `comfort.${key}`).
 */
export function comfortKey(tempC, humidity) {
  if (tempC == null) return null;
  if (tempC < 0) return "freezing";
  if (tempC < 10) return "cold";
  if (tempC > 27 && humidity != null && humidity > 60) return "humid";
  if (tempC > 30) return "hot";
  if (tempC >= 18 && tempC <= 26) return "comfortable";
  return "mild";
}

/**
 * Convert wind degrees (0-360) into an 8-point compass key (N, NE, …).
 */
export function degToCompass(deg) {
  if (deg == null) return null;
  const idx = Math.round(((deg % 360) / 45)) % 8;
  return COMPASS_POINTS[idx];
}

/**
 * Interpret a lux value into a human label key + icon.
 */
export function luxLevel(lux) {
  if (lux == null) return null;
  return LUX_LEVELS.find((l) => lux < l.max) || LUX_LEVELS[LUX_LEVELS.length - 1];
}

/**
 * Format lux as klux when large.
 */
export function formatLux(lux) {
  if (lux == null) return "—";
  if (lux >= 1000) return `${Math.round(lux / 100) / 10} klux`;
  return `${Math.round(lux)} lux`;
}

/**
 * Interpret a UV index into a warning level.
 */
export function uvLevel(uv) {
  if (uv == null) return null;
  return UV_LEVELS.find((l) => uv <= l.max) || UV_LEVELS[UV_LEVELS.length - 1];
}

/**
 * Pick a battery icon from the charge percentage.
 */
export function batteryIcon(pct) {
  if (pct == null) return "mdi:battery-unknown";
  if (pct >= 95) return "mdi:battery";
  if (pct >= 70) return "mdi:battery-high";
  if (pct >= 40) return "mdi:battery-medium";
  if (pct >= 15) return "mdi:battery-low";
  return "mdi:battery-outline";
}

/**
 * Determine the weather condition icon + translation key.
 * Priority: rain > cloud (lux/uv low during day) > sun/night.
 */
export function deriveCondition({ isDay, rainMm, rainOn, lux, uv }) {
  if (rainOn || (rainMm != null && rainMm > 0)) {
    return { icon: "mdi:weather-rainy", labelKey: "rain" };
  }
  const bright = (lux != null && lux > 8000) || (uv != null && uv >= 3);
  if (!isDay) {
    return { icon: "mdi:weather-night", labelKey: "clear_night" };
  }
  if (lux != null && lux < 4000 && !bright) {
    return { icon: "mdi:weather-cloudy", labelKey: "cloudy" };
  }
  if (bright) {
    return { icon: "mdi:weather-sunny", labelKey: "clear_sky" };
  }
  return { icon: "mdi:weather-partly-cloudy", labelKey: "partly_cloudy" };
}

/**
 * Rain detection: booleans, on/off, or a numeric rate.
 */
export function isRainDetected(stateObj) {
  if (!stateObj) return false;
  const s = String(stateObj.state).toLowerCase();
  if (["on", "true", "wet", "raining", "detected"].includes(s)) return true;
  const n = Number(stateObj.state);
  return Number.isFinite(n) && n > 0;
}

/**
 * Round a number to a fixed number of decimals, tolerating strings/null.
 */
export function round(value, decimals = 1) {
  if (value == null || value === "") return null;
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  const f = Math.pow(10, decimals);
  return Math.round(n * f) / f;
}

/**
 * Read the unit of measurement for an entity, with a fallback.
 */
export function unit(stateObj, fallback = "") {
  return (stateObj && stateObj.attributes && stateObj.attributes.unit_of_measurement) || fallback;
}

/**
 * Format an ISO timestamp as a short localized time (sunrise / sunset).
 */
export function formatSunTime(hass, iso) {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  const lang =
    hass?.locale?.language || hass?.language || hass?.selectedLanguage || undefined;
  return date.toLocaleTimeString(lang, { hour: "2-digit", minute: "2-digit" });
}

/**
 * Place the sun on a semicircle arc for the diagram.
 * East (az 90°) → left, South (180°) → top, West (270°) → right.
 * Returns SVG coordinates in a 200×110 viewBox.
 */
export function sunDiagramPosition(azimuth, elevation, aboveHorizon) {
  const cx = 100;
  const cy = 88;
  const r = 72;

  let az = Number(azimuth);
  if (!Number.isFinite(az)) az = aboveHorizon ? 180 : 0;
  az = ((az % 360) + 360) % 360;

  // Map azimuth onto the day arc (east→west).
  let arcDeg = 180 - (az - 90); // 90→180, 180→90, 270→0

  const elev = Number(elevation);
  if (!aboveHorizon || (Number.isFinite(elev) && elev < 0)) {
    // Tuck the sun slightly under the horizon on the correct side.
    arcDeg = az < 180 ? 195 : -15;
  } else {
    arcDeg = Math.max(0, Math.min(180, arcDeg));
  }

  const rad = (arcDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy - r * Math.sin(rad),
    arcDeg,
  };
}
