import { applyResourceDeltas, evaluateMissionSafety } from './resources.js';

export function resolvePlayerDecision(currentResources, challenge, optionId) {
  const option = challenge.options.find((opt) => opt.id === optionId);
  if (!option) return null;

  const { before, after, changes } = applyResourceDeltas(currentResources, option.deltas);
  const safety = evaluateMissionSafety(after);

  let astronautExpression = 'happy';
  if (safety.isUnsafe) {
    astronautExpression = 'alert';
  } else if (changes.some((c) => c.delta < -10)) {
    astronautExpression = 'focused';
  } else if (changes.every((c) => c.delta >= -6)) {
    astronautExpression = 'celebrating';
  }

  return {
    challengeId: challenge.id,
    challengeTitle: challenge.title,
    levelId: challenge.levelId,
    optionId: option.id,
    optionLabel: option.label,
    pictogram: option.pictogram,
    sceneEffect: option.sceneEffect,
    beforeResources: before,
    afterResources: after,
    changes,
    safety,
    astronautExpression,
    whatHappened: option.whatHappened,
    whyItMatters: option.whyItMatters,
    lesson: option.lesson,
    vocab: challenge.vocab,
    timestamp: new Date().toISOString()
  };
}
