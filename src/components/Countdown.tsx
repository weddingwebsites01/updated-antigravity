import { useState, useEffect } from "react";
import { weddingConfig } from "../config/wedding";
import { Sparkles } from "lucide-react";

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
    <div className="w-full max-w-2xl mx-auto my-6 px-4">
      {/* Header Badge */}
      <div className="flex items-center justify-center gap-2 mb-3 text-center">
        <Sparkles className="w-4 h-4 text-gold-400" />
        <span className="text-gold-400 font-display tracking-[0.25em] uppercase text-xs font-semibold">
          Countdown to the Royal Celebration
        </span>
        <Sparkles className="w-4 h-4 text-gold-400" />
      </div>

      {/* Solid Maroon Container without backdrop-blur */}
      <div className="relative bg-maroon-900 border border-gold-500/40 rounded-2xl p-4 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.6)] overflow-hidden">
        <div className="absolute inset-1.5 border border-gold-500/20 rounded-xl pointer-events-none" />

        <div className="grid grid-cols-4 gap-2 sm:gap-4 relative z-10">
          {timeBlocks.map((block) => (
            <div key={block.label} className="flex flex-col items-center">
              <div className="w-full bg-black/40 border border-gold-500/30 rounded-xl py-3 sm:py-4 px-1 text-center shadow-inner relative">
                <span className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gold-400 tracking-tight block">
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
    </div>
  );
}
