# GALACTIC NEUROCREW

- **Developed By:** Delia Gaibor Sanchez

---

## Educational Purpose

**GALACTIC NEUROCREW** is an inclusive 2D educational web game designed for children aged **7–12**. Players manage a simulated lunar outpost across **5 progressive levels (15 interactive challenges)** and discover that space exploration involves real engineering trade-offs across:

- Oxygen and life-support reserves
- Water conservation and recycling
- Solar energy generation, battery storage, and power budgets
- Space-weather awareness and radiation shielding
- Lunar greenhouse crops, stored food reserves, and Earth–Moon communication delays

Every decision produces deterministic resource changes calculated in JavaScript, paired with immediate explanations (**YOUR DECISION**, **WHAT HAPPENED?**, **WHY DOES THIS MATTER IN SPACE?**, and **MISSION LESSON**).

---

## Architecture & Pure Web Stack

Built with **HTML5, CSS3, Vanilla ES6+ JavaScript Modules, JSON, Fetch API, and inline 2D SVG illustrations**:

- `index.html` — Entry page with PWA metadata and accessible skip link
- `styles.css` — Responsive NASA mission-control palette, high-contrast theme, scalable text sizes, and reduced-motion rules
- `manifest.json` & `sw.js` — Installable PWA manifest (service worker never caches NASA API responses offline)
- `js/app.js` — Screen router, Top Bar, live subtitle & speech bar, Accessibility settings, and NASA Data screen
- `js/characters.js` — Original 2D child astronauts (Leo & Maya) with consistent proportions and 5 expressions
- `js/environments.js` — 5 distinct interactive 2D lunar scenes, 15 challenge states, decision pictograms, and mission badges
- `js/missions.js` & `js/challenges.js` — 5 levels, 15 challenges, and reproducible replay condition variants
- `js/resources.js` & `js/decisions.js` — Deterministic simulation engine and safety scoring
- `js/nasa-data.js` — Online NASA open-data retrieval module
- `js/accessibility.js`, `js/audio.js`, `js/storage.js`, `js/report.js`

---

## NASA DATA SOURCES AND SCIENTIFIC CONTEXT

All NASA data is retrieved **online only** during active browser sessions using public endpoints (`DEMO_KEY` where required). Responses are validated and reused in memory within the same session only to respect `DEMO_KEY` rate limits. No NASA dataset is cached offline, and all game resource bars (`0–100%`) are explicitly labeled as **educational simulation parameters**.

| Dataset / API | Official Docs & Endpoint Used | Type | Levels Used | Game Impact & Limitations |
| :--- | :--- | :--- | :--- | :--- |
| **NASA DONKI** | Docs: `https://api.nasa.gov/`<br>Endpoints: `https://api.nasa.gov/DONKI/CME`, `/SEP`, `/GST` (`api_key=DEMO_KEY`) | Live archive (30-day window) | Level 3 (3.1, 3.3), Level 5 | Provides real recent space-weather observations and teaches differences between solar flares, CMEs, SEPs, and geomagnetic storms. **Limitation:** DONKI does not measure crew radiation dose inside a lunar habitat; `/DONKI/FLR` returned HTTP 404 on the public gateway during verification, so CME/SEP/GST are queried and offline/error states fall back to clearly labeled educational simulation. |
| **NASA EPIC** | Docs: `https://epic.gsfc.nasa.gov/about/api`<br>Endpoint: `https://epic.gsfc.nasa.gov/api/natural` | Live daily Earth imagery | Level 1, Level 4, NASA Data Explorer | Shows real Earth photos and DSCOVR coordinates to explain Earth–Moon distance and radio delay. **Limitation:** Observes Earth from Sun–Earth L1, not lunar surface conditions. |
| **NASA Image & Video Library** | Docs: `https://images.nasa.gov/`<br>Endpoint: `https://images-api.nasa.gov/search?q=...&media_type=image` | Archival mission media | Level 1, Level 3, Level 4, NASA Data Explorer | Supplies real lunar surface, solar observatory, and ISS plant-growth (Veggie) photos with `nasa_id` attribution alongside the original 2D characters. |
| **NASA Moon Trek WMTS** | Docs: `https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=moon`<br>Capabilities: `https://trek.nasa.gov/tiles/Moon/EQ/LRO_WAC_Mosaic_Global_303ppd_v02/1.0.0/WMTSCapabilities.xml` | Archival LRO mosaic tiles | Level 1 & 5 context, NASA Data Explorer | Parses `WMTSCapabilities.xml` first to verify Layer (`LRO_WAC_Mosaic_Global_303ppd_v02`), Style (`default`), and TileMatrixSet (`default028mm`) before rendering lunar terrain tiles. |
| **NASA InSight Mars Weather** | Docs: `https://mars.nasa.gov/insight/weather/`<br>Endpoint: `https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0` | Historical mission data (mission ended) | NASA Data Explorer | Optional Mars-vs-Moon educational comparison. Missing sensors are displayed as unavailable, never converted to `0`. |
| **NASA OSDR** | Docs: `https://osdr.nasa.gov/` & `https://visualization.osdr.nasa.gov/biodata/api/` | Documented CORS limitation | Level 4 educational reference | **Verified Limitation:** Direct browser `fetch()` from third-party origins is blocked by upstream `Access-Control-Allow-Origin` headers on `osdr.nasa.gov` and `visualization.osdr.nasa.gov`. Level 4 honestly documents this limitation and uses verified NASA Image Library space-plant media instead of fabricating OSDR records. |

---

## Running Locally & Deploying on GitHub Pages

1. **Static HTTP Server / GitHub Pages:** Serve the repository root directly over HTTPS/HTTP (`python3 -m http.server 3000` or GitHub Pages from root). Opening `index.html` via `file://` may restrict ES modules or CORS fetches in some browsers, so use a local HTTP server or GitHub Pages.
2. **Vite Development / Build (optional):** `npm run dev` serves the app on port `3000`, and `npm run build` produces a static `dist/` bundle with `manifest.json`, `sw.js`, and `assets/`.

---


