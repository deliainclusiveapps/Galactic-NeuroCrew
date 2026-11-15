class SpaceAudioEngine {
  constructor() {
    this.ctx = null;
    this.sfxEnabled = true;
    this.musicEnabled = false;
    this.musicInterval = null;
    this.musicStep = 0;
  }

  ensureContext() {
    if (typeof window === 'undefined') return null;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    if (!this.ctx) {
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  configure({ sfxEnabled, musicEnabled }) {
    this.sfxEnabled = Boolean(sfxEnabled);
    const shouldPlayMusic = Boolean(musicEnabled);
    if (shouldPlayMusic !== this.musicEnabled) {
      this.musicEnabled = shouldPlayMusic;
      if (this.musicEnabled) {
        this.startAmbientMusic();
      } else {
        this.stopAmbientMusic();
      }
    }
  }

  playTone(freq, duration, type = 'sine', volume = 0.06, delay = 0) {
    if (!this.sfxEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.03);
  }

  playClick() {
    this.playTone(520, 0.09, 'sine', 0.045);
  }

  playSuccess() {
    this.playTone(440, 0.14, 'triangle', 0.05, 0);
    this.playTone(554.37, 0.16, 'triangle', 0.05, 0.08);
    this.playTone(659.25, 0.24, 'triangle', 0.055, 0.16);
  }

  playCaution() {
    this.playTone(330, 0.18, 'sine', 0.05, 0);
    this.playTone(293.66, 0.24, 'sine', 0.05, 0.14);
  }

  playBadge() {
    const notes = [392, 493.88, 587.33, 783.99];
    notes.forEach((n, index) => {
      this.playTone(n, 0.28, 'triangle', 0.06, index * 0.1);
    });
  }

  startAmbientMusic() {
    if (this.musicInterval) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const chords = [
      [196.0, 246.94, 293.66],
      [220.0, 261.63, 329.63],
      [174.61, 220.0, 261.63],
      [196.0, 246.94, 329.63]
    ];

    const playPad = () => {
      if (!this.musicEnabled) return;
      const activeCtx = this.ensureContext();
      if (!activeCtx) return;
      const chord = chords[this.musicStep % chords.length];
      this.musicStep += 1;

      chord.forEach((freq) => {
        const now = activeCtx.currentTime;
        const osc = activeCtx.createOscillator();
        const gain = activeCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.015, now + 1.1);
        gain.gain.linearRampToValueAtTime(0.0001, now + 3.8);
        osc.connect(gain);
        gain.connect(activeCtx.destination);
        osc.start(now);
        osc.stop(now + 3.9);
      });
    };

    playPad();
    this.musicInterval = window.setInterval(playPad, 4000);
  }

  stopAmbientMusic() {
    if (this.musicInterval) {
      window.clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

export const spaceAudio = new SpaceAudioEngine();
