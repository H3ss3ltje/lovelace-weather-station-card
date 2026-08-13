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
 * Map a weather-condition text (e.g. from Zigbee2MQTT) to an icon + labelKey.
 * Returns null when text is empty. `raw` keeps the original string for display.
 */
export function conditionFromText(text, isDay = true) {
  if (text == null || text === "" || text === "unknown" || text === "unavailable") {
    return null;
  }
  const raw = String(text);
  const t = raw.toLowerCase();
  if (/rain|drizzle|shower|pour|wet/.test(t)) {
    return { icon: "rainy", labelKey: "rain", raw };
  }
  if (/snow|sleet|blizzard|ice|hail/.test(t)) {
    return { icon: "snowy", labelKey: "snow", raw };
  }
  if (/storm|thunder|lightning/.test(t)) {
    return { icon: "rainy", labelKey: "rain", raw };
  }
  if (/fog|mist|haze/.test(t)) {
    return { icon: "cloudy", labelKey: "cloudy", raw };
  }
  if (/part|few|scatter|broken/.test(t) && /cloud/.test(t)) {
    return { icon: "partly_cloudy", labelKey: "partly_cloudy", raw };
  }
  if (/cloud|overcast/.test(t)) {
    return { icon: "cloudy", labelKey: "cloudy", raw };
  }
  if (/clear|sunny|fair|sun/.test(t)) {
    return isDay
      ? { icon: "sunny", labelKey: "clear_sky", raw }
      : { icon: "night", labelKey: "clear_night", raw };
  }
  if (/night/.test(t)) {
    return { icon: "night", labelKey: "clear_night", raw };
  }
  return {
    icon: isDay ? "partly_cloudy" : "night",
    labelKey: "partly_cloudy",
    raw,
  };
}

/**
 * Pressure trend from a rate sensor (hPa/h). Negative = falling.
 */
export function pressureTrendFromRate(rate, threshold = 0.3) {
  if (rate == null || !Number.isFinite(rate)) return null;
  const t = Number(threshold) || 0.3;
  if (rate >= t) return { icon: "trend_up", labelKey: "rising" };
  if (rate <= -t) return { icon: "trend_down", labelKey: "falling" };
  return { icon: "trend_steady", labelKey: "steady" };
}

/**
 * Capitalize a condition string for display when no translation key fits.
 */
