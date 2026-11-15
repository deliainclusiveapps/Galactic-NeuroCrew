const sessionMemory = {
  donki: null,
  epic: null,
  images: {},
  moonTrek: null,
  insight: null
};

function formatDateISO(dateObj) {
  return dateObj.toISOString().slice(0, 10);
}

function getDateWindow(daysBack) {
  const end = new Date();
  const start = new Date(end.getTime() - daysBack * 24 * 60 * 60 * 1000);
  return { startDate: formatDateISO(start), endDate: formatDateISO(end) };
}

export const SPACE_WEATHER_GLOSSARY = {
  FLR: {
    term: 'Solar Flare',
    meaning: 'A sudden flash of bright light and X-ray energy from the Sun that reaches the Moon in about 8 minutes.'
  },
  CME: {
    term: 'Coronal Mass Ejection (CME)',
    meaning: 'A huge cloud of magnetic solar plasma pushed out by the Sun that takes 1 to 3 days to travel through space.'
  },
  SEP: {
    term: 'Solar Energetic Particle (SEP) Event',
    meaning: 'Fast-moving protons and particles accelerated by solar eruptions that require shelter shielding for astronauts.'
  },
  GST: {
    term: 'Geomagnetic Storm',
    meaning: 'A disturbance in Earth’s magnetic field caused when solar wind or a CME pushes against Earth’s magnetosphere.'
  }
};

