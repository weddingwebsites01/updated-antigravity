import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { weddingConfig } from "../../config/wedding";

export function OpeningVideo({ onComplete }: { onComplete: () => void }) {
  const [showButton, setShowButton] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Fallback in case video fails to load or autoplay is blocked
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!videoEnded) {
        setVideoEnded(true);
        setShowButton(true);
      }
    }, 15000); // Max 15s fallback
    
    return () => clearTimeout(timer);
  }, [videoEnded]);

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-[100] bg-maroon-900 flex items-center justify-center overflow-hidden"
        exit={{ opacity: 0, y: "-100%" }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
      >
        
        <video 
          ref={videoRef}
          src={weddingConfig.video.opening}
          className="absolute inset-0 w-full h-full object-cover opacity-100"
          autoPlay
          muted
          playsInline
          onEnded={() => {
            setVideoEnded(true);
            setShowButton(true);
          }}
          onError={() => {
            setVideoEnded(true);
            setShowButton(true);
          }}
        />

        {videoEnded && (
          <div className="relative z-20 text-center flex flex-col items-center justify-center h-full max-w-4xl px-4 sm:px-6 my-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
              className="space-y-4"
            >
              <h1 className="font-script text-4xl xs:text-5xl sm:text-7xl md:text-9xl text-gold-400 mb-4 sm:mb-6 drop-shadow-lg leading-tight">
                {weddingConfig.bride.name} <span className="text-2xl sm:text-4xl md:text-6xl text-white mx-2 sm:mx-4">&</span> {weddingConfig.groom.name}
              </h1>
              <p className="font-display text-sm sm:text-xl md:text-2xl text-ivory-100 tracking-[0.2em] uppercase mb-6 sm:mb-12">
                {new Date(weddingConfig.weddingDate).toLocaleDateString('en-US', { 
                  month: 'long', day: 'numeric', year: 'numeric' 
                })}
              </p>
              <p className="font-script text-lg sm:text-2xl md:text-3xl text-ivory-200 mb-8 sm:mb-16 opacity-80 max-w-2xl mx-auto px-2">
                "{weddingConfig.quote}"
              </p>
            </motion.div>

            <AnimatePresence>
              {showButton && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  onClick={onComplete}
                  className="px-8 sm:px-12 py-3 sm:py-4 border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-maroon-900 transition-all duration-500 font-medium tracking-[0.15em] uppercase text-xs sm:text-sm backdrop-blur-sm rounded-full shadow-2xl mt-4"
                >
                  Begin Our Journey
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
