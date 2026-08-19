import { html, svg, nothing } from "lit";

/**
 * Apple Weather–inspired multi-color SVG icons for the card.
 * Unique gradient IDs are generated per render to avoid collisions.
 */

let _uid = 0;
function uid(prefix = "g") {
  _uid += 1;
  return `${prefix}${_uid}`;
}

function wrap(body, className = "") {
  return html`<span class="wsc-icon ${className}" aria-hidden="true">${body}</span>`;
}

function sun(className) {
  const g = uid("sun");
  return wrap(
    svg`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="${g}a" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFE56A"/>
            <stop offset="55%" stop-color="#FFB100"/>
            <stop offset="100%" stop-color="#FF8A00"/>
          </radialGradient>
          <linearGradient id="${g}b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FFCC33"/>
            <stop offset="100%" stop-color="#FF9500"/>
          </linearGradient>
        </defs>
        <g class="icon-spin" style="transform-origin: 32px 32px">
          ${[0, 45, 90, 135, 180, 225, 270, 315].map(
            (deg) => svg`
              <rect x="29.5" y="4" width="5" height="11" rx="2.5"
                fill="url(#${g}b)"
                transform="rotate(${deg} 32 32)"/>
            `
          )}
          <circle cx="32" cy="32" r="14" fill="url(#${g}a)"/>
          <circle cx="27" cy="27" r="4.5" fill="#fff" opacity="0.35"/>
        </g>
      </svg>
    `,
    className
  );
}

function moon(className) {
  const g = uid("moon");
  return wrap(
    svg`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${g}a" x1="0.2" y1="0" x2="0.85" y2="1">
            <stop offset="0%" stop-color="#F2F7FF"/>
            <stop offset="40%" stop-color="#B4C8FF"/>
            <stop offset="100%" stop-color="#6B8CFF"/>
          </linearGradient>
        </defs>
        <path fill="url(#${g}a)"
          d="M41 8.5A23 23 0 1 0 54 48.5 19 19 0 1 1 41 8.5Z"/>
        <circle cx="28" cy="24" r="3" fill="#fff" opacity="0.28"/>
      </svg>
    `,
    className
  );
}

function cloudy(className) {
  const g = uid("cld");
  return wrap(
    svg`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${g}a" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#B8C0CC"/>
            <stop offset="100%" stop-color="#7A8494"/>
          </linearGradient>
          <linearGradient id="${g}b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#E8ECF2"/>
            <stop offset="100%" stop-color="#A8B0BE"/>
          </linearGradient>
        </defs>
        <g class="icon-drift">
          <ellipse cx="40" cy="30" rx="14" ry="10" fill="url(#${g}b)" opacity="0.85"/>
          <path fill="url(#${g}a)"
            d="M18 42c-6.6 0-12-5-12-11.2 0-5.4 3.8-10 9.1-11.2C16.6 13.4 22.8 9 30.2 9
               c8.4 0 15.4 5.8 17 13.5 1.2-.3 2.4-.5 3.7-.5 7.4 0 13.4 5.8 13.4 13
               0 7.2-6 13-13.4 13H18z"/>
          <ellipse cx="26" cy="28" rx="8" ry="5" fill="#fff" opacity="0.18"/>
        </g>
      </svg>
    `,
    className
  );
}

function partlyCloudy(className) {
  const g = uid("pc");
  return wrap(
    svg`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="${g}s" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFE56A"/>
            <stop offset="55%" stop-color="#FFB100"/>
            <stop offset="100%" stop-color="#FF8A00"/>
          </radialGradient>
          <linearGradient id="${g}b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FFCC33"/>
            <stop offset="100%" stop-color="#FF9500"/>
          </linearGradient>
          <linearGradient id="${g}c" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#D8DEE8"/>
            <stop offset="100%" stop-color="#8A94A4"/>
          </linearGradient>
        </defs>
        <!-- Position/scale wrapper; spin lives on inner group so CSS rotate
             does not overwrite translate/scale. -->
        <g transform="translate(4 4) scale(0.55)">
          <g class="icon-spin icon-spin-slow" style="transform-origin: 32px 32px">
            ${[0, 45, 90, 135, 180, 225, 270, 315].map(
              (deg) => svg`
                <rect x="29.5" y="4" width="5" height="11" rx="2.5"
                  fill="url(#${g}b)"
                  transform="rotate(${deg} 32 32)"/>
              `
            )}
            <circle cx="32" cy="32" r="14" fill="url(#${g}s)"/>
            <circle cx="27" cy="27" r="4.5" fill="#fff" opacity="0.35"/>
          </g>
        </g>
        <g class="icon-drift">
          <path fill="url(#${g}c)"
            d="M16 46c-5.5 0-10-4.2-10-9.4 0-4.5 3.2-8.3 7.6-9.3C14.6 21.4 19.8 18 26 18
               c7 0 12.9 4.8 14.3 11.4 1-.3 2-.4 3.1-.4 6.2 0 11.2 4.8 11.2 10.8
               S49.6 50 43.4 50H16z"/>
          <ellipse cx="28" cy="34" rx="7" ry="4" fill="#fff" opacity="0.16"/>
        </g>
      </svg>
    `,
    className
  );
}

