import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music, Sparkles } from "lucide-react";
import { weddingConfig } from "../config/wedding";

interface AudioPlayerProps {
  autoStart?: boolean;
}

export function AudioPlayer({ autoStart = true }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [userHasInteracted, setUserHasInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.6;

    const unlockAndPlay = async () => {
      if (!audioRef.current) return;
      try {
        audioRef.current.muted = false;
        await audioRef.current.play();
        setIsPlaying(true);
        setUserHasInteracted(true);
      } catch {
        // If unmuted fails, try muted play then unmute
        try {
          audioRef.current.muted = true;
          await audioRef.current.play();
          setIsPlaying(true);
        } catch {
          setIsPlaying(false);
        }
      }
    };

    if (autoStart) {
      unlockAndPlay();
    }

    // Universal gesture events to instantly unmute & play audio on first user touch/scroll/click
    const gestures = [
      "click",
      "touchstart",
      "pointerdown",
      "scroll",
      "wheel",
      "keydown",
      "mousemove",
    ];

    const handleGesture = () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setUserHasInteracted(true);
          })
          .catch(() => {});
      }
      gestures.forEach((evt) =>
        window.removeEventListener(evt, handleGesture, { capture: true })
      );
    };

    gestures.forEach((evt) =>
      window.addEventListener(evt, handleGesture, { capture: true, passive: true })
    );

    return () => {
      gestures.forEach((evt) =>
        window.removeEventListener(evt, handleGesture, { capture: true })
      );
    };
  }, [autoStart]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && !audio.paused) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.muted = false;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setUserHasInteracted(true);
        })
        .catch(() => {});
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[90] flex items-center gap-2 sm:gap-3">
      <audio ref={audioRef} src={weddingConfig.musicUrl} preload="auto" />

      <button
        onClick={togglePlay}
        className={`bg-maroon-900 text-gold-400 border border-gold-500/50 hover:bg-gold-500 hover:text-maroon-900 transition-all p-3 rounded-full shadow-2xl flex items-center space-x-2 group cursor-pointer ${
          !isPlaying ? "animate-pulse border-gold-400 shadow-[0_0_20px_rgba(212,175,55,0.6)]" : ""
        }`}
        title={isPlaying ? "Pause Music" : "Play Royal Wedding Music"}
        aria-label="Toggle Background Music"
      >
        <Music className={`w-5 h-5 ${isPlaying ? "animate-pulse text-gold-400" : "text-gold-400"}`} />

        {isPlaying ? (
          <div className="flex items-end gap-[2px] h-4 w-4 overflow-hidden py-[2px]">
            <span className="w-1 bg-gold-400 rounded-full animate-[bounce_0.8s_infinite]" />
            <span className="w-1 bg-gold-400 rounded-full animate-[bounce_1.2s_infinite]" />
            <span className="w-1 bg-gold-400 rounded-full animate-[bounce_0.6s_infinite]" />
          </div>
        ) : (
          <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-spin" />
        )}

        <span className="font-display text-xs tracking-widest uppercase font-semibold pr-1">
          {isPlaying ? "Music On" : "Play Music"}
        </span>
      </button>

      {/* Floating Prompt Badge if waiting for user interaction */}
      {!userHasInteracted && !isPlaying && (
        <span className="hidden sm:inline-block text-[11px] font-display text-gold-400 tracking-wider bg-maroon-900/90 border border-gold-500/40 px-3 py-1.5 rounded-full shadow-lg animate-bounce">
          🎵 Tap Anywhere to Play Music
        </span>
      )}

      {isPlaying && (
        <button
          onClick={toggleMute}
          className="bg-maroon-900 text-gold-400 border border-gold-500/30 hover:bg-maroon-800 transition-colors p-2.5 rounded-full shadow-lg cursor-pointer"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
}