export const NASA_DATASET_CATALOG = [
  {
    id: 'donki',
    name: 'NASA DONKI (Space Weather Database Of Notifications, Knowledge, Information)',
    docsUrl: 'https://api.nasa.gov/',
    endpoint: 'https://api.nasa.gov/DONKI/CME, /SEP, /GST?startDate=...&endDate=...&api_key=DEMO_KEY',
    fields: 'activityID, startTime, note, instruments, gstID, allKpIndex',
    dataType: 'Live operational archive (last 30 days)',
    usedIn: 'Level 3 (Challenges 3.1, 3.3) & Level 5 Space-Weather Context',
    relevance: 'Connects real solar observations to crew protection planning while teaching the difference between flares, CMEs, SEPs, and geomagnetic storms.',
    gameImpact: 'Informs whether Level 3 starts under Quiet Sun or Active Space-Weather observation conditions.',
    limitations: 'DONKI lists space-weather events, not radiation dose inside a lunar habitat. In addition, /DONKI/FLR returned HTTP 404 on the public gateway during verification, so CME, SEP, and GST are queried and missing endpoints fall back cleanly to labeled simulation.'
  },
  {
    id: 'epic',
    name: 'NASA EPIC (Earth Polychromatic Imaging Camera)',
    docsUrl: 'https://epic.gsfc.nasa.gov/about/api',
    endpoint: 'https://epic.gsfc.nasa.gov/api/natural',
    fields: 'identifier, image, date, caption, centroid_coordinates',
    dataType: 'Live daily Earth observations from DSCOVR',
    usedIn: 'Level 1, Level 4 (Earth-Moon Perspective & Comms Delay), NASA Data Explorer',
    relevance: 'Shows real Earth imagery from 1.5 million km away to help children understand distance and radio signal travel time.',
    gameImpact: 'Provides real observation visual context and coordinates; never used as a radiation or lunar measurement.',
    limitations: 'Shows Earth from the Sun-Earth L1 point, not the Moon’s surface.'
  },
  {
    id: 'images',
    name: 'NASA Image and Video Library',
    docsUrl: 'https://images.nasa.gov/',
    endpoint: 'https://images-api.nasa.gov/search?q={query}&media_type=image',
    fields: 'nasa_id, title, description, date_created, center, links.href',
    dataType: 'Archival & recent NASA mission photography',
    usedIn: 'Level 1 (Apollo lunar landing), Level 3 (Solar imagery), Level 4 (ISS plant growth / Veggie)',
    relevance: 'Complements the original 2D game illustrations with real spacecraft, lunar surface, and space-plant photographs.',
    gameImpact: 'Displays verified educational photos alongside mission briefings while keeping original 2D child astronauts as main characters.',
    limitations: 'Archival photos require human-curated queries to match each child-friendly lesson.'
  },
  {
    id: 'moontrek',
    name: 'NASA Moon Trek WMTS',
    docsUrl: 'https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=moon',
    endpoint: 'https://trek.nasa.gov/tiles/Moon/EQ/LRO_WAC_Mosaic_Global_303ppd_v02/1.0.0/WMTSCapabilities.xml',
    fields: 'Layer Identifier, Style, TileMatrixSet, ResourceURL template',
    dataType: 'Archival Lunar Reconnaissance Orbiter global mosaic tiles',
    usedIn: 'Level 1 & Level 5 Lunar Terrain Explorer and NASA Data Section',
    relevance: 'Demonstrates real lunar cratered terrain captured by NASA’s Lunar Reconnaissance Orbiter.',
    gameImpact: 'Powers the optional real Lunar Surface Map viewer alongside the illustrated 2D outpost.',
    limitations: 'Requires reading WMTSCapabilities XML first to verify Layer (LRO_WAC_Mosaic_Global_303ppd_v02) and TileMatrixSet (default028mm).'
  },
  {
    id: 'insight',
    name: 'NASA InSight Mars Weather Service',
    docsUrl: 'https://mars.nasa.gov/insight/weather/',
    endpoint: 'https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0',
    fields: 'sol_keys, AT (air temp), HWS (wind speed), PRE (pressure), First_UTC',
    dataType: 'Historical mission data (mission ended)',
    usedIn: 'NASA Data Explorer (Moon vs. Mars educational comparison)',
    relevance: 'Helps children compare an airless Moon with a thin-atmosphere planet like Mars.',
    gameImpact: 'Educational planetary comparison only; never alters lunar resource simulation numbers.',
    limitations: 'Mission ended (2020 Sols in feed); sensors can have missing measurements which are explicitly shown as unavailable rather than zero.'
  },
  {
    id: 'osdr',
    name: 'NASA OSDR (Open Science Data Repository)',
    docsUrl: 'https://osdr.nasa.gov/',
    endpoint: 'https://visualization.osdr.nasa.gov/biodata/api/',
    fields: 'Not directly fetched in browser due to CORS restriction',
    dataType: 'Biological spaceflight research portal (documented limitation)',
    usedIn: 'Level 4 Educational Context Reference',
    relevance: 'Space biology studies examine how plants and organisms respond to microgravity and radiation.',
    gameImpact: 'Direct browser fetch from third-party origins is blocked by upstream Access-Control-Allow-Origin headers on osdr.nasa.gov and visualization.osdr.nasa.gov. Documented honestly here; Level 4 uses verified NASA Image Library plant-growth photos instead of inventing OSDR data.',
    limitations: 'Blocked by upstream browser CORS policy when called from static browser hosts.'
  }
];

