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
    { x: 16, y: 60 },
    { x: 52, y: 60 },
    { x: 64, y: 12 },
    { x: 100, y: 12 },
  ],
  // Right: zenith → sunset
  right: [
    { x: 100, y: 12 },
    { x: 136, y: 12 },
    { x: 148, y: 60 },
    { x: 184, y: 60 },
  ],
};

/** SVG stroke path matching SUN_PATH (two cubics). */
export const SUN_PATH_D =
  "M 16 60 C 52 60, 64 12, 100 12 C 136 12, 148 60, 184 60";

/** Horizon baseline Y in the path coordinate space. */
export const SUN_BASELINE_Y = 60;

function lerpPt(a, b, u) {
  return { x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * u };
}

/** De Casteljau split of a cubic at u → [firstHalf, secondHalf]. */
function splitCubic([p0, p1, p2, p3], u) {
  const a = lerpPt(p0, p1, u);
  const b = lerpPt(p1, p2, u);
  const c = lerpPt(p2, p3, u);
  const d = lerpPt(a, b, u);
  const e = lerpPt(b, c, u);
  const f = lerpPt(d, e, u);
  return [
    [p0, a, d, f],
    [f, e, c, p3],
  ];
}

/** Build an SVG path `d` from a list of cubic segments. */
function cubicsToD(cubics) {
  if (!cubics.length) return "";
  const start = cubics[0][0];
  let d = `M ${start.x} ${start.y}`;
  for (const [, c1, c2, c3] of cubics) {
    d += ` C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${c3.x} ${c3.y}`;
  }
  return d;
}

/**
 * Split the full sun path at global position t ∈ [0, 1] into the part the
 * sun has already travelled (before) and the part still to come (after).
 */
export function sunPathSegments(t) {
  const { left, right } = SUN_PATH;
  t = Math.max(0, Math.min(1, t));
  let before = [];
  let after = [];
  if (t <= 0.5) {
    const [l1, l2] = splitCubic(left, t / 0.5);
    before = [l1];
    after = [l2, right];
  } else {
    const [r1, r2] = splitCubic(right, (t - 0.5) / 0.5);
    before = [left, r1];
    after = [r2];
  }
  return { beforeD: cubicsToD(before), afterD: cubicsToD(after) };
}

/**
 * Place the sun on the smooth path and report its fractional progress `t`.
 * East (az 90°) → left (sunrise), South (180°) → top, West (270°) → right (sunset).
 */
export function sunDiagramPosition(azimuth, elevation, aboveHorizon) {
  let az = Number(azimuth);
  if (!Number.isFinite(az)) az = aboveHorizon ? 180 : 0;
  az = ((az % 360) + 360) % 360;

  // 0 at east/sunrise → 1 at west/sunset
  let t = (az - 90) / 180;

  const elev = Number(elevation);
  const night = !aboveHorizon || (Number.isFinite(elev) && elev < 0) || t < 0 || t > 1;
  if (night) {
    const side = az < 180 ? SUN_PATH.left[0] : SUN_PATH.right[3];
    return { x: side.x, y: SUN_BASELINE_Y, t: t < 0 ? 0 : t > 1 ? 1 : t, night: true };
  }

  t = Math.max(0.02, Math.min(0.98, t));
  const cubic = t <= 0.5 ? SUN_PATH.left : SUN_PATH.right;
  const u = t <= 0.5 ? t * 2 : (t - 0.5) * 2;
  const [p0, p1, p2, p3] = cubic;
  return { ...cubicPoint(p0, p1, p2, p3, u), t, night: false };
}

/**
 * Convert a wind speed to m/s from common unit strings.
 */
export function toMetersPerSecond(value, unitStr) {
  if (value == null || !Number.isFinite(Number(value))) return null;
  const v = Number(value);
  const u = String(unitStr || "").toLowerCase();
  if (u.includes("km/h") || u.includes("kmh") || u.includes("kph")) return v / 3.6;
  if (u.includes("mph")) return v * 0.44704;
  if (u.includes("kn") || u.includes("kt")) return v * 0.514444;
  return v; // assume m/s
}

/**
 * Beaufort band for a wind speed in m/s → { n, key } (key under `beaufort.*`).
 */
export function beaufort(speedMs) {
  if (speedMs == null || !Number.isFinite(speedMs)) return null;
  const bands = [
    { max: 0.5, n: 0, key: "calm" },
    { max: 1.6, n: 1, key: "light_air" },
    { max: 3.4, n: 2, key: "light_breeze" },
    { max: 5.5, n: 3, key: "gentle_breeze" },
    { max: 8.0, n: 4, key: "moderate_breeze" },
    { max: 10.8, n: 5, key: "fresh_breeze" },
    { max: 13.9, n: 6, key: "strong_breeze" },
    { max: 17.2, n: 7, key: "near_gale" },
    { max: 20.8, n: 8, key: "gale" },
    { max: 24.5, n: 9, key: "strong_gale" },
    { max: 28.5, n: 10, key: "storm" },
    { max: 32.7, n: 11, key: "violent_storm" },
    { max: Infinity, n: 12, key: "hurricane" },
  ];
  return bands.find((b) => speedMs < b.max);
}
