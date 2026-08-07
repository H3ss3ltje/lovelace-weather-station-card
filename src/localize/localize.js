import * as en from "./languages/en.js";
import * as nl from "./languages/nl.js";
import * as es from "./languages/es.js";
import * as de from "./languages/de.js";

const languages = {
  en: en.default,
  nl: nl.default,
  es: es.default,
  de: de.default,
};

/**
 * Resolve a dotted key like "sections.temperature" from a language pack.
 */
function getByPath(obj, path) {
  return path.split(".").reduce((acc, part) => (acc && acc[part] != null ? acc[part] : undefined), obj);
}

/**
 * Localize a string using the Home Assistant UI language.
 * Falls back to English, then to the raw key.
 *
 * Supports simple placeholders: localize(hass, "dewpoint", { value: 14, unit: "°C" })
 */
export function localize(hass, key, replace = {}) {
  const lang =
    (hass && (hass.locale?.language || hass.language || hass.selectedLanguage)) ||
    "en";
  const short = String(lang).replace("_", "-").split("-")[0].toLowerCase();

  let translated =
    getByPath(languages[short], key) ??
    getByPath(languages.en, key) ??
    key;

  if (typeof translated !== "string") return key;

  Object.keys(replace).forEach((placeholder) => {
    translated = translated.replace(`{${placeholder}}`, String(replace[placeholder]));
  });

  return translated;
}

export { languages };
