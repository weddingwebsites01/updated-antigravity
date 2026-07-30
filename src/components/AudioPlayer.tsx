import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { weddingConfig } from "../config/wedding";

interface AudioPlayerProps {
  autoStart?: boolean;
}

export function AudioPlayer({ autoStart = true }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.6;

    const startPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };

    if (autoStart) {
      startPlay();
    }

    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    };

    window.addEventListener("click", handleFirstInteraction, { capture: true });
    window.addEventListener("touchstart", handleFirstInteraction, { capture: true });
    window.addEventListener("pointerdown", handleFirstInteraction, { capture: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction, { capture: true });
      window.removeEventListener("touchstart", handleFirstInteraction, { capture: true });
      window.removeEventListener("pointerdown", handleFirstInteraction, { capture: true });
    };
  }, [autoStart]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
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
        className="bg-maroon-900 text-gold-400 border border-gold-500/50 hover:bg-gold-500 hover:text-maroon-900 transition-colors p-3 rounded-full shadow-2xl flex items-center space-x-2 group cursor-pointer"
        title={isPlaying ? "Pause Music" : "Play Royal Wedding Music"}
        aria-label="Toggle Background Music"
      >
        <Music className={`w-5 h-5 ${isPlaying ? "animate-pulse text-gold-400" : ""}`} />

        {isPlaying && (
          <div className="flex items-end gap-[2px] h-4 w-4 overflow-hidden py-[2px]">
            <span className="w-1 bg-gold-400 rounded-full animate-[bounce_0.8s_infinite]" />
            <span className="w-1 bg-gold-400 rounded-full animate-[bounce_1.2s_infinite]" />
            <span className="w-1 bg-gold-400 rounded-full animate-[bounce_0.6s_infinite]" />
          </div>
        )}

        <span className="hidden sm:inline font-display text-xs tracking-widest uppercase font-semibold pr-1">
          {isPlaying ? "Music On" : "Play Music"}
        </span>
      </button>

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
