let lastSpokenText = '';

export function applyAccessibilityPreferences(prefs) {
  const root = document.documentElement;
  root.classList.remove('text-size-normal', 'text-size-large', 'text-size-xlarge');
  const size = prefs.textSize || 'normal';
  root.classList.add(`text-size-${size}`);

  if (prefs.highContrast) {
    root.classList.add('high-contrast');
  } else {
    root.classList.remove('high-contrast');
  }

  const osReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefs.reducedMotion || osReduced) {
    root.classList.add('reduced-motion');
  } else {
    root.classList.remove('reduced-motion');
  }
}

export function isSpeechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function stopSpeaking() {
  if (isSpeechSupported()) {
    window.speechSynthesis.cancel();
  }
}

export function updateSubtitleBanner(text) {
  const banner = document.getElementById('subtitle-text');
  if (banner) {
    banner.textContent = text || 'Mission subtitles ready. Select a control or click Read Aloud.';
  }
}

export function speakText(text, ttsEnabled, forceSpeak = false) {
  if (!text) return;
  lastSpokenText = text;
  updateSubtitleBanner(text);

  if (!isSpeechSupported()) return;
  if (!ttsEnabled && !forceSpeak) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.94;
  utterance.pitch = 1.05;
  window.speechSynthesis.speak(utterance);
}

export function repeatLastInstruction(ttsEnabled) {
  if (!lastSpokenText) return;
  speakText(lastSpokenText, ttsEnabled, true);
}

export function setLastInstruction(text, ttsEnabled) {
  lastSpokenText = text;
  updateSubtitleBanner(text);
  if (ttsEnabled) {
    speakText(text, true, false);
  }
}
