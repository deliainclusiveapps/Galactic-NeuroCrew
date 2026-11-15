export const RESOURCE_META = [
  {
    key: 'oxygen',
    label: 'Oxygen',
    unit: '%',
    description: 'Clean air inside the habitat and spacesuits for breathing.',
    icon: 'O2'
  },
  {
    key: 'water',
    label: 'Water',
    unit: '%',
    description: 'Drinking water, hygiene, cooling loops, and greenhouse irrigation.',
    icon: 'H2O'
  },
  {
    key: 'energy',
    label: 'Energy',
    unit: '%',
    description: 'Electrical power from solar panels and outpost batteries.',
    icon: 'kWh'
  },
  {
    key: 'food',
    label: 'Food',
    unit: '%',
    description: 'Stored crew rations plus fresh crops from the lunar greenhouse.',
    icon: 'FOOD'
  },
  {
    key: 'radiationShield',
    label: 'Radiation Shield',
    unit: '%',
    description: 'Habitat shielding and shelter readiness against space particles.',
    icon: 'SHIELD'
  }
];

export function clampResource(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function getResourceStatus(value) {
  if (value >= 60) {
    return { level: 'nominal', label: 'Nominal', symbol: 'OK' };
  }
  if (value >= 30) {
    return { level: 'caution', label: 'Caution', symbol: '!' };
  }
  return { level: 'critical', label: 'Critical', symbol: '!!' };
}

export function applyResourceDeltas(currentResources, deltas) {
  const before = { ...currentResources };
  const after = { ...currentResources };
  const changes = [];

  for (const meta of RESOURCE_META) {
    const delta = Number(deltas[meta.key] || 0);
    if (delta !== 0) {
      after[meta.key] = clampResource(before[meta.key] + delta);
      const actualDelta = after[meta.key] - before[meta.key];
      changes.push({
        key: meta.key,
        label: meta.label,
        before: before[meta.key],
        after: after[meta.key],
        delta: actualDelta
      });
    }
  }

  return { before, after, changes };
}

export function evaluateMissionSafety(resources) {
  const critical = RESOURCE_META.filter((m) => resources[m.key] <= 15);
  const low = RESOURCE_META.filter((m) => resources[m.key] > 15 && resources[m.key] < 35);
  return {
    isUnsafe: critical.length > 0,
    criticalResources: critical.map((c) => c.label),
    lowResources: low.map((l) => l.label)
  };
}

export function computeLevelPerformanceScore(resources, choicesCount, hadUnsafeRetry) {
  const values = RESOURCE_META.map((m) => resources[m.key]);
  const average = values.reduce((acc, v) => acc + v, 0) / values.length;
  const minVal = Math.min(...values);
  const balanceBonus = minVal >= 45 ? 25 : minVal >= 30 ? 15 : 5;
  const safetyPenalty = hadUnsafeRetry ? 5 : 0;
  const raw = Math.round(average * 0.75 + balanceBonus + choicesCount * 2 - safetyPenalty);
  return Math.max(40, Math.min(100, raw));
}