function rainy(className) {
  const g = uid("rn");
  return wrap(
    svg`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${g}c" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#A8B4C8"/>
            <stop offset="100%" stop-color="#5A6478"/>
          </linearGradient>
          <linearGradient id="${g}d" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#64D2FF"/>
            <stop offset="100%" stop-color="#0A84FF"/>
          </linearGradient>
        </defs>
        <g class="icon-drift">
          <path fill="url(#${g}c)"
            d="M14 34c-5.5 0-10-4.2-10-9.4 0-4.5 3.2-8.3 7.6-9.3C12.6 9.4 17.8 6 24 6
               c7 0 12.9 4.8 14.3 11.4 1-.3 2-.4 3.1-.4 6.2 0 11.2 4.8 11.2 10.8
               S47.6 38 41.4 38H14z"/>
        </g>
        <g class="icon-drop d1">
          <rect x="18" y="42" width="5" height="14" rx="2.5" fill="url(#${g}d)"/>
        </g>
        <g class="icon-drop d2">
          <rect x="30" y="44" width="5" height="14" rx="2.5" fill="url(#${g}d)"/>
        </g>
        <g class="icon-drop d3">
          <rect x="42" y="42" width="5" height="14" rx="2.5" fill="url(#${g}d)"/>
        </g>
      </svg>
    `,
    className
  );
}

function partlyRainy(className) {
  const g = uid("pr");
  return wrap(
    svg`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="${g}s" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFE56A"/>
            <stop offset="100%" stop-color="#FF9500"/>
          </radialGradient>
          <linearGradient id="${g}c" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#C8D0DC"/>
            <stop offset="100%" stop-color="#6A7484"/>
          </linearGradient>
          <linearGradient id="${g}d" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#64D2FF"/>
            <stop offset="100%" stop-color="#0A84FF"/>
          </linearGradient>
        </defs>
        <g class="icon-spin icon-spin-slow" style="transform-origin: 18px 18px">
          <circle cx="18" cy="18" r="8" fill="url(#${g}s)"/>
          ${[225, 270, 315].map(
            (deg) => svg`
              <rect x="15.5" y="3" width="5" height="7" rx="2.5"
                fill="#FFB100" transform="rotate(${deg} 18 18)"/>
            `
          )}
        </g>
        <g class="icon-drift">
          <path fill="url(#${g}c)"
            d="M14 36c-5 0-9-3.8-9-8.5 0-4.1 2.9-7.5 6.9-8.4C12.8 13.6 17.5 10.5 23 10.5
               c6.3 0 11.7 4.4 13 10.3.9-.2 1.8-.3 2.8-.3 5.6 0 10.1 4.4 10.1 9.8
               S44.4 40 38.8 40H14z"/>
        </g>
        <g class="icon-drop d1">
          <rect x="18" y="44" width="4.5" height="12" rx="2.2" fill="url(#${g}d)"/>
        </g>
        <g class="icon-drop d2">
          <rect x="29" y="46" width="4.5" height="12" rx="2.2" fill="url(#${g}d)"/>
        </g>
        <g class="icon-drop d3">
          <rect x="40" y="44" width="4.5" height="12" rx="2.2" fill="url(#${g}d)"/>
        </g>
      </svg>
    `,
    className
  );
}

