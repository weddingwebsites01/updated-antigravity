import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Sparkles, RefreshCw } from "lucide-react";
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
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setupCanvas = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      canvas.width = rect.width;
      canvas.height = rect.height;

      // Draw Gold Metallic Scratch Surface
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#D4AF37");
      gradient.addColorStop(0.3, "#F3E5AB");
      gradient.addColorStop(0.5, "#AA7C11");
      gradient.addColorStop(0.8, "#D4AF37");
      gradient.addColorStop(1, "#800000");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle pattern overlay
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      for (let i = 0; i < canvas.width; i += 8) {
        for (let j = 0; j < canvas.height; j += 8) {
          if ((i + j) % 16 === 0) {
            ctx.fillRect(i, j, 4, 4);
          }
        }
      }

      // Border
      ctx.strokeStyle = "#800000";
      ctx.lineWidth = 6;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      // Scratch Prompt Text
      ctx.fillStyle = "#5C0A0A";
      ctx.font = "bold 14px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("✨ SCRATCH HERE WITH CURSOR/FINGER ✨", canvas.width / 2, canvas.height / 2);
    };

    setupCanvas();
    window.addEventListener("resize", setupCanvas);
    return () => window.removeEventListener("resize", setupCanvas);
  }, [isRevealed]);

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
    if (percentage > 40) {
      handleReveal();
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
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    checkScratchPercentage();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isScratching) {
      scratch(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = () => setIsScratching(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      setIsScratching(true);
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isScratching && e.touches.length > 0) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => setIsScratching(false);

  const handleReveal = () => {
    if (isRevealed) return;
    setIsRevealed(true);
    triggerPartyPopper();
  };

  const resetCard = () => {
    setIsRevealed(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto my-12 px-4">
      <div className="text-center mb-4">
        <span className="text-gold-500 font-medium tracking-[0.25em] uppercase text-xs flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-gold-500" />
          Interactive Reveal
          <Sparkles className="w-4 h-4 text-gold-500" />
        </span>
        <h3 className="font-display text-2xl md:text-3xl text-maroon-900 mt-1">
          {isRevealed ? weddingConfig.scratchCard?.revealedTitle || "Date & Details Revealed!" : title}
        </h3>
      </div>

      <div
        ref={containerRef}
        className="relative min-h-[180px] w-full rounded-xl overflow-hidden border-2 border-gold-500/40 shadow-2xl bg-ivory-100 flex items-center justify-center select-none"
      >
        {/* Revealed Content Behind Scratch Layer */}
        <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center bg-gradient-to-b from-ivory-100 to-ivory-300">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-2"
          >
            <p className="font-script text-4xl md:text-5xl text-maroon-900">
              {weddingConfig.bride.name} & {weddingConfig.groom.name}
            </p>
            <p className="font-display text-lg md:text-2xl text-gold-500 tracking-wider uppercase font-semibold">
              {dateText}
            </p>
            <p className="text-sm text-maroon-900/80 font-sans italic max-w-md mx-auto">
              "{blessingText}"
            </p>
          </motion.div>
        </div>

        {/* Scratch Canvas Overlay */}
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="absolute inset-0 cursor-pointer touch-none z-10 w-full h-full"
          />
        )}
      </div>

      <div className="flex justify-center items-center gap-4 mt-4">
        {!isRevealed ? (
          <button
            onClick={handleReveal}
            className="text-xs font-display tracking-widest uppercase text-maroon-900 hover:text-gold-500 underline transition-colors"
          >
            Quick Reveal
          </button>
        ) : (
          <button
            onClick={resetCard}
            className="text-xs font-display tracking-widest uppercase text-maroon-900 hover:text-gold-500 flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-3 h-3" /> Scratch Again
          </button>
        )}
      </div>
    </div>
  );
}