export async function fetchDonkiSpaceWeather() {
  if (sessionMemory.donki) {
    return sessionMemory.donki;
  }

  const { startDate, endDate } = getDateWindow(30);
  const endpoints = [
    {
      type: 'CME',
      url: `https://api.nasa.gov/DONKI/CME?startDate=${startDate}&endDate=${endDate}&api_key=DEMO_KEY`
    },
    {
      type: 'SEP',
      url: `https://api.nasa.gov/DONKI/SEP?startDate=${startDate}&endDate=${endDate}&api_key=DEMO_KEY`
    },
    {
      type: 'GST',
      url: `https://api.nasa.gov/DONKI/GST?startDate=${startDate}&endDate=${endDate}&api_key=DEMO_KEY`
    }
  ];

  const events = [];
  const errors = [];

  for (const item of endpoints) {
    try {
      const response = await fetch(item.url);
      if (!response.ok) {
        errors.push(`${item.type}: HTTP ${response.status}`);
        continue;
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        for (const entry of data.slice(-3)) {
          const id = entry.activityID || entry.sepID || entry.gstID || 'Verified Event';
          const time = entry.startTime || entry.eventTime || '';
          const kp =
            Array.isArray(entry.allKpIndex) && entry.allKpIndex[0]
              ? `Kp ${entry.allKpIndex[0].kpIndex}`
              : null;
          events.push({
            type: item.type,
            typeName: SPACE_WEATHER_GLOSSARY[item.type].term,
            id,
            date: time ? time.slice(0, 10) : 'Date unavailable',
            detail: kp
              ? `Observed geomagnetic index ${kp}.`
              : entry.note
                ? String(entry.note).slice(0, 140)
                : 'Recorded by NASA CCMC DONKI space-weather monitors.'
          });
        }
      }
    } catch {
      errors.push(`${item.type}: Network unavailable`);
    }
  }

  const hasLiveRecords = events.length > 0 || errors.length < endpoints.length;
  const result = {
    source: hasLiveRecords ? 'live-nasa' : 'simulation-fallback',
    sourceLabel: hasLiveRecords
      ? 'Real NASA DONKI Observation (CCMC)'
      : 'Educational Simulation Fallback (NASA DONKI Unreachable)',
    window: `${startDate} to ${endDate}`,
    retrievedAt: formatDateISO(new Date()),
    events: events.slice(0, 6),
    hasActiveEvents: events.length > 0,
    errors,
    scientificNote:
      'DONKI records show solar and geomagnetic activity observed near the Sun and Earth. They do not measure the exact radiation dose inside a lunar shelter.'
  };

  sessionMemory.donki = result;
  return result;
}

export async function fetchEpicEarthImage() {
  if (sessionMemory.epic) {
    return sessionMemory.epic;
  }

  try {
    const response = await fetch('https://epic.gsfc.nasa.gov/api/natural');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const list = await response.json();
    if (!Array.isArray(list) || list.length === 0) {
      throw new Error('Empty EPIC dataset');
    }
    const latest = list[0];
    if (!latest.image || !latest.date) {
      throw new Error('Missing EPIC image metadata');
    }
    const datePart = String(latest.date).slice(0, 10).split('-');
    const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${datePart[0]}/${datePart[1]}/${datePart[2]}/png/${latest.image}.png`;

    const result = {
      source: 'live-nasa',
      sourceLabel: 'Real NASA DSCOVR EPIC Observation',
      identifier: latest.identifier,
      date: String(latest.date).slice(0, 10),
      caption: latest.caption || 'Earth observed from the DSCOVR spacecraft.',
      coordinates: latest.centroid_coordinates || null,
      imageUrl
    };
    sessionMemory.epic = result;
    return result;
  } catch {
    const fallback = {
      source: 'simulation-fallback',
      sourceLabel: 'EPIC Service Temporarily Unavailable',
      identifier: null,
      date: null,
      caption: 'Live Earth imagery from NASA DSCOVR EPIC could not be loaded right now.',
      coordinates: null,
      imageUrl: null
    };
    sessionMemory.epic = fallback;
    return fallback;
  }
}

export async function fetchNasaMedia(queryKey, searchQuery) {
  if (sessionMemory.images[queryKey]) {
    return sessionMemory.images[queryKey];
  }

  try {
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(searchQuery)}&media_type=image&page_size=4`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const json = await response.json();
    const rawItems = json && json.collection && Array.isArray(json.collection.items)
      ? json.collection.items
      : [];

    const items = [];
    for (const entry of rawItems) {
      const data = Array.isArray(entry.data) ? entry.data[0] : null;
      const link = Array.isArray(entry.links) ? entry.links.find((l) => l.href) : null;
      if (data && link) {
        items.push({
          nasaId: data.nasa_id || 'NASA-IMG',
          title: data.title || 'NASA Mission Image',
          dateCreated: data.date_created ? String(data.date_created).slice(0, 10) : 'Date unavailable',
          center: data.center || 'NASA',
          description: data.description ? String(data.description).slice(0, 180) : '',
          imageUrl: link.href
        });
      }
      if (items.length >= 2) break;
    }

    const result = {
      source: items.length > 0 ? 'live-nasa' : 'simulation-fallback',
      sourceLabel: items.length > 0 ? 'NASA Image and Video Library' : 'No matching NASA media returned',
      items
    };
    sessionMemory.images[queryKey] = result;
    return result;
  } catch {
    const fallback = {
      source: 'simulation-fallback',
      sourceLabel: 'NASA Image Library Unavailable',
      items: []
    };
    sessionMemory.images[queryKey] = fallback;
    return fallback;
  }
}

