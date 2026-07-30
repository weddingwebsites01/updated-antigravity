import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { weddingConfig } from "../../config/wedding";
import { Play } from "lucide-react";

export function OpeningVideo({ onComplete }: { onComplete: () => void }) {
  const [showNames, setShowNames] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [needsTouchToStart, setNeedsTouchToStart] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try starting video and background music simultaneously
    const startMedia = async () => {
      try {
        await video.play();
      } catch {
        // Autoplay restricted by browser; prompt user to tap once to start audio+video together
        setNeedsTouchToStart(true);
      }
    };

    startMedia();
  }, []);

  const handleStartInteraction = () => {
    setNeedsTouchToStart(false);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const remaining = video.duration - video.currentTime;

    // Begin fading in couple names 3.5s before video ends over active video backdrop
    if (remaining <= 3.5 && !showNames) {
      setShowNames(true);
    }

    // Show "Begin Our Journey" button 1.8s before video ends
    if (remaining <= 1.8 && !showButton) {
      setShowButton(true);
    }
  };

  const handleVideoEnded = () => {
    setShowNames(true);
    setShowButton(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
        exit={{ opacity: 0, scale: 1.03 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Video Element playing at 100% full brightness (BLACK OVERLAY REMOVED) */}
        <video
          ref={videoRef}
          src={weddingConfig.video.opening}
          className="absolute inset-0 w-full h-full object-cover opacity-100"
          autoPlay
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          onError={handleVideoEnded}
        />

        {/* User Interaction Overlay if Browser blocks sound/video autoplay */}
        {needsTouchToStart && (
          <div
            onClick={handleStartInteraction}
            className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center cursor-pointer p-4 text-center"
          >
            <div className="w-20 h-20 rounded-full border-2 border-gold-400 flex items-center justify-center mb-4 bg-maroon-900/80 shadow-[0_0_30px_rgba(212,175,55,0.6)] animate-pulse">
              <Play className="w-8 h-8 text-gold-400 ml-1" />
            </div>
            <p className="font-display text-gold-400 tracking-[0.2em] uppercase text-sm font-semibold">
              Tap To Experience Royal Invitation
            </p>
            <p className="text-xs text-ivory-200/80 font-sans mt-1">
              (Plays Music & Video Together)
            </p>
          </div>
        )}

        {/* Couple Names Overlay (Fades in over playing video) */}
        <div className="relative z-20 text-center flex flex-col items-center justify-center h-full max-w-5xl px-4 sm:px-6 my-auto pointer-events-none">
          <AnimatePresence>
            {showNames && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                className="space-y-4 sm:space-y-6 flex flex-col items-center pointer-events-auto"
              >
                <span className="text-gold-400 font-display tracking-[0.35em] uppercase text-xs sm:text-sm font-bold block drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]">
                  Together With Their Families
                </span>

                <h1 className="font-script text-5xl xs:text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] text-gold-400 leading-[1.05] sm:leading-none font-bold tracking-wide drop-shadow-[0_6px_30px_rgba(0,0,0,0.95)]">
                  {weddingConfig.bride.name}{" "}
                  <span className="text-3xl sm:text-5xl md:text-7xl text-ivory-100 font-display mx-2 sm:mx-4 inline-block italic font-light drop-shadow-md">
                    &
                  </span>{" "}
                  {weddingConfig.groom.name}
                </h1>

                <div className="w-24 sm:w-36 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent my-2" />

                <p className="font-display text-xs sm:text-lg md:text-xl text-ivory-100 tracking-[0.25em] uppercase font-bold drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]">
                  {new Date(weddingConfig.weddingDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>

                <p className="font-script text-lg sm:text-2xl md:text-3xl text-ivory-100 max-w-2xl mx-auto px-4 italic font-normal drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]">
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
                transition={{ duration: 1, delay: 0.2 }}
                className="mt-8 sm:mt-12 pointer-events-auto"
              >
                <button
                  onClick={onComplete}
                  className="px-8 sm:px-14 py-3.5 sm:py-4 bg-maroon-900/90 border-2 border-gold-400 text-gold-400 hover:bg-gold-500 hover:text-maroon-900 transition-all duration-300 font-display font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm backdrop-blur-md rounded-full shadow-[0_0_35px_rgba(212,175,55,0.6)] hover:scale-105 active:scale-95 cursor-pointer"
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