function snowy(className) {
  const g = uid("sn");
  return wrap(
    svg`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${g}c" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#E8ECF2"/>
            <stop offset="100%" stop-color="#8A94A4"/>
          </linearGradient>
        </defs>
        <g class="icon-drift">
          <path fill="url(#${g}c)"
            d="M14 34c-5.5 0-10-4.2-10-9.4 0-4.5 3.2-8.3 7.6-9.3C12.6 9.4 17.8 6 24 6
               c7 0 12.9 4.8 14.3 11.4 1-.3 2-.4 3.1-.4 6.2 0 11.2 4.8 11.2 10.8
               S47.6 38 41.4 38H14z"/>
        </g>
        <g class="icon-drop d1">
          <circle cx="20" cy="48" r="3" fill="#A8C0FF"/>
        </g>
        <g class="icon-drop d2">
          <circle cx="32" cy="52" r="3" fill="#A8C0FF"/>
        </g>
        <g class="icon-drop d3">
          <circle cx="44" cy="48" r="3" fill="#A8C0FF"/>
        </g>
      </svg>
    `,
    className
  );
}

function heatStress(className, opts = {}) {
  const g = uid("hs");
  const pct =
    opts.value != null && Number.isFinite(Number(opts.value))
      ? Math.max(0, Math.min(100, Number(opts.value)))
      : 50;
  const t = pct / 100;
  const gr = Math.round(200 - t * 140);
  const bl = Math.round(50 - t * 50);
  const color = `rgb(255,${Math.max(40, gr)},${Math.max(0, bl)})`;
  return wrap(
    svg`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="${g}a" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stop-color="#FFE56A"/>
            <stop offset="100%" stop-color="${color}"/>
          </radialGradient>
        </defs>
        <circle cx="32" cy="28" r="14" fill="url(#${g}a)"/>
        <path fill="none" stroke="${color}" stroke-width="3.5" stroke-linecap="round"
          d="M18 48c4-6 8-6 12 0s8 6 12 0 8-6 12 0"/>
        <path fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" opacity="0.55"
          d="M22 54c3-4 6-4 9 0s6 4 9 0"/>
      </svg>
    `,
    className
  );
}

function dewpointIcon(className) {
  const g = uid("dp");
  return wrap(
    svg`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${g}a" x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stop-color="#64D2FF"/>
            <stop offset="100%" stop-color="#0A84FF"/>
          </linearGradient>
          <linearGradient id="${g}b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FF9F0A"/>
            <stop offset="100%" stop-color="#FF453A"/>
          </linearGradient>
        </defs>
        <path fill="url(#${g}a)"
          d="M22 8C22 8 8 24 8 34c0 8 6.5 12 14 12s14-4 14-12C36 24 22 8 22 8z"/>
        <rect x="40" y="10" width="8" height="24" rx="4" fill="#C8CDD6"/>
        <rect x="42" y="20" width="4" height="12" rx="2" fill="url(#${g}b)"/>
        <circle cx="44" cy="42" r="8" fill="url(#${g}b)"/>
      </svg>
    `,
    className
  );
}

/** Map °C in [-30, 40] → { cold, hot } colors (blue → red). */
function tempColors(tempC) {
  const t = Math.max(0, Math.min(1, ((tempC ?? 20) + 30) / 70));
  // Blue (−30) → cyan (0) → amber (20) → red (40)
  const stops = [
    { p: 0, r: 10, g: 132, b: 255 }, // #0A84FF
    { p: 0.43, r: 90, g: 200, b: 250 }, // ~0°C
    { p: 0.64, r: 52, g: 199, b: 89 }, // ~15°C
    { p: 0.79, r: 255, g: 159, b: 10 }, // ~25°C
    { p: 1, r: 255, g: 69, b: 58 }, // #FF453A
  ];
  let a = stops[0];
  let b = stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (t >= stops[i].p && t <= stops[i + 1].p) {
      a = stops[i];
      b = stops[i + 1];
      break;
    }
  }
  const u = (t - a.p) / (b.p - a.p || 1);
  const r = Math.round(a.r + (b.r - a.r) * u);
  const g = Math.round(a.g + (b.g - a.g) * u);
  const bl = Math.round(a.b + (b.b - a.b) * u);
  const hot = `rgb(${r},${g},${bl})`;
  // Slightly lighter for the top of the mercury gradient
  const cold = `rgb(${Math.min(255, r + 40)},${Math.min(255, g + 40)},${Math.min(255, bl + 20)})`;
  return { cold, hot, t };
}

function toCelsius(temp, unitStr) {
  if (temp == null || !Number.isFinite(Number(temp))) return null;
  const n = Number(temp);
  const u = String(unitStr || "").toLowerCase();
  if (u.includes("f")) return ((n - 32) * 5) / 9;
  return n;
}