export async function fetchMoonTrekInfo() {
  if (sessionMemory.moonTrek) {
    return sessionMemory.moonTrek;
  }

  const capUrl =
    'https://trek.nasa.gov/tiles/Moon/EQ/LRO_WAC_Mosaic_Global_303ppd_v02/1.0.0/WMTSCapabilities.xml';

  try {
    const response = await fetch(capUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const xmlText = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, 'application/xml');
    const layerId =
      doc.querySelector('Layer Identifier')?.textContent?.trim() ||
      'LRO_WAC_Mosaic_Global_303ppd_v02';
    const styleId = doc.querySelector('Style Identifier')?.textContent?.trim() || 'default';
    const matrixSet =
      doc.querySelector('TileMatrixSetLink TileMatrixSet')?.textContent?.trim() || 'default028mm';
    const resourceEl = doc.querySelector('ResourceURL');
    const template = resourceEl ? resourceEl.getAttribute('template') : null;

    if (!template) {
      throw new Error('Missing WMTS ResourceURL template');
    }

    const buildTileUrl = (z, row, col) =>
      template
        .replace('{Style}', styleId)
        .replace('{TileMatrixSet}', matrixSet)
        .replace('{TileMatrix}', String(z))
        .replace('{TileRow}', String(row))
        .replace('{TileCol}', String(col));

    const tiles = [
      buildTileUrl(1, 0, 0),
      buildTileUrl(1, 0, 1),
      buildTileUrl(1, 0, 2),
      buildTileUrl(1, 0, 3),
      buildTileUrl(1, 1, 0),
      buildTileUrl(1, 1, 1),
      buildTileUrl(1, 1, 2),
      buildTileUrl(1, 1, 3)
    ];

    const result = {
      source: 'live-nasa',
      sourceLabel: 'NASA Moon Trek WMTS (LRO WAC Mosaic)',
      layerId,
      styleId,
      matrixSet,
      tiles
    };
    sessionMemory.moonTrek = result;
    return result;
  } catch {
    const fallback = {
      source: 'simulation-fallback',
      sourceLabel: 'Moon Trek WMTS Unavailable',
      layerId: null,
      styleId: null,
      matrixSet: null,
      tiles: []
    };
    sessionMemory.moonTrek = fallback;
    return fallback;
  }
}

export async function fetchInsightMarsWeather() {
  if (sessionMemory.insight) {
    return sessionMemory.insight;
  }

  try {
    const url = 'https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0';
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const json = await response.json();
    const solKeys = Array.isArray(json.sol_keys) ? json.sol_keys : [];
    if (solKeys.length === 0) {
      throw new Error('No historical sols returned');
    }
    const latestSol = solKeys[solKeys.length - 1];
    const solData = json[latestSol] || {};

    const result = {
      source: 'historical-nasa',
      sourceLabel: 'Historical NASA InSight Mars Weather (Mission Ended)',
      sol: latestSol,
      earthDate: solData.First_UTC ? String(solData.First_UTC).slice(0, 10) : 'Date unavailable',
      airTempAvg: solData.AT && typeof solData.AT.av === 'number' ? solData.AT.av.toFixed(1) : null,
      windAvg: solData.HWS && typeof solData.HWS.av === 'number' ? solData.HWS.av.toFixed(1) : null,
      pressureAvg: solData.PRE && typeof solData.PRE.av === 'number' ? Math.round(solData.PRE.av) : null
    };
    sessionMemory.insight = result;
    return result;
  } catch {
    const fallback = {
      source: 'simulation-fallback',
      sourceLabel: 'Historical InSight API Unavailable',
      sol: null,
      earthDate: null,
      airTempAvg: null,
      windAvg: null,
      pressureAvg: null
    };
    sessionMemory.insight = fallback;
    return fallback;
  }
}
