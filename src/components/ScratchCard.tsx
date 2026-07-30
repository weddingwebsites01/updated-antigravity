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

  // High Quality Metallic Gold Foil Cover
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    ctx.globalCompositeOperation = "source-over";

    // 1. Rich Metallic Gold Gradient
    const linearGrad = ctx.createLinearGradient(0, 0, w, h);
    linearGrad.addColorStop(0, "#8B6508");
    linearGrad.addColorStop(0.25, "#FFD700");
    linearGrad.addColorStop(0.5, "#FFF8DC");
    linearGrad.addColorStop(0.75, "#D4AF37");
    linearGrad.addColorStop(1, "#5C0A0A");

    ctx.fillStyle = linearGrad;
    ctx.fillRect(0, 0, w, h);

    // 2. Radial Specular Glow
    const radialGrad = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, w / 1.4);
    radialGrad.addColorStop(0, "rgba(255, 255, 220, 0.45)");
    radialGrad.addColorStop(0.6, "rgba(212, 175, 55, 0.15)");
    radialGrad.addColorStop(1, "rgba(0, 0, 0, 0.25)");
    ctx.fillStyle = radialGrad;
    ctx.fillRect(0, 0, w, h);

    // 3. Filigree Pattern
    ctx.strokeStyle = "rgba(255, 215, 0, 0.15)";
    ctx.lineWidth = 1;
    const size = 24;
    for (let x = 0; x < w + size; x += size) {
      for (let y = 0; y < h + size; y += size) {
        ctx.beginPath();
        ctx.moveTo(x, y - size / 2);
        ctx.lineTo(x + size / 2, y);
        ctx.lineTo(x, y + size / 2);
        ctx.lineTo(x - size / 2, y);
        ctx.closePath();
        ctx.stroke();
      }
    }

    // 4. Gold Borders
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 4;
    ctx.strokeRect(6, 6, w - 12, h - 12);

    ctx.strokeStyle = "rgba(74, 4, 4, 0.7)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(11, 11, w - 22, h - 22);

    // 5. Center Seal
    const sealR = Math.min(w, h) * 0.22;
    ctx.save();
    ctx.translate(w / 2, h / 2);

    ctx.fillStyle = "#5C0A0A";
    ctx.beginPath();
    ctx.arc(0, 0, sealR, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, 0, sealR - 3, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "#FFD700";
    ctx.font = `${Math.round(sealR * 0.55)}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("👑", 0, -sealR * 0.16);

    ctx.fillStyle = "#FFF8DC";
    ctx.font = `bold ${Math.round(sealR * 0.3)}px 'Great Vibes', cursive`;
    ctx.fillText(`${weddingConfig.bride.name} & ${weddingConfig.groom.name}`, 0, sealR * 0.38);

    ctx.restore();

    // 6. Scratch Prompt Pill
    const bannerW = Math.min(w * 0.75, 270);
    const bannerH = 32;
    const bannerX = (w - bannerW) / 2;
    const bannerY = h / 2 + sealR + 10;

    if (bannerY + bannerH < h - 14) {
      ctx.save();
      ctx.fillStyle = "#5C0A0A";
      ctx.strokeStyle = "#FFD700";
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.roundRect(bannerX, bannerY, bannerW, bannerH, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#FFD700";
      ctx.font = "bold 11px 'Playfair Display', serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("✨ SCRATCH HERE TO REVEAL ✨", w / 2, bannerY + bannerH / 2);
      ctx.restore();
    }
  }, [isRevealed]);

  useEffect(() => {
    setupCanvas();
    window.addEventListener("resize", setupCanvas, { passive: true });
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

    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] === 0) transparentPixels++;
    }

    const percentage = (transparentPixels / (pixels.length / 16)) * 100;
    // Easily scratchable threshold (18%)
    if (percentage > 18) {
      handleReveal();
    }
  };

  const triggerVibration = () => {
    const now = Date.now();
    if (now - lastVibrateTimeRef.current > 70) {
      if (typeof window !== "undefined" && "vibrate" in navigator) {
        try {
          navigator.vibrate(10);
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
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const x = (clientX - rect.left) * dpr;
    const y = (clientY - rect.top) * dpr;

    ctx.globalCompositeOperation = "destination-out";
    // Extra thick scratch stroke for effortless scratchability (75px)
    ctx.lineWidth = 75 * dpr;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    if (lastPosRef.current) {
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(x, y);
    } else {
      ctx.arc(x, y, 38 * dpr, 0, Math.PI * 2);
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
      // Party popper confetti explosion upon scratch card reveal
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
    <div className="w-full max-w-xl mx-auto my-8 px-4">
      {/* Featured Glass Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative bg-maroon-900/85 backdrop-blur-md border-2 border-gold-500/50 rounded-2xl p-5 sm:p-6 mb-5 text-center shadow-[0_10px_35px_rgba(0,0,0,0.8)] overflow-hidden group"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500" />

        <div className="flex items-center justify-center gap-2 mb-2">
          <Crown className="w-5 h-5 text-gold-400" />
          <span className="text-gold-400 font-display tracking-[0.3em] uppercase text-xs font-semibold">
            Interactive Royal Invitation
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
        className="relative min-h-[230px] sm:min-h-[250px] w-full rounded-2xl overflow-hidden border-2 border-gold-500/60 shadow-[0_15px_45px_rgba(0,0,0,0.9)] bg-maroon-900 flex items-center justify-center select-none"
      >
        {/* Revealed Content Behind Scratch Layer */}
        <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center bg-gradient-to-b from-maroon-900 via-maroon-800 to-maroon-900 border border-gold-500/40">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
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

            <p className="font-display text-lg sm:text-2xl text-ivory-100 tracking-wider uppercase font-semibold border-y border-gold-500/40 py-2 my-1">
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
              transition={{ duration: 0.6 }}
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
      <div className="flex justify-center items-center gap-4 mt-4">
        {!isRevealed ? (
          <button
            onClick={handleReveal}
            className="px-6 py-2.5 rounded-full bg-maroon-900/80 border border-gold-500/50 text-gold-400 text-xs font-display tracking-widest uppercase hover:bg-gold-500 hover:text-maroon-900 transition-all duration-300 shadow-md cursor-pointer font-semibold"
          >
            Quick Reveal
          </button>
        ) : (
          <button
            onClick={resetCard}
            className="px-6 py-2.5 rounded-full bg-maroon-900/80 border border-gold-500/50 text-gold-400 text-xs font-display tracking-widest uppercase hover:bg-gold-500 hover:text-maroon-900 flex items-center gap-2 transition-all duration-300 shadow-md cursor-pointer font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Scratch Again
          </button>
        )}
      </div>
    </div>
  );
}
