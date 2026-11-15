const STORAGE_KEY = 'galactic_neurocrew_state_v1';

export const DEFAULT_PREFERENCES = {
  textSize: 'normal',
  highContrast: false,
  reducedMotion: false,
  ttsEnabled: false,
  sfxEnabled: true,
  musicEnabled: false
};

export function createInitialProgress() {
  return {
    selectedCharacter: null,
    nickname: '',
    preferences: { ...DEFAULT_PREFERENCES },
    unlockedLevel: 1,
    completedLevels: [],
    earnedBadges: [],
    levelBestScores: {},
    levelAttempts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    decisionHistory: [],
    lastResources: null
  };
}

export function loadProgress() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createInitialProgress();
    }
    const parsed = JSON.parse(raw);
    const base = createInitialProgress();
    return {
      ...base,
      ...parsed,
      preferences: {
        ...DEFAULT_PREFERENCES,
        ...(parsed.preferences || {})
      },
      levelAttempts: {
        ...base.levelAttempts,
        ...(parsed.levelAttempts || {})
      },
      completedLevels: Array.isArray(parsed.completedLevels) ? parsed.completedLevels : [],
      earnedBadges: Array.isArray(parsed.earnedBadges) ? parsed.earnedBadges : [],
      decisionHistory: Array.isArray(parsed.decisionHistory) ? parsed.decisionHistory : [],
      levelBestScores: parsed.levelBestScores && typeof parsed.levelBestScores === 'object' ? parsed.levelBestScores : {}
    };
  } catch {
    return createInitialProgress();
  }
}

export function saveProgress(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    return false;
  }
  return true;
}

export function resetProgressOnly(currentPreferences) {
  const fresh = createInitialProgress();
  fresh.preferences = { ...DEFAULT_PREFERENCES, ...(currentPreferences || {}) };
  saveProgress(fresh);
  return fresh;
}

export function getDisplayNickname(nickname) {
  const cleaned = typeof nickname === 'string' ? nickname.trim().slice(0, 10) : '';
  return cleaned.length > 0 ? cleaned : 'Junior Astronaut';
}
