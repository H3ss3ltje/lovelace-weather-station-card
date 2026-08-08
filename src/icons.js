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
        ${[0, 45, 90, 135, 180, 225, 270, 315].map(
          (deg) => svg`
            <rect x="29.5" y="4" width="5" height="11" rx="2.5"
              fill="url(#${g}b)"
              transform="rotate(${deg} 32 32)"/>
          `
        )}
        <circle cx="32" cy="32" r="14" fill="url(#${g}a)"/>
        <circle cx="27" cy="27" r="4.5" fill="#fff" opacity="0.35"/>
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
        <ellipse cx="40" cy="30" rx="14" ry="10" fill="url(#${g}b)" opacity="0.85"/>
        <path fill="url(#${g}a)"
          d="M18 42c-6.6 0-12-5-12-11.2 0-5.4 3.8-10 9.1-11.2C16.6 13.4 22.8 9 30.2 9
             c8.4 0 15.4 5.8 17 13.5 1.2-.3 2.4-.5 3.7-.5 7.4 0 13.4 5.8 13.4 13
             0 7.2-6 13-13.4 13H18z"/>
        <ellipse cx="26" cy="28" rx="8" ry="5" fill="#fff" opacity="0.18"/>
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
          <radialGradient id="${g}s" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFE56A"/>
            <stop offset="100%" stop-color="#FF9500"/>
          </radialGradient>
          <linearGradient id="${g}c" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#D8DEE8"/>
            <stop offset="100%" stop-color="#8A94A4"/>
          </linearGradient>
        </defs>
        <circle cx="22" cy="22" r="10" fill="url(#${g}s)"/>
        ${[210, 240, 270, 300, 330].map(
          (deg) => svg`
            <rect x="19.5" y="3" width="5" height="8" rx="2.5"
              fill="#FFB100" transform="rotate(${deg} 22 22)"/>
          `
        )}
        <path fill="url(#${g}c)"
          d="M16 46c-5.5 0-10-4.2-10-9.4 0-4.5 3.2-8.3 7.6-9.3C14.6 21.4 19.8 18 26 18
             c7 0 12.9 4.8 14.3 11.4 1-.3 2-.4 3.1-.4 6.2 0 11.2 4.8 11.2 10.8
             S49.6 50 43.4 50H16z"/>
        <ellipse cx="28" cy="34" rx="7" ry="4" fill="#fff" opacity="0.16"/>
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
        <path fill="url(#${g}c)"
          d="M14 34c-5.5 0-10-4.2-10-9.4 0-4.5 3.2-8.3 7.6-9.3C12.6 9.4 17.8 6 24 6
             c7 0 12.9 4.8 14.3 11.4 1-.3 2-.4 3.1-.4 6.2 0 11.2 4.8 11.2 10.8
             S47.6 38 41.4 38H14z"/>
        <rect x="18" y="42" width="5" height="14" rx="2.5" fill="url(#${g}d)"/>
        <rect x="30" y="44" width="5" height="14" rx="2.5" fill="url(#${g}d)"/>
        <rect x="42" y="42" width="5" height="14" rx="2.5" fill="url(#${g}d)"/>
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
        <circle cx="18" cy="18" r="8" fill="url(#${g}s)"/>
        ${[225, 270, 315].map(
          (deg) => svg`
            <rect x="15.5" y="3" width="5" height="7" rx="2.5"
              fill="#FFB100" transform="rotate(${deg} 18 18)"/>
          `
        )}
        <path fill="url(#${g}c)"
          d="M14 36c-5 0-9-3.8-9-8.5 0-4.1 2.9-7.5 6.9-8.4C12.8 13.6 17.5 10.5 23 10.5
             c6.3 0 11.7 4.4 13 10.3.9-.2 1.8-.3 2.8-.3 5.6 0 10.1 4.4 10.1 9.8
             S44.4 40 38.8 40H14z"/>
        <rect x="18" y="44" width="4.5" height="12" rx="2.2" fill="url(#${g}d)"/>
        <rect x="29" y="46" width="4.5" height="12" rx="2.2" fill="url(#${g}d)"/>
        <rect x="40" y="44" width="4.5" height="12" rx="2.2" fill="url(#${g}d)"/>
      </svg>
    `,
    className
  );
}

function thermometer(className) {
  const g = uid("th");
  return wrap(
    svg`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${g}a" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FF9F0A"/>
            <stop offset="100%" stop-color="#FF453A"/>
          </linearGradient>
          <linearGradient id="${g}b" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#F2F4F8"/>
            <stop offset="100%" stop-color="#A8B0BE"/>
          </linearGradient>
        </defs>
        <rect x="26" y="6" width="12" height="36" rx="6" fill="url(#${g}b)"/>
        <rect x="29" y="18" width="6" height="22" rx="3" fill="url(#${g}a)"/>
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
  const brightness =
    level === "dark" ? 0.35 : level === "low" ? 0.55 : level === "bright" ? 0.85 : 1;
  const rayH = level === "dark" ? 7 : level === "low" ? 9 : 11;
  return wrap(
    svg`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" opacity="${brightness + 0.15}">
        <defs>
          <radialGradient id="${g}a" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFF3C4"/>
            <stop offset="100%" stop-color="#FFB100"/>
          </radialGradient>
        </defs>
        ${[0, 45, 90, 135, 180, 225, 270, 315].map(
          (deg) => svg`
            <rect x="29.5" y="${8 - (rayH - 8) / 2}" width="5" height="${rayH}" rx="2.5"
              fill="#FFB100" opacity="${brightness}"
              transform="rotate(${deg} 32 32)"/>
          `
        )}
        <circle cx="32" cy="32" r="12" fill="url(#${g}a)"/>
        <circle cx="28" cy="28" r="3.5" fill="#fff" opacity="0.35"/>
      </svg>
    `,
    className
  );
}

