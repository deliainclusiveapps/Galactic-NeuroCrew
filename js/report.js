import { renderAstronautSVG, ASTRONAUT_PROFILES } from './characters.js';
import { renderBadgeSVG } from './environments.js';
import { MISSIONS } from './missions.js';
import { RESOURCE_META } from './resources.js';
import { getDisplayNickname } from './storage.js';

export function renderLevelResultsView(state) {
  const mission = MISSIONS.find((m) => m.id === state.currentLevelId) || MISSIONS[0];
  const score = state.lastLevelScore || 80;
  const nextLevel = mission.id < 5 ? mission.id + 1 : null;
  const displayName = getDisplayNickname(state.progress.nickname);

  const resourceCards = RESOURCE_META.map((meta) => {
    const val = state.resources[meta.key];
    return `
      <div class="result-resource-item">
        <span class="result-resource-label">${meta.label}</span>
        <strong class="tabular-nums">${val}%</strong>
      </div>
    `;
  }).join('');

  const decisionsHtml = state.levelOutcomes
    .map(
      (o) => `
      <li class="summary-decision-row">
        <div>
          <strong>${o.challengeTitle}</strong>
          <p class="muted-text">Choice: ${o.optionLabel}</p>
        </div>
        <p class="lesson-snippet">${o.lesson}</p>
      </li>
    `
    )
    .join('');

  return `
    <section class="panel-card results-panel" aria-labelledby="results-heading">
      <div class="results-hero">
        <div class="results-astronaut-wrap">
          ${renderAstronautSVG(state.progress.selectedCharacter || 'boy', {
            expression: 'celebrating',
            className: 'results-astronaut-svg',
            ariaLabel: `${displayName} celebrating mission completion`
          })}
        </div>
        <div class="results-header-copy">
          <p class="kicker-text">Mission ${mission.id} Complete · ${displayName}</p>
          <h1 id="results-heading">${mission.title}: ${mission.subtitle}</h1>
          <p class="lead-text">All 3 challenges completed! Mission Performance Rating: <strong class="tabular-nums">${score}/100</strong></p>
        </div>
        <div class="results-badge-wrap">
          ${renderBadgeSVG(mission.badgeId, true)}
          <span class="badge-caption">Badge Earned: ${mission.badgeName}</span>
        </div>
      </div>

      <div class="results-section">
        <h2>Remaining Outpost Resources</h2>
        <p class="muted-text">Values below are educational simulation parameters from this mission attempt.</p>
        <div class="result-resources-grid">${resourceCards}</div>
      </div>

      <div class="results-section">
        <h2>Your Decisions &amp; Lessons Learned</h2>
        <ul class="summary-decisions-list">${decisionsHtml}</ul>
      </div>

      <div class="results-actions">
        ${
          nextLevel
            ? `<button type="button" class="btn-primary" data-action="start-level" data-level="${nextLevel}">Continue to Level ${nextLevel}</button>`
            : `<button type="button" class="btn-primary" data-action="navigate" data-screen="report">View Final Mission Report</button>`
        }
        <button type="button" class="btn-secondary" data-action="replay-level" data-level="${mission.id}">Replay Level (New Conditions)</button>
        <button type="button" class="btn-ghost" data-action="navigate" data-screen="missions">Back to Mission Select</button>
      </div>
    </section>
  `;
}

export function renderArchiveAndReportView(state) {
  const progress = state.progress;
  const charId = progress.selectedCharacter || 'boy';
  const charInfo = ASTRONAUT_PROFILES[charId];
  const displayName = getDisplayNickname(progress.nickname);
  const completedCount = progress.completedLevels.length;
  const allComplete = completedCount === 5;

  const badgesHtml = MISSIONS.map((m) => {
    const unlocked = progress.earnedBadges.includes(m.badgeId);
    const best = progress.levelBestScores[m.id];
    return `
      <div class="archive-badge-card ${unlocked ? 'unlocked' : 'locked'}">
        ${renderBadgeSVG(m.badgeId, unlocked)}
        <h3>${m.badgeName}</h3>
        <p class="muted-text">Level ${m.id}: ${m.title}</p>
        <p class="status-line">${unlocked ? `Earned · Best ${best || 80}/100` : 'Locked'}</p>
      </div>
    `;
  }).join('');

  const finalResources = progress.lastResources || state.resources;
  const resourcesSummary = RESOURCE_META.map(
    (m) => `
      <div class="result-resource-item">
        <span class="result-resource-label">${m.label}</span>
        <strong class="tabular-nums">${finalResources ? finalResources[m.key] : 75}%</strong>
      </div>
    `
  ).join('');

  const historyItems =
    progress.decisionHistory.length > 0
      ? progress.decisionHistory
          .slice()
          .reverse()
          .slice(0, 20)
          .map(
            (item) => `
            <li class="archive-history-row">
              <div>
                <strong>${item.challengeTitle}</strong>
                <p class="muted-text">Selected: ${item.optionLabel}</p>
              </div>
              <p class="lesson-snippet">${item.lesson}</p>
            </li>
          `
          )
          .join('')
      : '<li class="muted-text">No mission decisions recorded yet. Start Level 1 to begin your log!</li>';

  return `
    <section class="panel-card report-panel" aria-labelledby="archive-heading">
      <div class="report-header">
        <div class="report-pilot-block">
          ${renderAstronautSVG(charId, {
            expression: allComplete ? 'celebrating' : 'happy',
            className: 'report-astronaut-svg',
            ariaLabel: `${displayName} astronaut profile`
          })}
          <div>
            <p class="kicker-text">${allComplete ? 'FINAL MISSION REPORT UNLOCKED' : 'MISSION ARCHIVE & PROGRESS REPORT'}</p>
            <h1 id="archive-heading">${displayName} — ${charInfo.name} (${charInfo.role})</h1>
            <p class="lead-text">
              Completed Missions: <strong class="tabular-nums">${completedCount}/5</strong> ·
              Earned Badges: <strong class="tabular-nums">${progress.earnedBadges.length}/5</strong> ·
              Total Decisions Logged: <strong class="tabular-nums">${progress.decisionHistory.length}</strong>
            </p>
          </div>
        </div>
        <div class="report-header-actions no-print">
          <button type="button" class="btn-primary" data-action="print-report">Print / Save Report</button>
          <button type="button" class="btn-secondary" data-action="navigate" data-screen="missions">Mission Selection</button>
        </div>
      </div>

      ${
        allComplete
          ? `<div class="completion-banner">
              <h2>Congratulations, Commander ${displayName}!</h2>
              <p>You completed all 5 lunar outpost missions, balanced life support, solar power, radiation protection, greenhouse crops, and Earth communication delays.</p>
            </div>`
          : `<div class="progress-note-box">
              <p>Complete all 5 levels to unlock your full Lunar Outpost Commander certification! Your current progress and earned badges are saved safely in this browser.</p>
            </div>`
      }

      <div class="results-section">
        <h2>Earned Mission Badges</h2>
        <div class="archive-badges-grid">${badgesHtml}</div>
      </div>

      <div class="results-section">
        <h2>Latest Outpost Resource Status (Simulation Parameters)</h2>
        <div class="result-resources-grid">${resourcesSummary}</div>
      </div>

      <div class="results-section">
        <h2>Decision Log &amp; Scientific Concepts Mastered</h2>
        <ul class="archive-history-list">${historyItems}</ul>
      </div>

      <footer class="report-attribution">
        <p>GALACTIC NEUROCREW</p>
        <p>Desarrollado por: Delia Gaibor Sanchez</p>
      </footer>
    </section>
  `;
}
