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
 * Point on a cubic Bezier at t ∈ [0, 1].
 */
function cubicPoint(p0, p1, p2, p3, t) {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  return {
    x: uu * u * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + tt * t * p3.x,
    y: uu * u * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + tt * t * p3.y,
  };
}

/**
 * Smooth, wide, LOW sun-path made of two symmetric cubics.
 * The first control point of each end shares the endpoint's Y, giving a
 * horizontal tangent at sunrise/sunset — so the ends ease in with no sharp
 * downward hook (an ellipse would be near-vertical there).
 * viewBox: 200×90.
 */
export const SUN_PATH = {
  // Left: sunrise → zenith
  left: [
    { x: 16, y: 68 },
    { x: 58, y: 68 },
    { x: 70, y: 47 },
    { x: 100, y: 47 },
  ],
  // Right: zenith → sunset
  right: [
    { x: 100, y: 47 },
    { x: 130, y: 47 },
    { x: 142, y: 68 },
    { x: 184, y: 68 },
  ],
};

/** SVG stroke path matching SUN_PATH (two cubics). */
export const SUN_PATH_D =
  "M 16 68 C 58 68, 70 47, 100 47 C 130 47, 142 68, 184 68";

/** Closed path for a soft fill under the arc (down to the baseline). */
export const SUN_PATH_FILL_D =
  "M 16 68 C 58 68, 70 47, 100 47 C 130 47, 142 68, 184 68 L 184 74 L 16 74 Z";

/**
 * Place the sun on the smooth path.
 * East (az 90°) → left (sunrise), South (180°) → top, West (270°) → right (sunset).
 */
export function sunDiagramPosition(azimuth, elevation, aboveHorizon) {
  let az = Number(azimuth);
  if (!Number.isFinite(az)) az = aboveHorizon ? 180 : 0;
  az = ((az % 360) + 360) % 360;

  // 0 at east/sunrise → 1 at west/sunset
  let t = (az - 90) / 180;

  const elev = Number(elevation);
  if (!aboveHorizon || (Number.isFinite(elev) && elev < 0) || t < 0 || t > 1) {
    const side = az < 180 ? SUN_PATH.left[0] : SUN_PATH.right[3];
    return { x: side.x, y: side.y + 8, arcDeg: 0 };
  }

  t = Math.max(0.02, Math.min(0.98, t));

  if (t <= 0.5) {
    const u = t * 2;
    const [p0, p1, p2, p3] = SUN_PATH.left;
    return { ...cubicPoint(p0, p1, p2, p3, u), arcDeg: (1 - t) * 180 };
  }
  const u = (t - 0.5) * 2;
  const [p0, p1, p2, p3] = SUN_PATH.right;
  return { ...cubicPoint(p0, p1, p2, p3, u), arcDeg: (1 - t) * 180 };
}