function uv(className) {
  const g = uid("uv");
  return wrap(
    svg`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="${g}a" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFE56A"/>
            <stop offset="100%" stop-color="#FF9F0A"/>
          </radialGradient>
          <linearGradient id="${g}b" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#BF5AF2"/>
            <stop offset="100%" stop-color="#5E5CE6"/>
          </linearGradient>
        </defs>
        <circle cx="32" cy="30" r="13" fill="url(#${g}a)"/>
        ${[0, 45, 90, 135, 180, 225, 270, 315].map(
          (deg) => svg`
            <rect x="29.5" y="5" width="5" height="8" rx="2.5"
              fill="#FFB100" transform="rotate(${deg} 32 30)"/>
          `
        )}
        <circle cx="32" cy="48" r="9" fill="url(#${g}b)"/>
        <text x="32" y="52" text-anchor="middle" font-size="11" font-weight="800"
          font-family="-apple-system, BlinkMacSystemFont, sans-serif" fill="#fff">UV</text>
      </svg>
    `,
    className
  );
}

function wind(className) {
  const g = uid("wd");
  return wrap(
    svg`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${g}a" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#64D2FF"/>
            <stop offset="100%" stop-color="#0A84FF"/>
          </linearGradient>
        </defs>
        <path fill="none" stroke="url(#${g}a)" stroke-width="5" stroke-linecap="round"
          d="M8 22h34c5 0 9 4 9 9s-4 9-9 9"/>
        <path fill="none" stroke="url(#${g}a)" stroke-width="5" stroke-linecap="round"
          d="M8 34h28c4 0 7 3 7 7s-3 7-7 7"/>
        <path fill="none" stroke="url(#${g}a)" stroke-width="5" stroke-linecap="round"
          d="M8 46h22"/>
      </svg>
    `,
    className
  );
}

function windGust(className) {
  const g = uid("wg");
  return wrap(
    svg`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${g}a" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#5AC8FA"/>
            <stop offset="100%" stop-color="#007AFF"/>
          </linearGradient>
        </defs>
        <path fill="none" stroke="url(#${g}a)" stroke-width="4.5" stroke-linecap="round"
          d="M6 18h36c5.5 0 10 4.5 10 10s-4.5 10-10 10"/>
        <path fill="none" stroke="url(#${g}a)" stroke-width="4.5" stroke-linecap="round"
          d="M6 32h30c4.5 0 8 3.5 8 8s-3.5 8-8 8"/>
        <path fill="none" stroke="url(#${g}a)" stroke-width="4.5" stroke-linecap="round"
          d="M6 46h24"/>
        <path fill="#FF9F0A" d="M48 10l8 8-8 8V10z"/>
      </svg>
    `,
    className
  );
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
  return wrap(
    svg`
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${g}a" x1="0.5" y1="1" x2="0.5" y2="0">
            <stop offset="0%" stop-color="#0A84FF"/>
            <stop offset="100%" stop-color="#64D2FF"/>
          </linearGradient>
        </defs>
        <path fill="url(#${g}a)" d="M12 2l4.5 16.5L12 15l-4.5 3.5L12 2z"/>
        <circle cx="12" cy="14" r="1.8" fill="#fff" opacity="0.85"/>
      </svg>
    `,
    className
  );
}

/**
 * Render an Apple-style card icon by logical name.
 * @param {string} name
 * @param {string} [className]
 */
export function wscIcon(name, className = "") {
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
    case "thermometer":
      return thermometer(className);
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
    case "uv":
      return uv(className);
    case "wind":
      return wind(className);
    case "wind_gust":
      return windGust(className);
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