export function prettyLabel(text) {
  if (!text) return "";
  const s = String(text).replace(/_/g, " ").trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Normalize wind degrees to 0–360. Optionally invert (+180°) for sensors
 * that report "blowing toward" instead of meteorological "coming from".
 */
export function windDirectionDegrees(deg, invert = false) {
  if (deg == null || !Number.isFinite(Number(deg))) return null;
  let d = Number(deg);
  if (invert) d += 180;
  d = ((d % 360) + 360) % 360;
  return d;
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
 * Convert a raw lux entity reading to lux (lx).
 * When `lux_in_klux` is set, the entity already reports kilolux (0–200).
 */
export function normalizeLux(raw, settings = {}) {
  if (raw == null || !Number.isFinite(Number(raw))) return null;
  const n = Number(raw);
  return settings.lux_in_klux ? n * 1000 : n;
}

/**
 * Interpret a lux value (in lx) into a human label key + icon.
 * Tuned for outdoor stations spanning ~0–200 klx.
 */
export function luxLevel(lux) {
  if (lux == null) return null;
  return LUX_LEVELS.find((l) => lux <= l.max) || LUX_LEVELS[LUX_LEVELS.length - 1];
}

/**
 * Format lux for display. Outdoor values show as klux (up to ~200.0).
 */
export function formatLux(lux) {
  if (lux == null) return "—";
  if (lux >= 1000) {
    const k = lux / 1000;
    if (k >= 100) return `${Math.round(k)} klux`;
    return `${Math.round(k * 10) / 10} klux`;
  }
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
  if (pct == null) return "battery_unknown";
  if (pct >= 95) return "battery";
  if (pct >= 70) return "battery_high";
  if (pct >= 40) return "battery_medium";
  if (pct >= 15) return "battery_low";
  return "battery_outline";
}

/**
 * Determine the weather condition icon + translation key.
 * Priority: rain > cloud (lux/uv low during day) > sun/night.
 */
export function deriveCondition({ isDay, rainMm, rainOn, lux, uv }) {
  if (rainOn || (rainMm != null && rainMm > 0)) {
    return { icon: "rainy", labelKey: "rain" };
  }
  // Outdoor lux: >20 klx is clearly bright daylight; <5 klx leans cloudy.
  const bright = (lux != null && lux > 20000) || (uv != null && uv >= 3);
  if (!isDay) {
    return { icon: "night", labelKey: "clear_night" };
  }
  if (lux != null && lux < 5000 && !bright) {
    return { icon: "cloudy", labelKey: "cloudy" };
  }
  if (bright) {
    return { icon: "sunny", labelKey: "clear_sky" };
  }
  return { icon: "partly_cloudy", labelKey: "partly_cloudy" };
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
  // Left: sunrise crossing → zenith
  left: [
    { x: 30, y: 60 },
    { x: 44, y: 49 },
    { x: 70, y: 12 },
    { x: 100, y: 12 },
  ],
  // Right: zenith → sunset crossing
  right: [
    { x: 100, y: 12 },
    { x: 130, y: 12 },
    { x: 156, y: 49 },
    { x: 170, y: 60 },
  ],
};

/** SVG stroke path for the above-horizon (orange) arch. */
export const SUN_PATH_D =
  "M 30 60 C 44 49, 70 12, 100 12 C 130 12, 156 49, 170 60";

/** Below-horizon night tails (blue): before sunrise and after sunset. */
export const SUN_TAIL_LEFT = [
  { x: 3, y: 78 },
  { x: 14, y: 78 },
  { x: 24, y: 66 },
  { x: 30, y: 60 },
];
export const SUN_TAIL_RIGHT = [
  { x: 170, y: 60 },
  { x: 176, y: 66 },
  { x: 186, y: 78 },
  { x: 197, y: 78 },
];
export const SUN_TAIL_LEFT_D = "M 3 78 C 14 78, 24 66, 30 60";
export const SUN_TAIL_RIGHT_D = "M 170 60 C 176 66, 186 78, 197 78";
export const SUN_TAIL_END_Y = 78;

/** Horizon baseline Y and where the arch crosses it (sunrise / sunset). */
export const SUN_BASELINE_Y = 60;
export const SUN_CROSS_LEFT_X = 30;
export const SUN_CROSS_RIGHT_X = 170;

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

/** Peak Y of the arch (visual zenith of the diagram). */
const SUN_PEAK_Y = 12;
const MS_DAY = 24 * 60 * 60 * 1000;

/**
 * The full day curve, in travel order:
 * pre-dawn tail → morning arch → afternoon arch → post-sunset tail.
 */
const SUN_CURVE = [SUN_TAIL_LEFT, SUN_PATH.left, SUN_PATH.right, SUN_TAIL_RIGHT];

function cubicLength([p0, p1, p2, p3]) {
  let len = 0;
  let prev = cubicPoint(p0, p1, p2, p3, 0);
  for (let i = 1; i <= 24; i++) {
    const p = cubicPoint(p0, p1, p2, p3, i / 24);
    len += Math.hypot(p.x - prev.x, p.y - prev.y);
    prev = p;
  }
  return len;
}

let _segLens = null;
let _cum = null;
let _total = 0;
function ensureCurveMetrics() {
  if (_segLens) return;
  _segLens = SUN_CURVE.map(cubicLength);
  _total = _segLens.reduce((a, b) => a + b, 0);
  _cum = [];
  let s = 0;
  for (const l of _segLens) {
    _cum.push(s);
    s += l;
  }
}

/** Global progress (0..1) along the whole day curve for a segment + local u. */
function curveProgress(segIndex, u) {
  ensureCurveMetrics();
  return (_cum[segIndex] + u * _segLens[segIndex]) / _total;
}

/**
 * Evenly spaced dots along the whole day curve. Each dot carries its position,
 * whether it is above the horizon, and its global progress g (0..1) so callers
 * can style traveled vs upcoming.
 */
export function sunCurveDots(spacing = 4.6) {
  ensureCurveMetrics();
  const dots = [];
  const count = Math.max(12, Math.round(_total / spacing));
  const step = _total / count;
  for (let k = 0; k <= count; k++) {
    const d = k * step;
    let si = 0;
    while (si < SUN_CURVE.length - 1 && d > _cum[si] + _segLens[si]) si++;
    const u = Math.min(1, (d - _cum[si]) / _segLens[si]);
    const [p0, p1, p2, p3] = SUN_CURVE[si];
    const p = cubicPoint(p0, p1, p2, p3, u);
    dots.push({
      x: p.x,
      y: p.y,
      above: p.y <= SUN_BASELINE_Y + 0.001,
      g: d / _total,
    });
  }
  return dots;
}

/** Find the point on a half-cubic whose Y best matches a target Y. */
function pointOnHalfByY([p0, p1, p2, p3], targetY) {
  const STEPS = 120;
  let best = cubicPoint(p0, p1, p2, p3, 0);
  let bestU = 0;
  let bestErr = Infinity;
  for (let i = 0; i <= STEPS; i++) {
    const u = i / STEPS;
    const p = cubicPoint(p0, p1, p2, p3, u);
    const err = Math.abs(p.y - targetY);
    if (err < bestErr) {
      bestErr = err;
      best = p;
      bestU = u;
    }
  }
  return { p: best, u: bestU };
}

/**
 * Point on the above-horizon arch for day progress t ∈ [0, 1]
 * (0 = sunrise crossing, 0.5 = peak, 1 = sunset crossing).
 */
function pointOnDayArch(dayT) {
  const t = Math.max(0, Math.min(1, dayT));
  if (t <= 0.5) {
    const u = t / 0.5;
    const p = cubicPoint(
      SUN_PATH.left[0],
      SUN_PATH.left[1],
      SUN_PATH.left[2],
      SUN_PATH.left[3],
      u
    );
    return { x: p.x, y: p.y, t, g: curveProgress(1, u) };
  }
  const u = (t - 0.5) / 0.5;
  const p = cubicPoint(
    SUN_PATH.right[0],
    SUN_PATH.right[1],
    SUN_PATH.right[2],
    SUN_PATH.right[3],
    u
  );
  return { x: p.x, y: p.y, t, g: curveProgress(2, u) };
}

/**
 * Day progress 0..1 from azimuth.
 * Northern hemisphere: E(90)→0, S(180)→0.5, W(270)→1.
 * Southern hemisphere: E(90)→0, N(0)→0.5, W(270)→1.
 */
function dayProgressFromAzimuth(az) {
  const a = ((az % 360) + 360) % 360;
  if (a >= 90 && a <= 270) {
    return (a - 90) / 180;
  }
  const fromEast = (90 - a + 360) % 360;
  if (fromEast <= 180) return fromEast / 180;
  return a < 90 ? 0 : 1;
}

/**
 * Resolve today's sunrise/sunset ms from Home Assistant sun attributes.
 * `next_*` are always in the future, so we shift by ~24h when needed.
 */
function resolveSunDayBounds(attrs = {}, nowMs, aboveHorizon) {
  const nextRising = Date.parse(attrs.next_rising);
  const nextSetting = Date.parse(attrs.next_setting);
  if (!Number.isFinite(nextRising) || !Number.isFinite(nextSetting)) {
    return null;
  }
  if (aboveHorizon) {
    return {
      sunriseMs: nextRising - MS_DAY,
      sunsetMs: nextSetting,
    };
  }
  if (nowMs <= nextRising && nextRising < nextSetting) {
    return { sunriseMs: nextRising, sunsetMs: nextSetting };
  }
  return {
    sunriseMs: nextRising - MS_DAY,
    sunsetMs: nextSetting - MS_DAY,
  };
}

/**
 * Place the sun/moon on the day curve by progress through the day.
 * Prefers sunrise→sunset time (so solar noon sits at the peak). Falls back to
 * continuous azimuth. Elevation decides night vs day when needed.
 */
export function sunDiagramPosition(
  azimuth,
  elevation,
  aboveHorizon,
  opts = {}
) {
  let az = Number(azimuth);
  const hasAz = Number.isFinite(az);
  if (hasAz) az = ((az % 360) + 360) % 360;
  const el = Number(elevation);
  const hasEl = Number.isFinite(el);
  const below = hasEl ? el < 0 : !aboveHorizon;

  const nowMs = Number.isFinite(opts.nowMs) ? opts.nowMs : Date.now();
  const bounds = resolveSunDayBounds(
    opts.sunAttrs || {},
    nowMs,
    aboveHorizon && !below
  );

  // --- Time-based placement (best): midday → diagram peak ---
  if (
    bounds &&
    Number.isFinite(bounds.sunriseMs) &&
    Number.isFinite(bounds.sunsetMs) &&
    bounds.sunsetMs > bounds.sunriseMs
  ) {
    const { sunriseMs, sunsetMs } = bounds;
    if (nowMs < sunriseMs) {
      const u = Math.max(
        0,
        Math.min(1, 1 - (sunriseMs - nowMs) / (MS_DAY / 2))
      );
      const pt = cubicPoint(
        SUN_TAIL_LEFT[0],
        SUN_TAIL_LEFT[1],
        SUN_TAIL_LEFT[2],
        SUN_TAIL_LEFT[3],
        u
      );
      return { x: pt.x, y: pt.y, t: 0, g: curveProgress(0, u), night: true };
    }
    if (nowMs > sunsetMs) {
      const u = Math.max(
        0,
        Math.min(1, (nowMs - sunsetMs) / (MS_DAY / 2))
      );
      const pt = cubicPoint(
        SUN_TAIL_RIGHT[0],
        SUN_TAIL_RIGHT[1],
        SUN_TAIL_RIGHT[2],
        SUN_TAIL_RIGHT[3],
        u
      );
      return { x: pt.x, y: pt.y, t: 1, g: curveProgress(3, u), night: true };
    }
    const dayT = (nowMs - sunriseMs) / (sunsetMs - sunriseMs);
    const pos = pointOnDayArch(dayT);
    return { x: pos.x, y: pos.y, t: pos.t, g: pos.g, night: false };
  }

  // --- Azimuth fallback: 180° (or 0° SH) lands on the peak ---
  if (hasAz) {
    if (below) {
      const rising = dayProgressFromAzimuth(az) < 0.5;
      const depthFrac = hasEl ? Math.min(1, -el / 12) : 0.4;
      const targetY =
        SUN_BASELINE_Y + depthFrac * (SUN_TAIL_END_Y - SUN_BASELINE_Y);
      const tail = rising ? SUN_TAIL_LEFT : SUN_TAIL_RIGHT;
      const { p, u } = pointOnHalfByY(tail, targetY);
      const g = rising ? curveProgress(0, u) : curveProgress(3, u);
      return { x: p.x, y: p.y, t: rising ? 0 : 1, g, night: true };
    }
    const pos = pointOnDayArch(dayProgressFromAzimuth(az));
    return { x: pos.x, y: pos.y, t: pos.t, g: pos.g, night: false };
  }

  // --- Elevation-only last resort ---
  const amp = SUN_BASELINE_Y - SUN_PEAK_Y;
  if (below) {
    const depthFrac = hasEl ? Math.min(1, -el / 12) : 0.4;
    const targetY =
      SUN_BASELINE_Y + depthFrac * (SUN_TAIL_END_Y - SUN_BASELINE_Y);
    const { p, u } = pointOnHalfByY(SUN_TAIL_LEFT, targetY);
    return { x: p.x, y: p.y, t: 0, g: curveProgress(0, u), night: true };
  }
  const frac = hasEl ? Math.max(0, Math.min(1, el / 90)) : 0.5;
  const targetY = SUN_BASELINE_Y - frac * amp;
  const { p, u } = pointOnHalfByY(SUN_PATH.left, targetY);
  return {
    x: p.x,
    y: p.y,
    t: u * 0.5,
    g: curveProgress(1, u),
    night: false,
  };
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
