import { motion } from "motion/react";
import { useScroll } from "../hooks/useScroll";
import { cn } from "../lib/utils";
import { Music, Menu, X, Moon } from "lucide-react";
import { useState } from "react";
import { weddingConfig } from "../config/wedding";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Story", href: "#story" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Family", href: "#family" },
  { label: "Venue", href: "#venue" },
];

export function Navigation() {
  const scrolled = useScroll();
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    // Real implementation would interact with an audio element
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled 
            ? "bg-ivory-200/95 backdrop-blur-md py-3 shadow-md border-b border-gold-500/20" 
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 sm:py-6"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          <a 
            href="#" 
            className={cn(
              "font-script text-xl sm:text-2xl tracking-wider font-semibold transition-colors",
              scrolled ? "text-maroon-900" : "text-gold-400 drop-shadow"
            )}
          >
            {weddingConfig.bride.name} & {weddingConfig.groom.name}
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "text-xs sm:text-sm font-medium tracking-widest uppercase transition-colors hover:text-gold-500",
                  scrolled ? "text-maroon-900" : "text-ivory-100"
                )}
              >
                {item.label}
              </a>
            ))}
            
            <div className={cn(
              "flex items-center space-x-4 ml-8 border-l pl-8 transition-colors",
              scrolled ? "border-maroon-900/20" : "border-gold-400/30"
            )}>
              <button 
                onClick={toggleMusic} 
                className={cn(
                  "transition-colors hover:text-gold-500",
                  scrolled ? "text-maroon-900" : "text-gold-400"
                )}
                aria-label="Toggle Music"
              >
                <Music size={18} className={cn(isPlaying && "animate-pulse text-gold-500")} />
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={cn(
              "md:hidden p-2 rounded-lg transition-colors",
              scrolled ? "text-maroon-900" : "text-gold-400"
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Mobile Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 bg-ivory-200 flex flex-col items-center justify-center space-y-8"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-display text-maroon-900 hover:text-gold-500 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </motion.div>
      )}
    </>
  );
}