function thermometer(className, opts = {}) {
  const g = uid("th");
  const tempC = toCelsius(opts.value, opts.unit);
  const { cold, hot, t } = tempColors(tempC != null ? tempC : 20);
  // Mercury column: tube inner area y=16..40 (height 24). Fill from bottom.
  const fillH = 4 + t * 20;
  const fillY = 40 - fillH;
  return wrap(
    svg`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${g}a" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${cold}"/>
            <stop offset="100%" stop-color="${hot}"/>
          </linearGradient>
          <linearGradient id="${g}b" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#F2F4F8"/>
            <stop offset="100%" stop-color="#A8B0BE"/>
          </linearGradient>
        </defs>
        <rect x="26" y="6" width="12" height="36" rx="6" fill="url(#${g}b)"/>
        <rect x="29" y="${fillY}" width="6" height="${fillH}" rx="3" fill="url(#${g}a)"/>
        <circle cx="32" cy="48" r="12" fill="url(#${g}a)"/>
        <circle cx="28" cy="44" r="3.5" fill="#fff" opacity="0.35"/>
        <circle cx="32" cy="48" r="5" fill="#fff" opacity="0.2"/>
      </svg>
    `,
    className
  );
}

function humidity(className) {
  const g = uid("hu");
  return wrap(
    svg`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${g}a" x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stop-color="#64D2FF"/>
            <stop offset="55%" stop-color="#0A84FF"/>
            <stop offset="100%" stop-color="#0040DD"/>
          </linearGradient>
        </defs>
        <path fill="url(#${g}a)"
          d="M32 6C32 6 12 28 12 42c0 11 9 16 20 16s20-5 20-16C52 28 32 6 32 6z"/>
        <ellipse cx="24" cy="28" rx="6" ry="9" fill="#fff" opacity="0.28"
          transform="rotate(-20 24 28)"/>
        <text x="32" y="44" text-anchor="middle" font-size="16" font-weight="700"
          font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
          fill="#fff">%</text>
      </svg>
    `,
    className
  );
}

function luxIcon(level, className) {
  const g = uid("lx");
  // Five outdoor bands for 0–200 klx sensors.
  const cfg = {
    dark: { opacity: 0.4, rayH: 6, rays: 4, disc: "#6B7280", ray: "#9CA3AF", glow: false },
    low: { opacity: 0.65, rayH: 8, rays: 6, disc: "#F5D76E", ray: "#E0B000", glow: false },
    bright: { opacity: 0.9, rayH: 10, rays: 8, disc: "#FFE56A", ray: "#FFB100", glow: false },
    very: { opacity: 1, rayH: 11, rays: 8, disc: "#FFE56A", ray: "#FF9F0A", glow: true },
    full: { opacity: 1, rayH: 13, rays: 12, disc: "#FFF3C4", ray: "#FF9500", glow: true },
  }[level] || { opacity: 1, rayH: 10, rays: 8, disc: "#FFE56A", ray: "#FFB100", glow: false };

  const step = 360 / cfg.rays;
  const angles = Array.from({ length: cfg.rays }, (_, i) => i * step);

  return wrap(
    svg`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="${g}a" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFF8DC"/>
            <stop offset="55%" stop-color="${cfg.disc}"/>
            <stop offset="100%" stop-color="${cfg.ray}"/>
          </radialGradient>
          ${cfg.glow
            ? svg`<radialGradient id="${g}glow" cx="50%" cy="50%" r="50%">
                <stop offset="40%" stop-color="#FFB100" stop-opacity="0.35"/>
                <stop offset="100%" stop-color="#FFB100" stop-opacity="0"/>
              </radialGradient>`
            : nothing}
        </defs>
        ${cfg.glow
          ? svg`<circle cx="32" cy="32" r="30" fill="url(#${g}glow)"/>`
          : nothing}
        ${angles.map(
          (deg) => svg`
            <rect x="29.5" y="${7 - (cfg.rayH - 8) / 2}" width="5" height="${cfg.rayH}" rx="2.5"
              fill="${cfg.ray}" opacity="${cfg.opacity}"
              transform="rotate(${deg} 32 32)"/>
          `
        )}
        <circle cx="32" cy="32" r="${level === "dark" ? 11 : 13}" fill="url(#${g}a)" opacity="${cfg.opacity}"/>
        ${level !== "dark"
          ? svg`<circle cx="27" cy="27" r="3.5" fill="#fff" opacity="0.35"/>`
          : nothing}
      </svg>
    `,
    className
  );
}

