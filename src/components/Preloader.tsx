import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { weddingConfig } from "../config/wedding";
import { Sparkles, Crown } from "lucide-react";

interface PreloaderProps {
  onLoaded: () => void;
}

export function Preloader({ onLoaded }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // List of assets to preload before starting website
    const imagesToPreload = [
      weddingConfig.heroBannerImage,
      ...weddingConfig.story.map((s) => s.image),
      ...weddingConfig.events.map((e) => e.image),
      ...weddingConfig.gallery,
      ...weddingConfig.family.bride.map((f) => f.image),
      ...weddingConfig.family.groom.map((f) => f.image),
    ];

    let loadedCount = 0;
    const totalAssets = imagesToPreload.length + 1; // +1 for video/audio readiness

    const updateProgress = () => {
      loadedCount++;
      const currentPercent = Math.min(Math.round((loadedCount / totalAssets) * 100), 100);
      setProgress(currentPercent);

      if (loadedCount >= totalAssets) {
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onLoaded, 600);
        }, 300);
      }
    };

    // Preload images
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = updateProgress;
      img.onerror = updateProgress;
    });

    // Preload video/audio check
    const video = document.createElement("video");
    video.src = weddingConfig.video.opening;
    video.preload = "auto";
    video.onloadeddata = updateProgress;
    video.onerror = updateProgress;

    // Safety fallback timeout after max 2.5 seconds
    const fallbackTimer = setTimeout(() => {
      setProgress(100);
      setIsDone(true);
      setTimeout(onLoaded, 400);
    }, 2500);

    return () => clearTimeout(fallbackTimer);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-maroon-900 flex flex-col items-center justify-center p-4 text-center select-none"
        >
          {/* Royal Gold Monogram Emblem */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative mb-8"
          >
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 border-gold-400/80 flex items-center justify-center p-2 relative shadow-[0_0_35px_rgba(212,175,55,0.4)]">
              <div className="absolute inset-1.5 border border-gold-500/40 rounded-full" />
              <Crown className="w-6 h-6 text-gold-400 absolute -top-3 left-1/2 -translate-x-1/2 bg-maroon-900 px-1" />
              <span className="font-script text-4xl sm:text-5xl text-gold-400 font-bold tracking-wider drop-shadow">
                {weddingConfig.bride.name[0]} & {weddingConfig.groom.name[0]}
              </span>
            </div>
          </motion.div>

          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-gold-400 animate-spin" />
            <span className="font-display text-xs sm:text-sm text-gold-400 tracking-[0.3em] uppercase font-semibold">
              Loading Royal Invitation
            </span>
            <Sparkles className="w-4 h-4 text-gold-400 animate-spin" />
          </div>

          {/* Progress Bar Container */}
          <div className="w-56 sm:w-64 h-1.5 bg-maroon-800 rounded-full overflow-hidden border border-gold-500/30 mb-3 relative">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="font-mono text-xs text-gold-400/90 tracking-widest">
            {progress}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
