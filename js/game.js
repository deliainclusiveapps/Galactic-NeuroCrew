import { getChallengeById } from './challenges.js';
import { resolvePlayerDecision } from './decisions.js';
import { MISSIONS, getStartingResources } from './missions.js';
import { computeLevelPerformanceScore } from './resources.js';
import { saveProgress } from './storage.js';

export function startMissionLevel(appState, levelId, isReplay = false) {
  const mission = MISSIONS.find((m) => m.id === levelId);
  if (!mission) return;

  const currentAttempts = Number(appState.progress.levelAttempts[levelId] || 0);
  const nextAttempt = isReplay ? currentAttempts + 1 : currentAttempts;
  appState.progress.levelAttempts[levelId] = nextAttempt;
  saveProgress(appState.progress);

  const { resources, variantLabel } = getStartingResources(levelId, nextAttempt);

  appState.currentLevelId = levelId;
  appState.currentChallengeIndex = 0;
  appState.resources = resources;
  appState.variantLabel = variantLabel;
  appState.levelOutcomes = [];
  appState.currentOutcome = null;
  appState.selectedOptionId = null;
  appState.appliedEffect = null;
  appState.hadUnsafeRetry = false;
  appState.activeHotspotText = '';
  appState.astronautExpression = 'happy';
  appState.screen = 'challenge';
}

export function getActiveChallenge(appState) {
  const mission = MISSIONS.find((m) => m.id === appState.currentLevelId) || MISSIONS[0];
  const challengeId = mission.challengeIds[appState.currentChallengeIndex] || mission.challengeIds[0];
  const attemptNumber = appState.progress.levelAttempts[mission.id] || 0;
  return getChallengeById(challengeId, {
    resources: appState.resources,
    donkiInfo: appState.nasaData.donki,
    attemptNumber
  });
}

export function selectPictogramOption(appState, optionId) {
  appState.selectedOptionId = optionId;
  appState.astronautExpression = 'curious';
}

export function confirmSelectedOption(appState) {
  if (!appState.selectedOptionId) return null;
  const challenge = getActiveChallenge(appState);
  if (!challenge) return null;

  const outcome = resolvePlayerDecision(appState.resources, challenge, appState.selectedOptionId);
  if (!outcome) return null;

  appState.resources = outcome.afterResources;
  appState.currentOutcome = outcome;
  appState.appliedEffect = outcome.sceneEffect;
  appState.astronautExpression = outcome.astronautExpression;

  if (outcome.safety.isUnsafe) {
    appState.hadUnsafeRetry = true;
  }

  return outcome;
}

export function retryCurrentChallenge(appState) {
  if (!appState.currentOutcome) return;
  appState.resources = { ...appState.currentOutcome.beforeResources };
  appState.currentOutcome = null;
  appState.selectedOptionId = null;
  appState.appliedEffect = null;
  appState.astronautExpression = 'focused';
}

export function advanceAfterOutcome(appState) {
  if (!appState.currentOutcome) return;

  appState.levelOutcomes.push(appState.currentOutcome);
  appState.progress.decisionHistory.push(appState.currentOutcome);
  appState.progress.lastResources = { ...appState.resources };
  appState.currentOutcome = null;
  appState.selectedOptionId = null;
  appState.appliedEffect = null;
  appState.activeHotspotText = '';

  const mission = MISSIONS.find((m) => m.id === appState.currentLevelId);
  if (appState.currentChallengeIndex + 1 < mission.challengeIds.length) {
    appState.currentChallengeIndex += 1;
    appState.astronautExpression = 'curious';
    saveProgress(appState.progress);
    return 'next-challenge';
  }

  const levelScore = computeLevelPerformanceScore(
    appState.resources,
    appState.levelOutcomes.length,
    appState.hadUnsafeRetry
  );
  appState.lastLevelScore = levelScore;

  if (!appState.progress.completedLevels.includes(mission.id)) {
    appState.progress.completedLevels.push(mission.id);
  }
  if (!appState.progress.earnedBadges.includes(mission.badgeId)) {
    appState.progress.earnedBadges.push(mission.badgeId);
  }
  const prevBest = appState.progress.levelBestScores[mission.id] || 0;
  appState.progress.levelBestScores[mission.id] = Math.max(prevBest, levelScore);

  if (mission.id >= appState.progress.unlockedLevel && mission.id < 5) {
    appState.progress.unlockedLevel = mission.id + 1;
  }

  saveProgress(appState.progress);
  appState.screen = 'results';
  appState.astronautExpression = 'celebrating';
  return 'level-complete';
}
