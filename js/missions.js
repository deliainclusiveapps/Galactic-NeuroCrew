export const MISSIONS = [
  {
    id: 1,
    title: 'LUNAR ARRIVAL',
    subtitle: 'First Day on the Moon',
    description: 'Set up oxygen, water, and life support after landing on the Moon.',
    badgeId: 'lunar-arrival',
    badgeName: 'LUNAR ARRIVAL',
    baseResources: {
      oxygen: 80,
      water: 78,
      energy: 75,
      food: 80,
      radiationShield: 75
    },
    challengeIds: ['1.1', '1.2', '1.3']
  },
  {
    id: 2,
    title: 'POWER CONTROL',
    subtitle: 'Energy Is Everything',
    description: 'Generate solar power, charge batteries, and choose how to share electricity.',
    badgeId: 'energy-commander',
    badgeName: 'ENERGY COMMANDER',
    baseResources: {
      oxygen: 76,
      water: 74,
      energy: 68,
      food: 76,
      radiationShield: 72
    },
    challengeIds: ['2.1', '2.2', '2.3']
  },
  {
    id: 3,
    title: 'RADIATION ALERT',
    subtitle: 'Protect the Crew',
    description: 'Read real NASA space-weather data and protect astronauts in the shelter.',
    badgeId: 'radiation-guardian',
    badgeName: 'RADIATION GUARDIAN',
    baseResources: {
      oxygen: 75,
      water: 75,
      energy: 72,
      food: 74,
      radiationShield: 62
    },
    challengeIds: ['3.1', '3.2', '3.3']
  },
  {
    id: 4,
    title: 'FOOD AND COMMUNICATION',
    subtitle: 'Life Far from Earth',
    description: 'Grow plants in the lunar greenhouse and handle Earth communication delays.',
    badgeId: 'sustainable-explorer',
    badgeName: 'SUSTAINABLE EXPLORER',
    baseResources: {
      oxygen: 76,
      water: 68,
      energy: 70,
      food: 60,
      radiationShield: 74
    },
    challengeIds: ['4.1', '4.2', '4.3']
  },
  {
    id: 5,
    title: 'ULTIMATE MISSION',
    subtitle: 'Lunar Outpost Commander',
    description: 'Lead the full lunar base, adapt to surprises, and balance every system.',
    badgeId: 'mission-commander',
    badgeName: 'MISSION COMMANDER',
    baseResources: {
      oxygen: 70,
      water: 68,
      energy: 66,
      food: 66,
      radiationShield: 68
    },
    challengeIds: ['5.1', '5.2', '5.3']
  }
];

const REPLAY_VARIANTS = {
  1: [
    { label: 'Standard Landing Day (Simulation Parameter)', deltas: {} },
    { label: 'Dusty Landing Pad: Airlock cycle used extra oxygen', deltas: { oxygen: -8, energy: -4 } },
    { label: 'Cool Lunar Morning: Water tanks chilled cleanly', deltas: { water: 6, energy: -6 } }
  ],
  2: [
    { label: 'Bright Lunar Noon (Simulation Parameter)', deltas: {} },
    { label: 'Low Sun Angle: Solar panels start with lower charge', deltas: { energy: -10 } },
    { label: 'Extra Science Load: Instruments drew battery overnight', deltas: { energy: -6, oxygen: -4 } }
  ],
  3: [
    { label: 'Normal Shielding Watch (Simulation Parameter)', deltas: {} },
    { label: 'High Solar Particle Watch: Shelter needs extra power', deltas: { radiationShield: -8, energy: -5 } },
    { label: 'Pre-charged Batteries: Ready for shelter boost', deltas: { energy: 8, radiationShield: -5 } }
  ],
  4: [
    { label: 'Steady Greenhouse Cycle (Simulation Parameter)', deltas: {} },
    { label: 'Dry Soil Batch: Plants start thirstier than usual', deltas: { water: -8, food: -5 } },
    { label: 'Early Harvest Bonus: Fresh sprouts ready', deltas: { food: 6, energy: -5 } }
  ],
  5: [
    { label: 'Full Outpost Shift A (Simulation Parameter)', deltas: {} },
    { label: 'Heavy Operations Shift B: Lower starting water and shield', deltas: { water: -6, radiationShield: -6 } },
    { label: 'Rover Survey Shift C: Lower starting energy and oxygen', deltas: { energy: -8, oxygen: -5 } }
  ]
};

export function getLevelConditionVariant(levelId, attemptNumber) {
  const variants = REPLAY_VARIANTS[levelId] || REPLAY_VARIANTS[1];
  const index = Math.abs(Number(attemptNumber || 0)) % variants.length;
  return variants[index];
}

export function getStartingResources(levelId, attemptNumber) {
  const mission = MISSIONS.find((m) => m.id === levelId) || MISSIONS[0];
  const variant = getLevelConditionVariant(levelId, attemptNumber);
  const start = { ...mission.baseResources };
  for (const [key, value] of Object.entries(variant.deltas)) {
    start[key] = Math.max(25, Math.min(95, (start[key] || 70) + value));
  }
  return { resources: start, variantLabel: variant.label };
}

export const SCENE_INSPECTIONS = {
  earth: 'Earth is 384,400 km away. Radio signals take ~2.6 seconds for a round trip.',
  lander: 'The Lunar Lander carried your crew safely to the Moon’s surface.',
  habitat: 'The Lunar Habitat keeps air pressure, temperature, and oxygen safe inside.',
  'oxygen-tank': 'Oxygen tanks supply breathable air for the habitat and EVA suits.',
  'water-tank': 'Water tanks store clean water for drinking, cooling, and plants.',
  'solar-array': 'Solar panels turn sunlight into electricity when the Sun shines on the Moon.',
  'battery-bank': 'Batteries store solar energy for times when shadows or high demand occur.',
  'solar-monitor': 'NASA DONKI tracks solar flares, CMEs, and particle events from the Sun.',
  'radiation-shelter': 'Thick regolith and water walls inside the shelter block space radiation.',
  'weather-radar': 'Space-weather sensors help Mission Control warn astronauts early.',
  greenhouse: 'The Lunar Greenhouse tests growing fresh crops using water, light, and nutrients.',
  antenna: 'The dish antenna sends messages to Earth with a real light-speed delay.',
  rover: 'The Lunar Rover carries astronauts and science tools across Moon craters.'
};
