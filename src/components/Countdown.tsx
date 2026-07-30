import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { weddingConfig } from "../config/wedding";
import { Clock, Sparkles } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const targetDate = new Date(weddingConfig.weddingDate).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    setIsLoaded(true);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  if (!isLoaded) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-2xl mx-auto my-8 px-4"
    >
      {/* Header Badge */}
      <div className="flex items-center justify-center gap-2 mb-4 text-center">
        <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
        <span className="text-gold-400 font-display tracking-[0.25em] uppercase text-xs font-semibold">
          Countdown to the Royal Celebration
        </span>
        <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
      </div>

      {/* Glassmorphism Card Container */}
      <div className="relative bg-maroon-900/60 backdrop-blur-md border border-gold-500/40 rounded-2xl p-4 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Outer Gold Filigree Lines */}
        <div className="absolute inset-1.5 border border-gold-500/20 rounded-xl pointer-events-none" />

        <div className="grid grid-cols-4 gap-2 sm:gap-4 relative z-10">
          {timeBlocks.map((block) => (
            <div key={block.label} className="flex flex-col items-center">
              <div className="w-full bg-black/40 border border-gold-500/30 rounded-xl py-3 sm:py-4 px-1 text-center shadow-inner relative group hover:border-gold-500/60 transition-colors">
                <span className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gold-400 drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)] tracking-tight block">
                  {String(block.value).padStart(2, "0")}
                </span>
                <span className="text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-ivory-200/80 font-medium mt-1 block">
                  {block.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
