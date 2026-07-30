import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { weddingConfig } from "../../config/wedding";
import { Sparkles } from "lucide-react";

export function OpeningVideo({ onComplete }: { onComplete: () => void }) {
  const [isLoadingAssets, setIsLoadingAssets] = useState(true);
  const [showNames, setShowNames] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Preloader fallback safety timeout
  useEffect(() => {
    const preloaderTimer = setTimeout(() => {
      setIsLoadingAssets(false);
    }, 1800);

    return () => clearTimeout(preloaderTimer);
  }, []);

  // Video duration listener for timing the 2-3s fade before video end
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const remaining = video.duration - video.currentTime;
    
    // Begin fading in names 3.2 seconds before video ends
    if (remaining <= 3.5 && !showNames) {
      setShowNames(true);
    }
    
    // Show "Begin Our Journey" button 1.5 seconds before end
    if (remaining <= 1.8 && !showButton) {
      setShowButton(true);
    }
  };

  const handleVideoLoaded = () => {
    setIsLoadingAssets(false);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleVideoEnded = () => {
    setShowNames(true);
    setShowButton(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-maroon-900 flex items-center justify-center overflow-hidden"
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Preloader Phase */}
        <AnimatePresence>
          {isLoadingAssets && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-50 bg-maroon-900 flex flex-col items-center justify-center p-4 text-center"
            >
              {/* Royal Gold Monogram Crest */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-gold-500/60 flex items-center justify-center p-2 mb-6 relative shadow-[0_0_30px_rgba(212,175,55,0.4)] animate-pulse">
                <div className="absolute inset-1 border border-gold-500/30 rounded-full" />
                <span className="font-script text-3xl sm:text-5xl text-gold-400 font-bold tracking-wider">
                  {weddingConfig.bride.name[0]} & {weddingConfig.groom.name[0]}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-gold-400 animate-spin" />
                <span className="font-display text-xs sm:text-sm text-gold-400 tracking-[0.3em] uppercase font-semibold">
                  Preparing Royal Celebration
                </span>
                <Sparkles className="w-4 h-4 text-gold-400 animate-spin" />
              </div>

              {/* Loader Bar */}
              <div className="w-48 h-1 bg-maroon-800 rounded-full overflow-hidden border border-gold-500/20">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="w-full h-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Element playing underneath */}
        <video
          ref={videoRef}
          src={weddingConfig.video.opening}
          className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-1000"
          autoPlay
          muted
          playsInline
          onLoadedData={handleVideoLoaded}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          onError={() => {
            setIsLoadingAssets(false);
            setShowNames(true);
            setShowButton(true);
          }}
        />

        {/* Dark Vignette Overlay over video for maximum text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/70 pointer-events-none z-10" />

        {/* Couple Names Overlay (Fades in over playing video) */}
        <div className="relative z-20 text-center flex flex-col items-center justify-center h-full max-w-5xl px-4 sm:px-6 my-auto">
          <AnimatePresence>
            {showNames && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 2, ease: [0.25, 1, 0.5, 1] }}
                className="space-y-4 sm:space-y-6 flex flex-col items-center"
              >
                <span className="text-gold-400 font-display tracking-[0.35em] uppercase text-xs sm:text-sm font-semibold block drop-shadow-md">
                  Together With Their Families
                </span>

                <h1 className="font-script text-5xl xs:text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] text-gold-400 leading-[1.05] sm:leading-none font-bold tracking-wide drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)] shadow-gold-500/20">
                  {weddingConfig.bride.name}{" "}
                  <span className="text-3xl sm:text-5xl md:text-7xl text-ivory-100 font-display mx-2 sm:mx-4 inline-block italic font-light drop-shadow-lg">
                    &
                  </span>{" "}
                  {weddingConfig.groom.name}
                </h1>

                <div className="w-24 sm:w-36 h-[1.5px] bg-gradient-to-r from-transparent via-gold-400 to-transparent my-2 opacity-80" />

                <p className="font-display text-xs sm:text-lg md:text-xl text-ivory-100 tracking-[0.25em] uppercase font-semibold drop-shadow-md">
                  {new Date(weddingConfig.weddingDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>

                <p className="font-script text-lg sm:text-2xl md:text-3xl text-ivory-200/90 max-w-2xl mx-auto px-4 italic font-normal drop-shadow-md">
                  "{weddingConfig.quote}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showButton && (
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="mt-8 sm:mt-12"
              >
                <button
                  onClick={onComplete}
                  className="px-8 sm:px-14 py-3.5 sm:py-4 bg-gold-500/20 border-2 border-gold-400 text-gold-400 hover:bg-gold-500 hover:text-maroon-900 transition-all duration-500 font-display font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm backdrop-blur-md rounded-full shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.8)] hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Begin Our Journey
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
