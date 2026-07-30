import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { weddingConfig } from "../../config/wedding";
import { Play } from "lucide-react";

export function OpeningVideo({ onComplete }: { onComplete: () => void }) {
  const [needsTouchToStart, setNeedsTouchToStart] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startMedia = async () => {
      try {
        await video.play();
      } catch {
        // Autoplay blocked by browser; show tap overlay
        setNeedsTouchToStart(true);
      }
    };

    startMedia();
  }, []);

  const handleStartInteraction = () => {
    setNeedsTouchToStart(false);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        onComplete();
      });
    }
  };

  const handleVideoEnded = () => {
    // As soon as video ends, immediately fade out opening video and open hero section
    onComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        {/* Video Element playing at 100% brightness */}
        <video
          ref={videoRef}
          src={weddingConfig.video.opening}
          className="absolute inset-0 w-full h-full object-cover opacity-100"
          autoPlay
          playsInline
          onEnded={handleVideoEnded}
          onError={handleVideoEnded}
        />

        {/* Browser Autoplay Touch Trigger Overlay */}
        {needsTouchToStart && (
          <div
            onClick={handleStartInteraction}
            className="absolute inset-0 z-50 bg-black/60 flex flex-col items-center justify-center cursor-pointer p-4 text-center"
          >
            <div className="w-20 h-20 rounded-full border-2 border-gold-400 flex items-center justify-center mb-4 bg-maroon-900/90 shadow-[0_0_30px_rgba(212,175,55,0.6)] animate-pulse">
              <Play className="w-8 h-8 text-gold-400 ml-1" />
            </div>
            <p className="font-display text-gold-400 tracking-[0.2em] uppercase text-sm font-semibold">
              Tap To Play Royal Video
            </p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
