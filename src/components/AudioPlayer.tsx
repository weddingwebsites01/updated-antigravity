import { useEffect, useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { royalAudio } from "../lib/audioManager";

interface AudioPlayerProps {
  autoStart?: boolean;
}

export function AudioPlayer({ autoStart = true }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Subscribe to global RoyalAudioManager state
    const unsubscribe = royalAudio.subscribe((playing, muted) => {
      setIsPlaying(playing);
      setIsMuted(muted);
    });

    return unsubscribe;
  }, [autoStart]);

  const handleTogglePlay = () => {
    royalAudio.togglePlay();
  };

  const handleToggleMute = () => {
    royalAudio.toggleMute();
  };

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[90] flex items-center gap-2 sm:gap-3">
      <button
        onClick={handleTogglePlay}
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
          onClick={handleToggleMute}
          className="bg-maroon-900 text-gold-400 border border-gold-500/30 hover:bg-maroon-800 transition-colors p-2.5 rounded-full shadow-lg cursor-pointer"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
}
