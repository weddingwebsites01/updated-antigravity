import confetti from "canvas-confetti";
import { Sparkles } from "lucide-react";

export function triggerPartyPopper() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ["#D4AF37", "#800000", "#F3E5AB", "#FFFAF0", "#E6C200", "#990000"],
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

export function PartyPopperButton() {
  return (
    <button
      onClick={() => triggerPartyPopper()}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-maroon-900 text-gold-400 border-2 border-gold-400/60 shadow-2xl hover:scale-105 hover:bg-gold-500 hover:text-maroon-900 active:scale-95 transition-all duration-300 p-2.5 sm:p-3 md:px-5 md:py-3 rounded-full flex items-center space-x-2 group backdrop-blur-md"
      title="Pop Party Poppers!"
      aria-label="Party Popper"
    >
      <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
      <span className="hidden md:inline font-display text-xs tracking-widest uppercase font-semibold">
        Pop Confetti 🎉
      </span>
    </button>
  );
}
