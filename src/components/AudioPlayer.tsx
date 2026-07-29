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
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.5;

    if (autoStart) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay was prevented by browser security policy until user interaction
            setIsPlaying(false);
          });
      }
    }

    // Global listener to start audio on first click anywhere if autoplay was blocked
    const handleFirstInteraction = () => {
      if (audioRef.current && !userInteracted) {
        setUserInteracted(true);
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [autoStart, userInteracted]);

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
        .catch((err) => console.log("Audio play error:", err));
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center gap-2 sm:gap-3">
      <audio ref={audioRef} src={weddingConfig.musicUrl} preload="auto" />

      <button
        onClick={togglePlay}
        className="bg-maroon-900 text-gold-400 border border-gold-500/50 hover:bg-gold-500 hover:text-maroon-900 transition-all duration-300 p-3 rounded-full shadow-2xl flex items-center space-x-2 group backdrop-blur-md"
        title={isPlaying ? "Pause Music" : "Play Royal Wedding Music"}
        aria-label="Toggle Background Music"
      >
        <Music className={`w-5 h-5 ${isPlaying ? "animate-pulse text-gold-400" : ""}`} />

        {/* Animated Equalizer Wave lines */}
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
          className="bg-maroon-900/80 text-gold-400 border border-gold-500/30 hover:bg-maroon-900 transition-all p-2.5 rounded-full shadow-lg backdrop-blur-md"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
}