function uv(className, opts = {}) {
  const g = uid("uv");
  const raw = opts.value;
  const n =
    raw != null && raw !== "" && Number.isFinite(Number(raw))
      ? String(Math.round(Number(raw)))
      : raw != null && raw !== ""
        ? String(raw)
        : "";
  const badge = opts.color || "#ffb300";
  return wrap(
    svg`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="${g}s" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#FFE56A"/>
            <stop offset="100%" stop-color="#FFB100"/>
          </radialGradient>
        </defs>
        ${[0, 45, 90, 135, 180, 225, 270, 315].map(
          (deg) => svg`
            <rect x="27.5" y="4" width="5" height="10" rx="2.5"
              fill="#FF9F0A" transform="rotate(${deg} 30 28)"/>
          `
        )}
        <circle cx="30" cy="28" r="13" fill="url(#${g}s)"/>
        <circle cx="26" cy="24" r="3.5" fill="#fff" opacity="0.35"/>
        <rect x="34" y="36" width="26" height="26" rx="7" fill="${badge}"/>
        <rect x="36" y="38" width="22" height="10" rx="4" fill="#fff" opacity="0.18"/>
        ${n !== ""
          ? svg`<text x="47" y="50" text-anchor="middle" dominant-baseline="central"
              font-size="${n.length > 1 ? 14 : 16}" font-weight="800"
              font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif"
              fill="#fff">${n}</text>`
          : nothing}
      </svg>
    `,
    className
  );
}

function wind(className, opts = {}) {
  const g = uid("wd");
  const n =
    opts.value != null && Number.isFinite(Number(opts.value))
      ? String(Math.round(Number(opts.value)))
      : "";
  return wrap(
    svg`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${g}a" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#AEAEB2"/>
            <stop offset="100%" stop-color="#636366"/>
          </linearGradient>
        </defs>
        <!-- Top stroke with upward hook -->
        <path fill="none" stroke="url(#${g}a)" stroke-width="6.5" stroke-linecap="round"
          d="M6 22 H36 C47 22 51 15 44 10"/>
        <!-- Bottom stroke with downward hook; open space holds the Bft number -->
        <path fill="none" stroke="url(#${g}a)" stroke-width="6.5" stroke-linecap="round"
          d="M6 38 H28 C40 38 44 48 36 54"/>
        ${n !== ""
          ? svg`
              <text x="46" y="46" text-anchor="middle" dominant-baseline="central"
                font-size="${n.length > 1 ? 15 : 18}" font-weight="800"
                font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif"
                fill="#1C1C1E"
                stroke="#fff" stroke-width="3" paint-order="stroke fill"
                stroke-linejoin="round">${n}</text>
            `
          : nothing}
      </svg>
    `,
    className
  );
}

function windGust(className, opts = {}) {
  return wind(className, opts);
}

function gauge(className) {
  const g = uid("ga");
  return wrap(
    svg`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${g}r" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#E8EAED"/>
            <stop offset="50%" stop-color="#9AA0A8"/>
            <stop offset="100%" stop-color="#D8DCE2"/>
          </linearGradient>
          <radialGradient id="${g}f" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#4A5160"/>
            <stop offset="100%" stop-color="#1C1F26"/>
          </radialGradient>
          <linearGradient id="${g}n" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stop-color="#FF453A"/>
            <stop offset="100%" stop-color="#FF6961"/>
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="26" fill="url(#${g}r)"/>
        <circle cx="32" cy="32" r="20" fill="url(#${g}f)"/>
        ${[30, 60, 90, 120, 150, 210, 240, 270, 300, 330].map(
          (deg) => svg`
            <rect x="31" y="14" width="2" height="5" rx="1" fill="#C8CDD6"
              transform="rotate(${deg} 32 32)"/>
          `
        )}
        <rect x="30.5" y="16" width="3" height="18" rx="1.5" fill="url(#${g}n)"/>
        <circle cx="32" cy="32" r="5" fill="url(#${g}n)"/>
        <circle cx="32" cy="32" r="2" fill="#fff" opacity="0.5"/>
      </svg>
    `,
    className
  );
}

