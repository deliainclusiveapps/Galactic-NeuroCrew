import {
  applyAccessibilityPreferences,
  isSpeechSupported,
  repeatLastInstruction,
  setLastInstruction,
  speakText,
  stopSpeaking
} from './accessibility.js';
import { spaceAudio } from './audio.js';
import { ASTRONAUT_PROFILES, renderAstronautSVG } from './characters.js';
import {
  renderBadgeSVG,
  renderLevelCardThumbnail,
  renderMissionSceneSVG,
  renderPictogramSVG
} from './environments.js';
import {
  advanceAfterOutcome,
  confirmSelectedOption,
  getActiveChallenge,
  retryCurrentChallenge,
  selectPictogramOption,
  startMissionLevel
} from './game.js';
import { MISSIONS, SCENE_INSPECTIONS } from './missions.js';
import {
  NASA_DATASET_CATALOG,
  SPACE_WEATHER_GLOSSARY,
  fetchDonkiSpaceWeather,
  fetchEpicEarthImage,
  fetchInsightMarsWeather,
  fetchMoonTrekInfo,
  fetchNasaMedia
} from './nasa-data.js';
import { renderArchiveAndReportView, renderLevelResultsView } from './report.js';
import { RESOURCE_META, getResourceStatus } from './resources.js';
import { getDisplayNickname, loadProgress, resetProgressOnly, saveProgress } from './storage.js';

const appState = {
  screen: 'welcome',
  progress: loadProgress(),
  currentLevelId: 1,
  currentChallengeIndex: 0,
  resources: { ...MISSIONS[0].baseResources },
  variantLabel: '',
  levelOutcomes: [],
  currentOutcome: null,
  selectedOptionId: null,
  appliedEffect: null,
  hadUnsafeRetry: false,
  lastLevelScore: 0,
  activeHotspotText: '',
  astronautExpression: 'happy',
  showAccessibilityModal: false,
  showIOSInstallModal: false,
  deferredInstallPrompt: null,
  isInstalledPWA: false,
  isIOS: false,
  nasaData: {
    loading: false,
    donki: null,
    epic: null,
    moonTrek: null,
    insight: null,
    mediaMoon: null,
    mediaPlants: null,
    mediaSolar: null
  }
};

