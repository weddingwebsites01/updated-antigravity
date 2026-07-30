import { weddingConfig } from "../config/wedding";

type AudioListener = (isPlaying: boolean, isMuted: boolean) => void;

class RoyalAudioManager {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private isMuted = false;
  private listeners: Set<AudioListener> = new Set();
  private initialized = false;

  constructor() {
    if (typeof window === "undefined") return;
    this.initAudio();
  }

  private initAudio() {
    if (this.initialized) return;
    this.initialized = true;

    this.audio = new Audio(weddingConfig.musicUrl);
    this.audio.loop = true;
    this.audio.volume = 0.7;
    this.audio.preload = "auto";

    // Media Event Listeners
    this.audio.addEventListener("play", () => {
      this.isPlaying = true;
      this.notify();
    });

    this.audio.addEventListener("pause", () => {
      this.isPlaying = false;
      this.notify();
    });

    // Attempt Immediate Playback
    this.startAutoplay();

    // Universal Gesture Listener to Unmute & Force Play on First User Gesture
    const events = [
      "click",
      "touchstart",
      "touchend",
      "pointerdown",
      "mousedown",
      "keydown",
      "scroll",
      "wheel",
      "mousemove",
      "visibilitychange",
    ];

    const unlockAudio = () => {
      if (!this.audio) return;
      this.audio.muted = false;
      this.isMuted = false;

      if (this.audio.paused) {
        this.audio
          .play()
          .then(() => {
            this.isPlaying = true;
            this.notify();
          })
          .catch(() => {});
      } else {
        this.notify();
      }
    };

    events.forEach((evt) => {
      window.addEventListener(evt, unlockAudio, { capture: true, passive: true });
    });
  }

  private async startAutoplay() {
    if (!this.audio) return;

    try {
      // 1. Try Unmuted Autoplay First
      this.audio.muted = false;
      await this.audio.play();
      this.isPlaying = true;
      this.isMuted = false;
      this.notify();
    } catch {
      // 2. If blocked by browser security policy, start muted autoplay (Browsers ALWAYS allow muted audio!)
      try {
        this.audio.muted = true;
        this.isMuted = true;
        await this.audio.play();
        this.isPlaying = true;
        this.notify();
      } catch {
        this.isPlaying = false;
        this.notify();
      }
    }
  }

  public togglePlay() {
    if (!this.audio) return;
    if (this.isPlaying && !this.audio.paused) {
      this.audio.pause();
    } else {
      this.audio.muted = false;
      this.isMuted = false;
      this.audio
        .play()
        .then(() => {
          this.isPlaying = true;
          this.notify();
        })
        .catch(() => {});
    }
  }

  public toggleMute() {
    if (!this.audio) return;
    this.audio.muted = !this.audio.muted;
    this.isMuted = this.audio.muted;
    this.notify();
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
    };
  }

  public subscribe(listener: AudioListener) {
    this.listeners.add(listener);
    listener(this.isPlaying, this.isMuted);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.isPlaying, this.isMuted));
  }
}

export const royalAudio = new RoyalAudioManager();
