import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, RefreshCw, Crown } from "lucide-react";
import { triggerPartyPopper } from "./PartyPopper";
import { weddingConfig } from "../config/wedding";

interface ScratchCardProps {
  title?: string;
  dateText?: string;
  blessingText?: string;
}

export function ScratchCard({
  title = weddingConfig.scratchCard?.title || "Scratch to Reveal the Wedding Date",
  dateText = weddingConfig.scratchCard?.dateText || "November 20, 2026 • Jaipur, Rajasthan",
  blessingText = weddingConfig.scratchCard?.blessingText || "You are cordially invited to witness our royal union!",
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const hasFiredConfettiRef = useRef(false);
  const lastVibrateTimeRef = useRef(0);

  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  // Setup Metallic Gold Foil Texture with procedural shimmer
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    canvas.width = rect.width;
    canvas.height = rect.height;

    // Reset composite operation to normal draw
    ctx.globalCompositeOperation = "source-over";

    // 1. Rich Metallic Gold Foil Gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#B8860B"); // Dark Goldenrod
    gradient.addColorStop(0.2, "#FFD700"); // Gold
    gradient.addColorStop(0.4, "#FFF8DC"); // Cornsilk highlight
    gradient.addColorStop(0.6, "#D4AF37"); // Metallic Gold
    gradient.addColorStop(0.8, "#AA7C11"); // Rich Dark Gold
    gradient.addColorStop(1, "#5C0A0A"); // Deep Maroon Edge

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Subtle Micro Foil Grain Pattern
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    for (let i = 0; i < canvas.width; i += 6) {
      for (let j = 0; j < canvas.height; j += 6) {
        if ((i + j) % 12 === 0) {
          ctx.fillRect(i, j, 3, 3);
        }
      }
    }

    // 3. Shimmer Metallic Diagonal Streaks
    const shimmerGrad = ctx.createLinearGradient(0, 0, canvas.width, 0);
    shimmerGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
    shimmerGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.3)");
    shimmerGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = shimmerGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 4. Gold Ornate Border Frame
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 8;
    ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

    ctx.strokeStyle = "#5C0A0A";
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    // 5. Center Scratch Text Prompt with drop shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 2;
    ctx.fillStyle = "#4A0404";
    ctx.font = "bold 15px 'Playfair Display', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✨ SCRATCH WITH CURSOR OR FINGER TO REVEAL ✨", canvas.width / 2, canvas.height / 2);

    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
  }, [isRevealed]);

  useEffect(() => {
    setupCanvas();
    window.addEventListener("resize", setupCanvas);
    return () => window.removeEventListener("resize", setupCanvas);
  }, [setupCanvas]);

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++;
    }

    const percentage = (transparentPixels / (pixels.length / 4)) * 100;
    if (percentage > 35) {
      handleReveal();
    }
  };

  const triggerVibration = () => {
    const now = Date.now();
    if (now - lastVibrateTimeRef.current > 70) {
      if (typeof window !== "undefined" && "vibrate" in navigator) {
        try {
          navigator.vibrate(12);
        } catch {
          // Ignore vibrate restrictions
        }
      }
      lastVibrateTimeRef.current = now;
    }
  };

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 44;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    if (lastPosRef.current) {
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(x, y);
    } else {
      ctx.arc(x, y, 22, 0, Math.PI * 2);
    }
    ctx.stroke();

    lastPosRef.current = { x, y };

    triggerVibration();
    checkScratchPercentage();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsScratching(true);
    lastPosRef.current = null;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isScratching) {
      scratch(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsScratching(false);
    lastPosRef.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      setIsScratching(true);
      lastPosRef.current = null;
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isScratching && e.touches.length > 0) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    setIsScratching(false);
    lastPosRef.current = null;
  };

  const handleReveal = () => {
    if (isRevealed) return;
    setIsRevealed(true);
    if (!hasFiredConfettiRef.current) {
      hasFiredConfettiRef.current = true;
      triggerPartyPopper();
    }
  };

  const resetCard = () => {
    hasFiredConfettiRef.current = false;
    setIsRevealed(false);
    setTimeout(() => {
      setupCanvas();
    }, 100);
  };

  return (
    <div className="w-full max-w-xl mx-auto my-10 px-4">
      {/* Featured Luxury Glass Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative bg-maroon-900/80 backdrop-blur-lg border-2 border-gold-500/50 rounded-2xl p-6 mb-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden group"
      >
        {/* Golden Shimmer Accent Top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500" />

        {/* Decorative Corner Ornaments */}
        <div className="absolute top-2 left-2 text-gold-400/40 text-xs pointer-events-none">❖</div>
        <div className="absolute top-2 right-2 text-gold-400/40 text-xs pointer-events-none">❖</div>
        <div className="absolute bottom-2 left-2 text-gold-400/40 text-xs pointer-events-none">❖</div>
        <div className="absolute bottom-2 right-2 text-gold-400/40 text-xs pointer-events-none">❖</div>

        <div className="flex items-center justify-center gap-2 mb-2">
          <Crown className="w-5 h-5 text-gold-400" />
          <span className="text-gold-400 font-display tracking-[0.3em] uppercase text-xs font-semibold">
            Interactive Invitation Card
          </span>
          <Crown className="w-5 h-5 text-gold-400" />
        </div>

        <h3 className="font-display text-2xl sm:text-3xl text-ivory-100 font-bold tracking-wide drop-shadow">
          {isRevealed
            ? weddingConfig.scratchCard?.revealedTitle || "Date & Details Revealed!"
            : title}
        </h3>

        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-3" />
      </motion.div>

      {/* Foil Scratch Card Container */}
      <div
        ref={containerRef}
        className="relative min-h-[220px] w-full rounded-2xl overflow-hidden border-2 border-gold-500/60 shadow-[0_15px_40px_rgba(0,0,0,0.9)] bg-ivory-100 flex items-center justify-center select-none"
      >
        {/* Revealed Content Behind Scratch Layer */}
        <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center bg-gradient-to-b from-maroon-900 via-maroon-800 to-maroon-900 border border-gold-500/30">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-3"
          >
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span className="text-gold-400 font-display text-xs tracking-[0.2em] uppercase font-semibold">
                Save The Date
              </span>
              <Sparkles className="w-4 h-4 text-gold-400" />
            </div>

            <p className="font-script text-4xl sm:text-5xl text-gold-400 font-bold drop-shadow">
              {weddingConfig.bride.name} & {weddingConfig.groom.name}
            </p>

            <p className="font-display text-lg sm:text-2xl text-ivory-100 tracking-wider uppercase font-semibold border-y border-gold-500/30 py-2 my-1">
              {dateText}
            </p>

            <p className="text-xs sm:text-sm text-ivory-200/90 font-sans italic max-w-md mx-auto">
              "{blessingText}"
            </p>
          </motion.div>
        </div>

        {/* Scratch Canvas Overlay */}
        <AnimatePresence>
          {!isRevealed && (
            <motion.canvas
              ref={canvasRef}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.8 }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="absolute inset-0 cursor-crosshair touch-none z-10 w-full h-full"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Quick Reveal / Reset Actions */}
      <div className="flex justify-center items-center gap-4 mt-5">
        {!isRevealed ? (
          <button
            onClick={handleReveal}
            className="px-5 py-2 rounded-full bg-maroon-900/60 border border-gold-500/40 text-gold-400 text-xs font-display tracking-widest uppercase hover:bg-gold-500 hover:text-maroon-900 transition-all duration-300 shadow-md cursor-pointer"
          >
            Quick Reveal
          </button>
        ) : (
          <button
            onClick={resetCard}
            className="px-5 py-2 rounded-full bg-maroon-900/60 border border-gold-500/40 text-gold-400 text-xs font-display tracking-widest uppercase hover:bg-gold-500 hover:text-maroon-900 flex items-center gap-2 transition-all duration-300 shadow-md cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Scratch Again
          </button>
        )}
      </div>
    </div>
  );
}