function setupPWAInstallListeners() {
  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;
  appState.isInstalledPWA = isStandalone;
  appState.isIOS = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    appState.deferredInstallPrompt = event;
    renderApp(false);
  });

  window.addEventListener('appinstalled', () => {
    appState.isInstalledPWA = true;
    appState.deferredInstallPrompt = null;
    renderApp(false);
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
}

async function ensureNasaDataForScreen(screen, levelId) {
  const tasks = [];
  if ((screen === 'challenge' && (levelId === 3 || levelId === 5)) || screen === 'nasa') {
    if (!appState.nasaData.donki) {
      tasks.push(
        fetchDonkiSpaceWeather().then((data) => {
          appState.nasaData.donki = data;
        })
      );
    }
  }
  if ((screen === 'challenge' && (levelId === 1 || levelId === 4)) || screen === 'nasa') {
    if (!appState.nasaData.epic) {
      tasks.push(
        fetchEpicEarthImage().then((data) => {
          appState.nasaData.epic = data;
        })
      );
    }
  }
  if ((screen === 'challenge' && levelId === 1) || screen === 'nasa') {
    if (!appState.nasaData.mediaMoon) {
      tasks.push(
        fetchNasaMedia('moon', 'apollo lunar surface astronaut').then((data) => {
          appState.nasaData.mediaMoon = data;
        })
      );
    }
  }
  if ((screen === 'challenge' && levelId === 4) || screen === 'nasa') {
    if (!appState.nasaData.mediaPlants) {
      tasks.push(
        fetchNasaMedia('plants', 'veggie plant growth space station').then((data) => {
          appState.nasaData.mediaPlants = data;
        })
      );
    }
  }
  if ((screen === 'challenge' && levelId === 3) || screen === 'nasa') {
    if (!appState.nasaData.mediaSolar) {
      tasks.push(
        fetchNasaMedia('solar', 'solar dynamics observatory flare').then((data) => {
          appState.nasaData.mediaSolar = data;
        })
      );
    }
  }
  if (screen === 'nasa' || (screen === 'challenge' && levelId === 5)) {
    if (!appState.nasaData.moonTrek) {
      tasks.push(
        fetchMoonTrekInfo().then((data) => {
          appState.nasaData.moonTrek = data;
        })
      );
    }
  }
  if (screen === 'nasa') {
    if (!appState.nasaData.insight) {
      tasks.push(
        fetchInsightMarsWeather().then((data) => {
          appState.nasaData.insight = data;
        })
      );
    }
  }

  if (tasks.length === 0) return;
  appState.nasaData.loading = true;
  renderApp(false);
  await Promise.allSettled(tasks);
  appState.nasaData.loading = false;
  renderApp(false);
}

function renderTopBar() {
  const charId = appState.progress.selectedCharacter;
  const displayName = getDisplayNickname(appState.progress.nickname);
  const completedCount = appState.progress.completedLevels.length;

  let installButton = '';
  if (!appState.isInstalledPWA) {
    if (appState.deferredInstallPrompt) {
      installButton =
        '<button type="button" class="nav-btn nav-install" data-action="install-pwa">Install App</button>';
    } else if (appState.isIOS) {
      installButton =
        '<button type="button" class="nav-btn nav-install" data-action="open-ios-install">Install iOS</button>';
    }
  }

  return `
    <header class="top-bar no-print" role="banner">
      <div class="brand-zone">
        <button type="button" class="brand-link" data-action="navigate" data-screen="welcome" aria-label="Galactic NeuroCrew Home">
          <span class="brand-mark" aria-hidden="true">GN</span>
          <span class="brand-title">GALACTIC NEUROCREW</span>
        </button>
      </div>

      <nav class="nav-zone" aria-label="Main navigation">
        <button type="button" class="nav-link ${appState.screen === 'missions' ? 'active' : ''}" data-action="navigate" data-screen="missions">Missions</button>
        <button type="button" class="nav-link ${appState.screen === 'report' ? 'active' : ''}" data-action="navigate" data-screen="report">Archive &amp; Report</button>
        <button type="button" class="nav-link ${appState.screen === 'nasa' ? 'active' : ''}" data-action="navigate" data-screen="nasa">NASA Data</button>
        <button type="button" class="nav-link" data-action="open-accessibility">Accessibility</button>
      </nav>

      <div class="action-zone">
        ${installButton}
        ${
          charId
            ? `<div class="pilot-pill" aria-label="Active astronaut ${displayName}">
                <span class="pilot-mini-wrap">${renderAstronautSVG(charId, {
                  expression: 'happy',
                  className: 'pilot-mini-svg',
                  ariaLabel: displayName
                })}</span>
                <span class="pilot-meta">
                  <strong>${displayName}</strong>
                  <span class="tabular-nums">${completedCount}/5</span>
                </span>
              </div>`
            : `<button type="button" class="btn-primary btn-compact" data-action="open-accessibility">Settings</button>`
        }
      </div>
    </header>
  `;
}

function renderSubtitleBar() {
  const ttsSupported = isSpeechSupported();
  const ttsOn = appState.progress.preferences.ttsEnabled;
  return `
    <div class="subtitle-bar no-print" role="region" aria-label="Subtitles and narration controls">
      <div class="subtitle-content">
        <span class="subtitle-label">Subtitles</span>
        <p id="subtitle-text" class="subtitle-text" aria-live="polite">Welcome to Galactic NeuroCrew. Choose your astronaut to begin.</p>
      </div>
      <div class="subtitle-actions">
        ${
          ttsSupported
            ? `<button type="button" class="btn-ghost btn-compact" data-action="repeat-speech">Repeat Audio</button>
               <button type="button" class="btn-ghost btn-compact" data-action="toggle-tts">${ttsOn ? 'Voice: On' : 'Voice: Off'}</button>`
            : `<span class="muted-text">Text Subtitles Active</span>`
        }
      </div>
    </div>
  `;
}

function renderWelcomeScreen() {
  const selected = appState.progress.selectedCharacter;
  const nickname = appState.progress.nickname || '';
  const hasProgress = appState.progress.completedLevels.length > 0;

  return `
    <section class="panel-card welcome-panel" aria-labelledby="welcome-title">
      <div class="welcome-hero">
        <div class="welcome-copy">
          <p class="kicker-text">Lunar Outpost Educational Mission · Ages 7–12</p>
          <h1 id="welcome-title">GALACTIC NEUROCREW</h1>
          <p class="lead-text">
            Manage a lunar outpost for ages 7–12! Explore 2D lunar habitats, inspect live space equipment,
            and make pictogram-based engineering choices across five missions.
          </p>
          <p class="credit-line">
            <strong>Desarrollado por: Delia Gaibor Sanchez</strong>
          </p>
        </div>
        <div class="welcome-side-actions">
          <button type="button" class="btn-secondary" data-action="open-accessibility">
            Accessibility &amp; Sound Settings
          </button>
          <button type="button" class="btn-ghost" data-action="navigate" data-screen="nasa">
            NASA Data Sources &amp; Scientific Context
          </button>
        </div>
      </div>

      <div class="character-select-section">
        <h2>Step 1: Choose Your Child Astronaut</h2>
        <div class="character-grid" role="radiogroup" aria-label="Choose your astronaut">
          ${['boy', 'girl']
            .map((id) => {
              const profile = ASTRONAUT_PROFILES[id];
              const isSelected = selected === id;
              return `
                <button
                  type="button"
                  role="radio"
                  aria-checked="${isSelected ? 'true' : 'false'}"
                  class="character-card ${isSelected ? 'selected' : ''}"
                  data-action="select-character"
                  data-character="${id}"
                >
                  <div class="character-art-wrap">
                    ${renderAstronautSVG(id, {
                      expression: isSelected ? 'celebrating' : 'happy',
                      pose: isSelected ? 'celebrating' : 'idle',
                      className: 'welcome-astronaut-svg',
                      ariaLabel: `${profile.name} - ${profile.role}`
                    })}
                  </div>
                  <div class="character-card-info">
                    <h3>${profile.name}</h3>
                    <p class="character-role">${profile.role}</p>
                    <p class="muted-text">${profile.summary}</p>
                    <span class="select-state-label">${isSelected ? 'Selected Pilot' : 'Select Astronaut'}</span>
                  </div>
                </button>
              `;
            })
            .join('')}
        </div>
      </div>

      <div class="welcome-form-row">
        <div class="nickname-group">
          <label for="nickname-input">Step 2: Astronaut Nickname (optional, max 10 characters)</label>
          <input
            id="nickname-input"
            type="text"
            maxlength="10"
            value="${nickname.replace(/"/g, '&quot;')}"
            placeholder="Junior Astronaut"
            autocomplete="off"
          />
          <p class="muted-text">Saved only on this device. No email, password, or account needed.</p>
        </div>

        <div class="start-action-group">
          <button type="button" class="btn-primary btn-large" data-action="start-game" ${selected ? '' : 'aria-describedby="char-hint"'}>
            ${hasProgress ? 'CONTINUE TO MISSIONS' : 'START MISSION'}
          </button>
          <p id="char-hint" class="muted-text">
            ${selected ? `Ready to launch as ${getDisplayNickname(nickname)}!` : 'Please choose Leo or Maya above before starting.'}
          </p>
        </div>
      </div>
    </section>
  `;
}

function renderMissionSelectScreen() {
  const progress = appState.progress;
  const completedCount = progress.completedLevels.length;
  const displayName = getDisplayNickname(progress.nickname);

  const cardsHtml = MISSIONS.map((mission) => {
    const isCompleted = progress.completedLevels.includes(mission.id);
    const isUnlocked = mission.id <= progress.unlockedLevel || isCompleted;
    const statusText = isCompleted ? 'Completed' : isUnlocked ? 'Available' : 'Locked';
    const bestScore = progress.levelBestScores[mission.id];

    return `
      <article class="mission-card ${isCompleted ? 'completed' : isUnlocked ? 'available' : 'locked'}">
        <div class="mission-thumb-wrap">
          ${renderLevelCardThumbnail(mission.id)}
        </div>
        <div class="mission-card-body">
          <p class="mission-kicker">Level ${mission.id} · ${statusText}</p>
          <h3>${mission.title}: ${mission.subtitle}</h3>
          <p class="muted-text">${mission.description}</p>
          <div class="mission-card-footer">
            <div class="mission-badge-mini">
              ${renderBadgeSVG(mission.badgeId, isCompleted)}
              <span>${mission.badgeName}${bestScore ? ` · Best ${bestScore}/100` : ''}</span>
            </div>
            ${
              isUnlocked
                ? `<button type="button" class="btn-primary btn-compact" data-action="${isCompleted ? 'replay-level' : 'start-level'}" data-level="${mission.id}">
                    ${isCompleted ? 'Replay Level' : 'Launch Level'}
                  </button>`
                : `<button type="button" class="btn-disabled btn-compact" disabled aria-disabled="true">Complete Level ${mission.id - 1}</button>`
            }
          </div>
        </div>
      </article>
    `;
  }).join('');

  return `
    <section class="panel-card missions-panel" aria-labelledby="missions-heading">
      <div class="missions-top-row">
        <div>
          <p class="kicker-text">Outpost Command · Pilot: ${displayName}</p>
          <h1 id="missions-heading">Mission Selection</h1>
          <p class="lead-text">Complete each mission in order to earn all 5 badges. You can replay finished levels anytime without losing badges.</p>
        </div>
        <div class="progress-summary-box">
          <p class="tabular-nums"><strong>${completedCount}/5</strong> Missions Completed</p>
          <div class="progress-track" role="progressbar" aria-valuenow="${completedCount}" aria-valuemin="0" aria-valuemax="5" aria-label="Mission progression">
            <div class="progress-fill" style="width: ${(completedCount / 5) * 100}%"></div>
          </div>
          <div class="missions-sub-actions">
            <button type="button" class="btn-secondary btn-compact" data-action="navigate" data-screen="report">Badges &amp; Report</button>
            <button type="button" class="btn-ghost btn-compact" data-action="navigate" data-screen="nasa">NASA Data</button>
          </div>
        </div>
      </div>

      <div class="missions-grid">${cardsHtml}</div>
    </section>
  `;
}

function renderResourceHUD() {
  const items = RESOURCE_META.map((meta) => {
    const val = appState.resources[meta.key];
    const status = getResourceStatus(val);
    return `
      <div class="hud-resource status-${status.level}" title="${meta.description}">
        <div class="hud-resource-head">
          <span class="hud-icon-code">${meta.icon}</span>
          <span class="hud-label">${meta.label}</span>
          <span class="hud-value tabular-nums">${val}%</span>
        </div>
        <div class="hud-bar-track" role="progressbar" aria-valuenow="${val}" aria-valuemin="0" aria-valuemax="100" aria-label="${meta.label} ${val} percent (${status.label})">
          <div class="hud-bar-fill" style="width: ${val}%"></div>
        </div>
        <span class="hud-status-text">${status.symbol} ${status.label}</span>
      </div>
    `;
  }).join('');

  return `
    <section class="resource-hud" aria-label="Outpost resources and mission status">
      <div class="hud-grid">${items}</div>
      <div class="hud-constraint-strip">
        <span>Mission Constraint: Earth–Moon Signal Delay ~2.6s (not a consumable resource)</span>
        <span>·</span>
        <span>Values shown are educational simulation parameters</span>
      </div>
    </section>
  `;
}

function renderNasaContextCardForLevel(levelId) {
  if (levelId === 1 && appState.nasaData.mediaMoon && appState.nasaData.mediaMoon.items.length > 0) {
    const img = appState.nasaData.mediaMoon.items[0];
    return `
      <aside class="nasa-context-box" aria-label="Real NASA lunar context">
        <img src="${img.imageUrl}" alt="${img.title}" class="nasa-thumb-img" referrerpolicy="no-referrer" />
        <div>
          <p class="kicker-text">Real NASA Archive Photo · ID: ${img.nasaId}</p>
          <h4>${img.title}</h4>
          <p class="muted-text">${img.center} (${img.dateCreated}). Real Moon missions inspire our 2D outpost!</p>
        </div>
      </aside>
    `;
  }

  if (levelId === 3) {
    const donki = appState.nasaData.donki;
    if (!donki) {
      return `
        <aside class="nasa-context-box" aria-label="NASA space weather status">
          <p class="kicker-text">Loading real NASA DONKI space-weather observations...</p>
        </aside>
      `;
    }
    const first = donki.events[0];
    return `
      <aside class="nasa-context-box" aria-label="NASA DONKI space weather report">
        <div>
          <p class="kicker-text">${donki.sourceLabel} · Window ${donki.window}</p>
          <h4>${first ? `${first.typeName} (${first.date})` : 'No Major Recent CME/SEP/GST Events Listed'}</h4>
          <p class="muted-text">${first ? first.detail : 'Quiet solar window observed in NASA DONKI.'} ${donki.scientificNote}</p>
        </div>
      </aside>
    `;
  }

  if (levelId === 4) {
    const media = appState.nasaData.mediaPlants;
    const epic = appState.nasaData.epic;
    const photo = media && media.items[0];
    return `
      <aside class="nasa-context-box" aria-label="Real NASA space biology and Earth observation">
        ${
          photo
            ? `<img src="${photo.imageUrl}" alt="${photo.title}" class="nasa-thumb-img" referrerpolicy="no-referrer" />`
            : epic && epic.imageUrl
              ? `<img src="${epic.imageUrl}" alt="Earth photographed by NASA EPIC" class="nasa-thumb-img" referrerpolicy="no-referrer" />`
              : ''
        }
        <div>
          <p class="kicker-text">${photo ? `NASA Image Library · ${photo.nasaId}` : 'NASA Space Biology & EPIC Context'}</p>
          <h4>${photo ? photo.title : 'Growing Plants & Communicating Across Space'}</h4>
          <p class="muted-text">NASA studies space plant growth (such as ISS Veggie chambers) to help crews grow food. Note: NASA OSDR browser API calls are blocked by upstream CORS, so verified NASA Image Library media is shown here.</p>
        </div>
      </aside>
    `;
  }

  return '';
}

function renderChallengeScreen() {
  const mission = MISSIONS.find((m) => m.id === appState.currentLevelId) || MISSIONS[0];
  const challenge = getActiveChallenge(appState);
  const outcome = appState.currentOutcome;
  const charId = appState.progress.selectedCharacter || 'boy';

  const sceneHtml = renderMissionSceneSVG({
    levelId: mission.id,
    challenge,
    characterId: charId,
    expression: appState.astronautExpression,
    resources: appState.resources,
    donkiInfo: appState.nasaData.donki,
    activeHotspot: appState.activeHotspotText,
    selectedOptionId: appState.selectedOptionId,
    appliedEffect: appState.appliedEffect
  });

  const selectedOpt = challenge.options.find((o) => o.id === appState.selectedOptionId);

  const decisionPanelHtml = outcome
    ? `
      <div class="outcome-card" aria-live="polite">
        <div class="outcome-block outcome-confirmed-row">
          <span class="outcome-pictogram-wrap">${renderPictogramSVG(outcome.pictogram)}</span>
          <div>
            <p class="kicker-text">YOUR DECISION (CONFIRMED)</p>
            <h3>${outcome.optionLabel}</h3>
          </div>
        </div>

        <div class="outcome-block">
          <p class="kicker-text">RESOURCE UPDATES</p>
          <ul class="delta-list">
            ${outcome.changes
              .map(
                (c) => `
                <li class="delta-item ${c.delta >= 0 ? 'gain' : 'cost'}">
                  <span>${c.label}:</span>
                  <strong class="tabular-nums">${c.before}% → ${c.after}% (${c.delta >= 0 ? '+' : ''}${c.delta}%)</strong>
                </li>
              `
              )
              .join('')}
          </ul>
        </div>

        <div class="outcome-block">
          <p class="kicker-text">WHAT HAPPENED?</p>
          <p>${outcome.whatHappened}</p>
        </div>

        <div class="outcome-block">
          <p class="kicker-text">WHY DOES THIS MATTER IN SPACE?</p>
          <p>${outcome.whyItMatters}</p>
        </div>

        <div class="outcome-block lesson-highlight">
          <p class="kicker-text">MISSION LESSON</p>
          <p><strong>${outcome.lesson}</strong></p>
          <p class="muted-text">Key Term — <strong>${outcome.vocab.term}:</strong> ${outcome.vocab.definition}</p>
        </div>

        ${
          outcome.safety.isUnsafe
            ? `<div class="safety-alert-box" role="alert">
                <strong>Safety Alert:</strong> ${outcome.safety.criticalResources.join(', ')} dropped to a critical level (&le; 15%). Try a different pictogram choice to keep your crew safe!
              </div>`
            : ''
        }

        <div class="outcome-actions">
          ${
            outcome.safety.isUnsafe
              ? `<button type="button" class="btn-primary btn-large" data-action="retry-challenge">Try This Challenge Again</button>`
              : `<button type="button" class="btn-primary btn-large" data-action="continue-challenge">Continue Mission</button>
                 <button type="button" class="btn-secondary" data-action="retry-challenge">Try Another Choice</button>`
          }
        </div>
      </div>
    `
    : `
      <div class="challenge-card">
        <div class="challenge-meta-row">
          <span class="kicker-text">Level ${mission.id}: ${mission.title} · Challenge ${appState.currentChallengeIndex + 1} of 3</span>
          <button type="button" class="btn-ghost btn-compact" data-action="read-challenge">Read Aloud</button>
        </div>
        <h1>${challenge.title}</h1>
        <p class="challenge-narrative">${challenge.narrative}</p>

        <div class="objective-grid">
          <div>
            <p class="kicker-text">Mission Problem</p>
            <p>${challenge.problem}</p>
          </div>
          <div>
            <p class="kicker-text">Your Objective</p>
            <p><strong>${challenge.objective}</strong></p>
          </div>
        </div>

        <p class="muted-text vocab-inline">
          <strong>${challenge.vocab.term}:</strong> ${challenge.vocab.definition}
        </p>

        <div class="pictogram-section-head">
          <h2>Select a Pictogram Decision</h2>
          <p class="muted-text">Tap or click a pictogram card below, then confirm your decision.</p>
        </div>

        <div class="pictogram-options-grid" role="radiogroup" aria-label="Mission pictogram decision choices">
          ${challenge.options
            .map((opt) => {
              const isSelected = appState.selectedOptionId === opt.id;
              return `
                <button
                  type="button"
                  role="radio"
                  aria-checked="${isSelected ? 'true' : 'false'}"
                  class="decision-option-btn ${isSelected ? 'selected' : ''}"
                  data-action="select-option"
                  data-option="${opt.id}"
                >
                  <span class="option-pictogram">${renderPictogramSVG(opt.pictogram)}</span>
                  <span class="option-copy">
                    <strong>${opt.label}</strong>
                    <span class="option-desc">${opt.description}</span>
                    <span class="option-tradeoff">${opt.tradeoffHint}</span>
                    <span class="option-select-badge">${isSelected ? 'Selected — Ready to Confirm' : 'Tap to Select'}</span>
                  </span>
                </button>
              `;
            })
            .join('')}
        </div>

        <div class="confirm-decision-bar">
          ${
            selectedOpt
              ? `<button type="button" class="btn-primary btn-large confirm-btn" data-action="confirm-option">
                   Confirm Decision: ${selectedOpt.label}
                 </button>`
              : `<button type="button" class="btn-disabled btn-large confirm-btn" disabled aria-disabled="true">
                   Choose a Pictogram Above First
                 </button>`
          }
        </div>
      </div>
    `;

  return `
    ${renderResourceHUD()}
    <div class="mission-play-layout">
      <section class="scene-column" aria-label="Illustrated 2D mission environment">
        <div class="scene-toolbar">
          <span>Condition: ${appState.variantLabel}</span>
          <button type="button" class="btn-ghost btn-compact" data-action="navigate" data-screen="missions">Exit to Missions</button>
        </div>
        <div class="scene-frame">${sceneHtml}</div>
        <p class="scene-tip muted-text">Tip: Click or tap equipment in the 2D lunar scene (habitat, tanks, solar panels, shelter, greenhouse, antenna, rover, or Earth) to inspect it.</p>
        ${renderNasaContextCardForLevel(mission.id)}
      </section>

      <section class="decision-column" aria-label="Mission challenge and pictogram decisions">
        ${decisionPanelHtml}
      </section>
    </div>
  `;
}

function renderNasaDataScreen() {
  const donki = appState.nasaData.donki;
  const epic = appState.nasaData.epic;
  const moonTrek = appState.nasaData.moonTrek;
  const insight = appState.nasaData.insight;
  const mediaPlants = appState.nasaData.mediaPlants;

  const catalogRows = NASA_DATASET_CATALOG.map(
    (ds) => `
      <article class="nasa-catalog-card">
        <h3>${ds.name}</h3>
        <p class="muted-text"><strong>Type:</strong> ${ds.dataType} · <strong>Used in:</strong> ${ds.usedIn}</p>
        <p><strong>Endpoint:</strong> <code>${ds.endpoint}</code></p>
        <p><strong>Relevant fields:</strong> ${ds.fields}</p>
        <p><strong>Educational relevance:</strong> ${ds.relevance}</p>
        <p><strong>Game impact:</strong> ${ds.gameImpact}</p>
        <p><strong>Known limitations:</strong> ${ds.limitations}</p>
        <p><a href="${ds.docsUrl}" target="_blank" rel="noopener noreferrer">Official NASA Documentation</a></p>
      </article>
    `
  ).join('');

  const glossaryHtml = Object.values(SPACE_WEATHER_GLOSSARY)
    .map(
      (g) => `
      <div class="vocab-card">
        <h4>${g.term}</h4>
        <p class="muted-text">${g.meaning}</p>
      </div>
    `
    )
    .join('');

  return `
    <section class="panel-card nasa-panel" aria-labelledby="nasa-heading">
      <div class="nasa-header">
        <div>
          <p class="kicker-text">Scientific Traceability &amp; Open Data Transparency</p>
          <h1 id="nasa-heading">NASA DATA SOURCES AND SCIENTIFIC CONTEXT</h1>
          <p class="lead-text">
            <strong>Real NASA Data:</strong> The game retrieves information from NASA's public data services through an internet connection when needed. This information is presented as scientific reference material and is not stored for offline use.
          </p>
          <p class="lead-text">
            <strong>Educational Simulation:</strong> Oxygen, water, energy, food, and other resource levels are simulated values created for the game. They help players understand mission decisions and their consequences. They do not represent actual NASA measurements or official mission limits.
          </p>
        </div>
        <button type="button" class="btn-secondary" data-action="refresh-nasa">Refresh Live NASA Feed</button>
      </div>

      ${appState.nasaData.loading ? '<p class="loading-banner">Retrieving live NASA observations...</p>' : ''}

      <div class="nasa-live-grid">
        <article class="live-feed-card">
          <p class="kicker-text">1. Space Weather (NASA DONKI)</p>
          <h3>${donki ? donki.sourceLabel : 'Pending fetch'}</h3>
          ${
            donki && donki.events.length > 0
              ? `<ul class="live-events-list">
                  ${donki.events
                    .slice(0, 4)
                    .map((ev) => `<li><strong>${ev.typeName}</strong> (${ev.date}): ${ev.detail}</li>`)
                    .join('')}
                </ul>`
              : `<p class="muted-text">${donki ? 'No recent CME/SEP/GST events in this 30-day window or endpoint unavailable.' : 'Loading...'}</p>`
          }
          <p class="muted-text">${donki ? donki.scientificNote : ''}</p>
        </article>

        <article class="live-feed-card">
          <p class="kicker-text">2. Earth from DSCOVR (NASA EPIC)</p>
          <h3>${epic ? epic.sourceLabel : 'Pending fetch'}</h3>
          ${
            epic && epic.imageUrl
              ? `<div class="epic-preview-row">
                  <img src="${epic.imageUrl}" alt="${epic.caption}" class="epic-img" referrerpolicy="no-referrer" />
                  <div>
                    <p><strong>Date:</strong> ${epic.date}</p>
                    <p class="muted-text">${epic.caption}</p>
                    ${
                      epic.coordinates
                        ? `<p class="muted-text tabular-nums">Centroid Lat: ${epic.coordinates.lat.toFixed(1)}°, Lon: ${epic.coordinates.lon.toFixed(1)}°</p>`
                        : ''
                    }
                  </div>
                </div>`
              : `<p class="muted-text">${epic ? epic.caption : 'Loading...'}</p>`
          }
        </article>

        <article class="live-feed-card">
          <p class="kicker-text">3. Lunar Surface Map (Moon Trek WMTS)</p>
          <h3>${moonTrek ? moonTrek.sourceLabel : 'Pending fetch'}</h3>
          ${
            moonTrek && moonTrek.tiles.length > 0
              ? `<p class="muted-text">Verified Capabilities Layer: <code>${moonTrek.layerId}</code> · MatrixSet: <code>${moonTrek.matrixSet}</code></p>
                 <div class="moon-trek-grid" aria-label="Lunar Reconnaissance Orbiter global map mosaic">
                   ${moonTrek.tiles
                     .map((tileUrl, idx) => `<img src="${tileUrl}" alt="Moon Trek LRO mosaic tile ${idx + 1}" class="moon-tile" referrerpolicy="no-referrer" />`)
                     .join('')}
                 </div>`
              : `<p class="muted-text">WMTS Capabilities unavailable right now.</p>`
          }
        </article>

        <article class="live-feed-card">
          <p class="kicker-text">4. Historical Mars Comparison (InSight Weather)</p>
          <h3>${insight ? insight.sourceLabel : 'Pending fetch'}</h3>
          ${
            insight && insight.sol
              ? `<p><strong>Historical Sol ${insight.sol}</strong> (Observed ${insight.earthDate})</p>
                 <ul class="live-events-list">
                   <li>Air Temp Average: ${insight.airTempAvg !== null ? `${insight.airTempAvg} °C` : 'Sensor unavailable'}</li>
                   <li>Wind Speed Average: ${insight.windAvg !== null ? `${insight.windAvg} m/s` : 'Sensor unavailable'}</li>
                   <li>Pressure Average: ${insight.pressureAvg !== null ? `${insight.pressureAvg} Pa` : 'Sensor unavailable'}</li>
                 </ul>
                 <p class="muted-text">Historical Mars data only (InSight mission ended). Shown to compare Mars’s thin atmosphere with the airless Moon.</p>`
              : `<p class="muted-text">${insight ? insight.sourceLabel : 'Loading...'}</p>`
          }
        </article>
      </div>

      ${
        mediaPlants && mediaPlants.items.length > 0
          ? `<div class="results-section">
              <h2>Space Plant Research Media (NASA Image Library)</h2>
              <div class="nasa-media-row">
                ${mediaPlants.items
                  .map(
                    (m) => `
                  <figure class="nasa-media-figure">
                    <img src="${m.imageUrl}" alt="${m.title}" referrerpolicy="no-referrer" />
                    <figcaption><strong>${m.title}</strong> · ID: ${m.nasaId} (${m.dateCreated})</figcaption>
                  </figure>
                `
                  )
                  .join('')}
              </div>
            </div>`
          : ''
      }

      <div class="results-section">
        <h2>Space-Weather Vocabulary Explained for Young Explorers</h2>
        <div class="vocab-grid">${glossaryHtml}</div>
      </div>

      <div class="results-section">
        <h2>Complete Dataset Traceability Table</h2>
        <div class="nasa-catalog-grid">${catalogRows}</div>
      </div>
    </section>
  `;
}

function renderAccessibilityModal() {
  if (!appState.showAccessibilityModal) return '';
  const prefs = appState.progress.preferences;

  return `
    <div class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="a11y-title">
      <div class="modal-card">
        <div class="modal-header">
          <h2 id="a11y-title">Accessibility &amp; Sensory Settings</h2>
          <button type="button" class="btn-ghost btn-compact" data-action="close-accessibility">Close</button>
        </div>

        <div class="a11y-controls">
          <div class="a11y-row">
            <label for="text-size-select"><strong>Text Size</strong></label>
            <div id="text-size-select" class="segmented-group" role="group" aria-label="Text size">
              ${['normal', 'large', 'xlarge']
                .map(
                  (sz) => `
                  <button type="button" class="seg-btn ${prefs.textSize === sz ? 'active' : ''}" data-action="set-text-size" data-size="${sz}">
                    ${sz === 'normal' ? 'Standard' : sz === 'large' ? 'Large' : 'Extra Large'}
                  </button>
                `
                )
                .join('')}
            </div>
          </div>

          <div class="a11y-row">
            <span><strong>High Contrast Mode</strong></span>
            <button type="button" class="toggle-btn ${prefs.highContrast ? 'on' : ''}" data-action="toggle-pref" data-pref="highContrast" aria-pressed="${prefs.highContrast}">
              ${prefs.highContrast ? 'On' : 'Off'}
            </button>
          </div>

          <div class="a11y-row">
            <span><strong>Reduced Motion (Calmer Screen)</strong></span>
            <button type="button" class="toggle-btn ${prefs.reducedMotion ? 'on' : ''}" data-action="toggle-pref" data-pref="reducedMotion" aria-pressed="${prefs.reducedMotion}">
              ${prefs.reducedMotion ? 'On' : 'Off'}
            </button>
          </div>

          <div class="a11y-row">
            <span><strong>Read Aloud Voice (Narration)</strong></span>
            <button type="button" class="toggle-btn ${prefs.ttsEnabled ? 'on' : ''}" data-action="toggle-pref" data-pref="ttsEnabled" aria-pressed="${prefs.ttsEnabled}">
              ${prefs.ttsEnabled ? 'On' : 'Off'}
            </button>
          </div>

          <div class="a11y-row">
            <span><strong>Sound Effects (Gentle Chimes)</strong></span>
            <button type="button" class="toggle-btn ${prefs.sfxEnabled ? 'on' : ''}" data-action="toggle-pref" data-pref="sfxEnabled" aria-pressed="${prefs.sfxEnabled}">
              ${prefs.sfxEnabled ? 'On' : 'Off'}
            </button>
          </div>

          <div class="a11y-row">
            <span><strong>Calm Space Background Music</strong></span>
            <button type="button" class="toggle-btn ${prefs.musicEnabled ? 'on' : ''}" data-action="toggle-pref" data-pref="musicEnabled" aria-pressed="${prefs.musicEnabled}">
              ${prefs.musicEnabled ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn-ghost" data-action="reset-progress">Reset Mission Progress</button>
          <button type="button" class="btn-primary" data-action="close-accessibility">Save &amp; Return</button>
        </div>
      </div>
    </div>
  `;
}

function renderIOSInstallModal() {
  if (!appState.showIOSInstallModal) return '';
  return `
    <div class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="ios-install-title">
      <div class="modal-card">
        <div class="modal-header">
          <h2 id="ios-install-title">Install on iPhone or iPad</h2>
          <button type="button" class="btn-ghost btn-compact" data-action="close-ios-install">Close</button>
        </div>
        <p>1. Tap the <strong>Share</strong> button in Safari.</p>
        <p>2. Scroll down and tap <strong>Add to Home Screen</strong>.</p>
        <p class="muted-text">Note: NASA data features always require an active internet connection.</p>
        <div class="modal-footer">
          <button type="button" class="btn-primary" data-action="close-ios-install">Got It</button>
        </div>
      </div>
    </div>
  `;
}

function updateSubtitleForScreen() {
  const tts = appState.progress.preferences.ttsEnabled;
  if (appState.screen === 'welcome') {
    setLastInstruction('Welcome to Galactic NeuroCrew! Choose your child astronaut and enter an optional nickname to start.', tts);
  } else if (appState.screen === 'missions') {
    setLastInstruction(`Mission Selection. You have completed ${appState.progress.completedLevels.length} of 5 levels.`, tts);
  } else if (appState.screen === 'challenge') {
    if (appState.currentOutcome) {
      setLastInstruction(`${appState.currentOutcome.whatHappened} Mission lesson: ${appState.currentOutcome.lesson}`, tts);
    } else {
      const challenge = getActiveChallenge(appState);
      setLastInstruction(`${challenge.title}. ${challenge.narrative} Objective: ${challenge.objective}`, tts);
    }
  } else if (appState.screen === 'results') {
    setLastInstruction(`Level ${appState.currentLevelId} complete! You earned a new mission badge.`, tts);
  } else if (appState.screen === 'report') {
    setLastInstruction('Mission Archive and Final Report.', tts);
  } else if (appState.screen === 'nasa') {
    setLastInstruction('NASA Data Sources and Scientific Context.', tts);
  }
}

function renderApp(updateSpeech = true) {
  const root = document.getElementById('app');
  if (!root) return;

  let mainContent = '';
  if (appState.screen === 'welcome') {
    mainContent = renderWelcomeScreen();
  } else if (appState.screen === 'missions') {
    mainContent = renderMissionSelectScreen();
  } else if (appState.screen === 'challenge') {
    mainContent = renderChallengeScreen();
  } else if (appState.screen === 'results') {
    mainContent = renderLevelResultsView(appState);
  } else if (appState.screen === 'report') {
    mainContent = renderArchiveAndReportView(appState);
  } else if (appState.screen === 'nasa') {
    mainContent = renderNasaDataScreen();
  }

  root.innerHTML = `
    <div class="app-shell">
      ${renderTopBar()}
      ${renderSubtitleBar()}
      <main id="main-content" class="main-container" tabindex="-1">
        ${mainContent}
      </main>
      ${renderAccessibilityModal()}
      ${renderIOSInstallModal()}
    </div>
  `;

  if (updateSpeech) {
    updateSubtitleForScreen();
  }
}

async function handleAction(actionEl) {
  const action = actionEl.getAttribute('data-action');
  if (!action) return;

  spaceAudio.configure(appState.progress.preferences);

  if (action === 'select-character') {
    spaceAudio.playClick();
    appState.progress.selectedCharacter = actionEl.getAttribute('data-character');
    saveProgress(appState.progress);
    renderApp();
    return;
  }

  if (action === 'start-game') {
    if (!appState.progress.selectedCharacter) {
      spaceAudio.playCaution();
      setLastInstruction('Please select Leo or Maya first before starting your mission.', true);
      return;
    }
    spaceAudio.playSuccess();
    appState.screen = 'missions';
    renderApp();
    return;
  }

  if (action === 'navigate') {
    const targetScreen = actionEl.getAttribute('data-screen');
    if (targetScreen === 'missions' && !appState.progress.selectedCharacter) {
      appState.progress.selectedCharacter = 'boy';
      saveProgress(appState.progress);
    }
    spaceAudio.playClick();
    appState.screen = targetScreen;
    renderApp();
    ensureNasaDataForScreen(targetScreen, appState.currentLevelId);
    return;
  }

  if (action === 'start-level' || action === 'replay-level') {
    const levelId = Number(actionEl.getAttribute('data-level'));
    spaceAudio.playClick();
    startMissionLevel(appState, levelId, action === 'replay-level');
    renderApp();
    ensureNasaDataForScreen('challenge', levelId);
    return;
  }

  if (action === 'select-option') {
    const optionId = actionEl.getAttribute('data-option');
    spaceAudio.playClick();
    selectPictogramOption(appState, optionId);
    renderApp(false);
    return;
  }

  if (action === 'confirm-option') {
    const outcome = confirmSelectedOption(appState);
    if (outcome) {
      if (outcome.safety.isUnsafe) {
        spaceAudio.playCaution();
      } else {
        spaceAudio.playSuccess();
      }
      renderApp();
    }
    return;
  }

  if (action === 'retry-challenge') {
    spaceAudio.playClick();
    retryCurrentChallenge(appState);
    renderApp();
    return;
  }

  if (action === 'continue-challenge') {
    const result = advanceAfterOutcome(appState);
    if (result === 'level-complete') {
      spaceAudio.playBadge();
    } else {
      spaceAudio.playClick();
    }
    renderApp();
    return;
  }

  if (action === 'read-challenge') {
    const challenge = getActiveChallenge(appState);
    speakText(`${challenge.title}. ${challenge.narrative} Problem: ${challenge.problem} Objective: ${challenge.objective}`, true, true);
    return;
  }

  if (action === 'repeat-speech') {
    repeatLastInstruction(true);
    return;
  }

  if (action === 'toggle-tts') {
    const next = !appState.progress.preferences.ttsEnabled;
    appState.progress.preferences.ttsEnabled = next;
    saveProgress(appState.progress);
    if (!next) stopSpeaking();
    renderApp(false);
    return;
  }

  if (action === 'open-accessibility') {
    spaceAudio.playClick();
    appState.showAccessibilityModal = true;
    renderApp(false);
    return;
  }

  if (action === 'close-accessibility') {
    spaceAudio.playClick();
    appState.showAccessibilityModal = false;
    renderApp(false);
    return;
  }

  if (action === 'set-text-size') {
    spaceAudio.playClick();
    appState.progress.preferences.textSize = actionEl.getAttribute('data-size');
    applyAccessibilityPreferences(appState.progress.preferences);
    saveProgress(appState.progress);
    renderApp(false);
    return;
  }

  if (action === 'toggle-pref') {
    const key = actionEl.getAttribute('data-pref');
    appState.progress.preferences[key] = !appState.progress.preferences[key];
    applyAccessibilityPreferences(appState.progress.preferences);
    spaceAudio.configure(appState.progress.preferences);
    spaceAudio.playClick();
    saveProgress(appState.progress);
    renderApp(false);
    return;
  }

  if (action === 'reset-progress') {
    appState.progress = resetProgressOnly(appState.progress.preferences);
    appState.showAccessibilityModal = false;
    appState.screen = 'welcome';
    renderApp();
    return;
  }

  if (action === 'refresh-nasa') {
    spaceAudio.playClick();
    appState.nasaData.donki = null;
    appState.nasaData.epic = null;
    appState.nasaData.moonTrek = null;
    appState.nasaData.insight = null;
    await ensureNasaDataForScreen('nasa', 3);
    return;
  }

  if (action === 'print-report') {
    window.print();
    return;
  }

  if (action === 'install-pwa' && appState.deferredInstallPrompt) {
    await appState.deferredInstallPrompt.prompt();
    const choice = await appState.deferredInstallPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      appState.isInstalledPWA = true;
      appState.deferredInstallPrompt = null;
    }
    renderApp(false);
    return;
  }

  if (action === 'open-ios-install') {
    appState.showIOSInstallModal = true;
    renderApp(false);
    return;
  }

  if (action === 'close-ios-install') {
    appState.showIOSInstallModal = false;
    renderApp(false);
  }
}

