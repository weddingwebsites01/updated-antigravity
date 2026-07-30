import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { weddingConfig } from "../../config/wedding";
import { ScratchCard } from "../ScratchCard";
import { Countdown } from "../Countdown";
import { triggerPartyPopper } from "../PartyPopper";
import { Sparkles, ChevronDown } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bannerScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const bannerY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-[100dvh] flex flex-col items-center justify-between overflow-hidden bg-black pt-24 pb-12 sm:pt-28 sm:pb-16 px-4"
    >
      {/* Responsive Banner Image with Scroll Parallax & Zoom */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <motion.img
          style={{ scale: bannerScale, y: bannerY }}
          src={weddingConfig.heroBannerImage}
          alt="Royal Wedding Banner"
          className="w-full h-full object-cover object-[center_30%] filter brightness-[0.85] contrast-[1.15]"
        />
        {/* Subtle royal gradient vignette & gold inner frame */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/65 to-black/95" />
        <div className="absolute inset-3 sm:inset-6 md:inset-8 border border-gold-500/30 pointer-events-none rounded-none" />
      </div>

      <div className="container mx-auto px-2 sm:px-6 relative z-10 text-center flex flex-col items-center max-w-5xl my-auto">
        {/* Header Invitation Taglines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-2 mb-3 sm:mb-4"
        >
          <span className="text-gold-400 font-display tracking-[0.3em] uppercase text-xs sm:text-sm font-semibold block drop-shadow-md">
            Together With Their Families
          </span>
          <span className="text-ivory-200/90 font-sans tracking-[0.2em] uppercase text-[10px] sm:text-xs block">
            Cordially Invite You To Celebrate The Royal Wedding Of
          </span>
        </motion.div>

        {/* Couple Names Overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
          className="my-2 sm:my-4 w-full flex flex-col items-center justify-center px-2"
        >
          <h1 className="font-script text-5xl xs:text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] text-gold-400 leading-[1.05] sm:leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] tracking-wide font-bold">
            {weddingConfig.bride.name}
          </h1>
          <div className="text-2xl sm:text-4xl md:text-5xl text-ivory-100 font-display my-1 sm:-my-3 italic relative z-20 drop-shadow-md">
            &
          </div>
          <h1 className="font-script text-5xl xs:text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] text-gold-400 leading-[1.05] sm:leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] tracking-wide font-bold">
            {weddingConfig.groom.name}
          </h1>
        </motion.div>

        {/* Wedding Date & Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-1 mb-4 text-center"
        >
          <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-3 opacity-80" />
          <p className="font-display tracking-[0.2em] text-gold-400 uppercase text-xs sm:text-base font-semibold drop-shadow-md">
            {new Date(weddingConfig.weddingDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p className="mt-1 text-ivory-200/95 tracking-wider text-xs sm:text-sm font-light">
            {weddingConfig.venueLocation.name} • {weddingConfig.venueLocation.address}
          </p>
          <p className="mt-1 text-gold-500/90 tracking-widest text-[11px] uppercase font-mono">
            {weddingConfig.hashtag}
          </p>
        </motion.div>

        {/* Party Popper Action Button (View Invitation removed as requested) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center my-3"
        >
          <button
            onClick={() => triggerPartyPopper()}
            className="px-8 sm:px-10 py-3 bg-maroon-900/80 text-gold-400 border border-gold-400/60 hover:bg-gold-500 hover:text-maroon-900 transition-all duration-300 font-display font-semibold tracking-[0.2em] uppercase text-xs rounded-full shadow-[0_0_25px_rgba(212,175,55,0.3)] flex items-center gap-2 group backdrop-blur-md cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-gold-400 group-hover:text-maroon-900 transition-colors" />
            Pop Party Poppers 🎉
          </button>
        </motion.div>

        {/* Live Countdown Timer */}
        <Countdown />

        {/* Scratch Card for Interactive Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full max-w-xl mx-auto"
        >
          <ScratchCard />
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 mt-4 flex flex-col items-center pointer-events-none"
      >
        <a href="#story" className="pointer-events-auto flex flex-col items-center group">
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold-400/90 mb-1 group-hover:text-gold-400 transition-colors font-medium">
            Scroll To Explore
          </span>
          <ChevronDown className="w-5 h-5 text-gold-400 group-hover:translate-y-1 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
}