function battery(level, className) {
  const g = uid("bat");
  const fill =
    level === "full" || level === "high"
      ? { a: "#30D158", b: "#248A3D" }
      : level === "medium"
        ? { a: "#FFD60A", b: "#FF9F0A" }
        : level === "low" || level === "outline"
          ? { a: "#FF453A", b: "#D70015" }
          : { a: "#8E8E93", b: "#636366" };
  const height =
    level === "full"
      ? 28
      : level === "high"
        ? 22
        : level === "medium"
          ? 14
          : level === "low"
            ? 8
            : level === "outline"
              ? 0
              : 10;
  return wrap(
    svg`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${g}a" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${fill.a}"/>
            <stop offset="100%" stop-color="${fill.b}"/>
          </linearGradient>
          <linearGradient id="${g}b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#E8ECF2"/>
            <stop offset="100%" stop-color="#8A94A4"/>
          </linearGradient>
        </defs>
        <rect x="24" y="6" width="16" height="6" rx="2" fill="url(#${g}b)"/>
        <rect x="16" y="10" width="32" height="46" rx="6" fill="url(#${g}b)"/>
        <rect x="20" y="14" width="24" height="38" rx="3.5" fill="#1C1F26" opacity="0.55"/>
        ${height
          ? svg`<rect x="22" y="${50 - height}" width="20" height="${height}" rx="2.5" fill="url(#${g}a)"/>`
          : nothing}
      </svg>
    `,
    className
  );
}

function arrowUp(className) {
  return wrap(
    svg`
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor"
          d="M12 4l6 7h-4v9h-4V11H6l6-7z"/>
      </svg>
    `,
    className
  );
}

function arrowDown(className) {
  return wrap(
    svg`
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor"
          d="M12 20l-6-7h4V4h4v9h4l-6 7z"/>
      </svg>
    `,
    className
  );
}

function trendSteady(className) {
  return wrap(
    svg`
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M4 11h16v2H4z"/>
      </svg>
    `,
    className
  );
}

function compassNeedle(className) {
  const g = uid("cn");
  // Hub sits exactly at viewBox center (12,12) so rotation around the
  // compass middle keeps the needle visually centered.
  return wrap(
    svg`
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${g}a" x1="0.5" y1="1" x2="0.5" y2="0">
            <stop offset="0%" stop-color="#0A84FF"/>
            <stop offset="100%" stop-color="#64D2FF"/>
          </linearGradient>
        </defs>
        <path fill="url(#${g}a)"
          d="M12 2.2 L16.2 17.2 L12 14.2 L7.8 17.2 Z"/>
        <circle cx="12" cy="12" r="2.4" fill="url(#${g}a)"/>
        <circle cx="12" cy="12" r="1.1" fill="#fff" opacity="0.9"/>
      </svg>
    `,
    className
  );
}

/**
 * Render an Apple-style card icon by logical name.
 * @param {string} name
 * @param {string} [className]
 * @param {{ value?: number|string, color?: string }} [opts]
 */
export function wscIcon(name, className = "", opts = {}) {
  switch (name) {
    case "sunny":
    case "clear_sky":
      return sun(className);
    case "night":
    case "clear_night":
      return moon(className);
    case "cloudy":
      return cloudy(className);
    case "partly_cloudy":
      return partlyCloudy(className);
    case "rainy":
    case "rain":
      return rainy(className);
    case "partly_rainy":
      return partlyRainy(className);
    case "snowy":
    case "snow":
      return snowy(className);
    case "thermometer":
    case "feels_like":
      return thermometer(className, opts);
    case "dewpoint":
      return dewpointIcon(className);
    case "heat_stress":
      return heatStress(className, opts);
    case "humidity":
      return humidity(className);
    case "lux_dark":
    case "brightness_2":
      return luxIcon("dark", className);
    case "lux_low":
    case "brightness_5":
      return luxIcon("low", className);
    case "lux_bright":
    case "brightness_6":
      return luxIcon("bright", className);
    case "lux_very_bright":
    case "brightness_7":
      return luxIcon("very", className);
    case "lux_full_sun":
      return luxIcon("full", className);
    case "uv":
      return uv(className, opts);
    case "wind":
      return wind(className, opts);
    case "wind_gust":
      return windGust(className, opts);
    case "gauge":
    case "pressure":
      return gauge(className);
    case "battery":
    case "battery_full":
      return battery("full", className);
    case "battery_high":
      return battery("high", className);
    case "battery_medium":
      return battery("medium", className);
    case "battery_low":
      return battery("low", className);
    case "battery_outline":
      return battery("outline", className);
    case "battery_unknown":
      return battery("unknown", className);
    case "arrow_up":
      return arrowUp(className);
    case "arrow_down":
      return arrowDown(className);
    case "trend_up":
      return arrowUp(className);
    case "trend_down":
      return arrowDown(className);
    case "trend_steady":
      return trendSteady(className);
    case "compass_needle":
    case "navigation":
      return compassNeedle(className);
    default:
      return nothing;
  }
}
