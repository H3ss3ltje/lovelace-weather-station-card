# Weather Station Card

A modern, minimalistic, **Mushroom-inspired** custom Lovelace card for Home Assistant that displays all of your weather station sensors in one clean, responsive card.

Everything is configurable through the UI or YAML — no entity IDs are hardcoded, and every section is optional and hides itself automatically when its entity is not configured.

![HACS Custom](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)
![Version](https://img.shields.io/badge/version-1.8.0-blue.svg)

---

## Features

- **One single card** for your whole weather station.
- **Automatic weather condition** (sunny / cloudy / rain / night) derived from your sensors, with optional **sun-based day/night detection** and a **manual override**.
- **Temperature** with a friendly "feels like" description.
- **Humidity** with an optional **dew point** (Magnus formula, off by default).
- **Rain** detection + rate (mm/h).
- **Wind** speed, compass direction with a **visual compass indicator**, and optional **gusts**.
- **Standalone large compass card** (`weather-station-compass-card`) you can place separately on a dashboard.
- **Light / Lux** interpreted as _Dark / Low light / Bright / Very bright_.
- **UV index** with warning levels _Low → Extreme_.
- **Pressure** with an optional **trend** indicator and configurable threshold.
- **Battery** with automatic icon selection.
- **Configurable tap / hold / double-tap actions** per section (more-info, navigate, url, call-service…).
- **Visual editor** with entity pickers and toggles, similar to Power Flow Card Plus.
- Uses **Home Assistant theme variables** — adapts to light & dark mode.
- Built with **LitElement**, no external UI frameworks. Custom **Apple Weather–style SVG icons**.
- **Multi-language**: English, Dutch, Spanish, and German (follows Home Assistant language).

---

## Installation

### HACS (recommended)

1. Open **HACS → Frontend**.
2. Click the three-dot menu (top right) → **Custom repositories**.
3. Add this repository URL and choose category **Lovelace** (a.k.a. _Dashboard_).
4. Search for **Weather Station Card** and click **Download**.
5. Reload your browser. The resource is added automatically by HACS.

> Once this repository is added to the HACS default store you'll be able to find it directly in **HACS → Frontend** without adding a custom repository.

### Manual installation

1. Download `weather-station-card.js` from the [latest release](https://github.com/your-username/lovelace-weather-station-card/releases) (or build it yourself, see below).
2. Copy it to `config/www/weather-station-card.js`.
3. Add it as a dashboard resource: **Settings → Dashboards → ⋮ → Resources → Add resource**

   ```yaml
   url: /local/weather-station-card.js
   type: module
   ```

4. Reload your browser.

---

## Usage

Add the card from the dashboard UI (**Add card → Weather Station Card**) and use the visual editor, or paste YAML directly.

### Minimal

```yaml
type: custom:weather-station-card
title: Weather Station
temperature_entity: sensor.temperature
humidity_entity: sensor.humidity
```

### Large compass only

Add **Weather Station Compass** from the card picker, or:

```yaml
type: custom:weather-station-compass-card
title: Kompas
wind_direction_entity: sensor.weerstation_wind_direction
wind_speed_entity: sensor.weerstation_wind_speed
wind_gust_entity: sensor.weerstation_wind_gust
settings:
  show_beaufort: true
  show_wind_gust: true
```

You can also enable `settings.compass_only: true` on the main weather station card.

### Full example

```yaml
type: custom:weather-station-card
title: Weather Station
temperature_entity: sensor.temperature
humidity_entity: sensor.humidity
lux_entity: sensor.illuminance
uv_entity: sensor.uv_index
rain_entity: binary_sensor.rain_status
rain_rate_entity: sensor.rain_rate
precipitation_entity: sensor.precipitation
wind_speed_entity: sensor.wind_speed
wind_direction_entity: sensor.wind_direction
wind_gust_entity: sensor.gust_speed
pressure_entity: sensor.pressure
pressure_trend_entity: sensor.pressure_trend
battery_entity: sensor.battery
voltage_entity: sensor.voltage
dewpoint_entity: sensor.dew_point
apparent_temperature_entity: sensor.apparent_temperature
heat_stress_entity: sensor.heat_stress
condition_entity: sensor.weather_condition
sun_entity: sun.sun

settings:
  show_dewpoint: true
  show_feels_like: true
  show_heat_stress: true
  show_pressure_trend: true
  show_battery: true
  show_voltage: true
  show_wind_gust: true
  show_interactions: true
  show_daynight: true
```

More examples live in the [`examples/`](./examples) folder.

---

## Configuration

### Entities

All entities are optional. A section is only rendered when its entity is set. Zigbee2MQTT weather-station exposes map 1:1 to these options.

| Option                         | Type   | Description                                              |
| ------------------------------ | ------ | -------------------------------------------------------- |
| `temperature_entity`           | string | Temperature (°C).                                        |
| `humidity_entity`              | string | Relative humidity (%).                                   |
| `lux_entity`                   | string | Illuminance (lx).                                        |
| `uv_entity`                    | string | UV index.                                                |
| `rain_entity`                  | string | Rain status (binary / on-off).                           |
| `rain_rate_entity`             | string | Rain rate (mm/h).                                        |
| `precipitation_entity`         | string | Precipitation total (mm). Prefer over `rain_today_entity`. |
| `rain_today_entity`            | string | Alternate daily rain total (mm).                         |
| `wind_speed_entity`            | string | Wind speed (m/s).                                        |
| `wind_direction_entity`        | string | Wind direction (°, 0–360).                               |
| `wind_gust_entity`             | string | Gust speed (m/s).                                        |
| `pressure_entity`              | string | Atmospheric pressure (hPa / kPa).                        |
| `pressure_trend_entity`        | string | Pressure change rate (hPa/h; negative = falling).        |
| `battery_entity`               | string | Battery level (%).                                       |
| `voltage_entity`               | string | Battery voltage (mV).                                    |
| `capacitor_voltage_entity`     | string | Capacitor voltage (V).                                   |
| `dewpoint_entity`              | string | Dew point (°C). Falls back to calculated dew point.      |
| `apparent_temperature_entity`  | string | Apparent / feels-like temperature (°C).                  |
| `wind_chill_entity`            | string | Wind chill (°C).                                         |
| `humidex_entity`               | string | Humidex (°C).                                            |
| `heat_stress_entity`           | string | Heat stress (0–100%).                                    |
| `condition_entity`             | string | Weather condition text (sunny, rainy, snowy, …).         |
| `sun_entity`                   | string | `sun.sun` for day/night and sunrise/sunset.              |
| `title`                        | string | Card title. Default: `Weather Station`.                  |

### Settings

| Option                       | Type    | Default | Description                                              |
| ---------------------------- | ------- | ------- | -------------------------------------------------------- |
| `show_daynight`              | boolean | `true`  | Use the sun entity (or lux) for day/night condition.     |
| `manual_condition`           | string  | `""`    | When day/night is off: `sunny`/`cloudy`/`rainy`/`night`. |
| `show_sun`                   | boolean | `true`  | Show the sunrise / sunset path diagram.                  |
| `night_palette`              | boolean | `true`  | Stronger moon / night colours on the sun diagram.        |
| `lux_in_klux`                | boolean | `false` | Set if `lux_entity` already reports kilolux (0–200).     |
| `compact_mode`               | boolean | `false` | Hero + sun only (hide the sensor tile grid).             |
| `compass_only`               | boolean | `false` | Large standalone compass layout (also used by `weather-station-compass-card`). |
| `tile_order`                 | list    | see below | Order of tiles: `lux`, `temperature`, `feels_like`, `humidity`, `dewpoint`, `rain`, `wind`, `uv`, `pressure`, `heat_stress`, `battery`. |
| `show_dewpoint`              | boolean | `true`  | Show dew point (entity or calculated).                   |
| `show_feels_like`            | boolean | `true`  | Show feels-like (apparent / wind chill / humidex).       |
| `show_heat_stress`           | boolean | `true`  | Show heat stress tile when configured.                   |
| `show_minmax`                | boolean | `true`  | Show today's min / max temperature in the hero.          |
| `show_rain_today`            | boolean | `true`  | Show precipitation / rain today when configured.         |
| `show_beaufort`              | boolean | `true`  | Show Beaufort number + description on the wind tile.     |
| `show_wind_gust`             | boolean | `true`  | Show wind gust in the wind tile.                         |
| `invert_wind_direction`      | boolean | `false` | Flip 180° when the sensor reports *toward* instead of meteorological *from*. |
| `show_battery`               | boolean | `true`  | Show the battery tile.                                   |
| `show_voltage`               | boolean | `true`  | Show battery / capacitor voltage under battery.          |
| `show_pressure_trend`        | boolean | `true`  | Show rising/steady/falling pressure trend.               |
| `pressure_trend_threshold`   | number  | `0.3`   | Rate (hPa/h) needed to flag rising/falling.              |
| `show_interactions`          | boolean | `true`  | Enable tap/hold/double-tap actions on sections.          |

### Interactions

When `show_interactions` is enabled, each interactive section defaults to opening the **more-info** dialog. Override per section with a `<section>_action` object supporting the standard Home Assistant `tap_action`, `hold_action` and `double_tap_action`:

```yaml
settings:
  show_interactions: true

temperature_action:
  tap_action:
    action: more-info
wind_action:
  tap_action:
    action: navigate
    navigation_path: /lovelace/wind
rain_action:
  tap_action:
    action: url
    url_path: https://www.buienradar.nl
humidity_action:
  tap_action:
    action: more-info
```

Supported actions: `more-info`, `navigate`, `url`, `call-service`, `toggle`, `none`.

---

## Interpretations

**Lux → label** (outdoor 0–200 klx)

| Lux (klx)     | Label       |
| ------------- | ----------- |
| 0–0.1         | Dark        |
| 0.1–2         | Low light   |
| 2–20          | Bright      |
| 20–80         | Very bright |
| 80–200        | Full sun    |

If your sensor already reports **kilolux** (0–200) instead of lux, enable `settings.lux_in_klux: true`.

**UV index → level**

| UV    | Level     |
| ----- | --------- |
| 0–2   | Low       |
| 3–5   | Moderate  |
| 6–7   | High      |
| 8–10  | Very high |
| 11+   | Extreme   |

**Dew point** uses the Magnus-Tetens approximation (`a = 17.62`, `b = 243.12 °C`).

---

## Development

```bash
npm install
npm run build      # outputs dist/weather-station-card.js
npm run watch      # dev server on :5500 with live rebuild
```

Point a dashboard resource at `http://<your-ip>:5500/weather-station-card.js` (type: `module`) while developing.

Project layout:

```
lovelace-weather-station-card/
├── src/
│   ├── weather-station-card.js   # main card (LitElement)
│   ├── editor.js                 # visual configuration editor
│   ├── const.js                  # constants & defaults
│   └── utils.js                  # calculations & mappings
├── dist/
│   └── weather-station-card.js   # built bundle (shipped to HACS)
├── examples/                     # YAML examples
├── hacs.json
├── rollup.config.js
└── package.json
```

---

## License

[MIT](./LICENSE)