document.addEventListener('click', (event) => {
  const actionEl = event.target.closest('[data-action]');
  if (actionEl) {
    handleAction(actionEl);
    return;
  }

  const hotspotEl = event.target.closest('[data-inspect]');
  if (hotspotEl) {
    const key = hotspotEl.getAttribute('data-inspect');
    const description = SCENE_INSPECTIONS[key];
    if (description) {
      spaceAudio.playClick();
      appState.activeHotspotText = description;
      setLastInstruction(description, appState.progress.preferences.ttsEnabled);
      renderApp(false);
    }
  }
});

document.addEventListener('input', (event) => {
  if (event.target && event.target.id === 'nickname-input') {
    appState.progress.nickname = event.target.value.slice(0, 10);
    saveProgress(appState.progress);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (appState.showAccessibilityModal || appState.showIOSInstallModal) {
      appState.showAccessibilityModal = false;
      appState.showIOSInstallModal = false;
      renderApp(false);
    }
  }
  if ((event.key === 'Enter' || event.key === ' ') && event.target && event.target.hasAttribute('data-inspect')) {
    event.preventDefault();
    event.target.click();
    return;
  }
  if (
    (event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowUp') &&
    event.target &&
    event.target.classList &&
    event.target.classList.contains('decision-option-btn')
  ) {
    const buttons = Array.from(document.querySelectorAll('.decision-option-btn'));
    const idx = buttons.indexOf(event.target);
    if (idx !== -1 && buttons.length > 1) {
      event.preventDefault();
      const nextIdx = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? (idx + 1) % buttons.length : (idx - 1 + buttons.length) % buttons.length;
      const targetOptionId = buttons[nextIdx].getAttribute('data-option');
      if (targetOptionId) {
        spaceAudio.configure(appState.progress.preferences);
        spaceAudio.playClick();
        selectPictogramOption(appState, targetOptionId);
        renderApp(false);
        const refreshed = document.querySelector(`.decision-option-btn[data-option="${targetOptionId}"]`);
        if (refreshed) refreshed.focus();
      }
    }
  }
});

applyAccessibilityPreferences(appState.progress.preferences);
spaceAudio.configure(appState.progress.preferences);
setupPWAInstallListeners();
renderApp();
