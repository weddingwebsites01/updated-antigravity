import { motion, AnimatePresence } from "motion/react";
import { useScroll } from "../hooks/useScroll";
import { cn } from "../lib/utils";
import { Menu, X, Crown } from "lucide-react";
import { useState, useEffect } from "react";
import { weddingConfig } from "../config/wedding";

const navItems = [
  { id: "home", label: "Home", href: "#home" },
  { id: "story", label: "Story", href: "#story" },
  { id: "events", label: "Events", href: "#events" },
  { id: "gallery", label: "Gallery", href: "#gallery" },
  { id: "family", label: "Family", href: "#family" },
  { id: "venue", label: "Venue", href: "#venue" },
];

export function Navigation() {
  const scrolled = useScroll();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track active section via IntersectionObserver
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-maroon-900/90 backdrop-blur-md py-3 shadow-[0_4px_20px_rgba(0,0,0,0.6)] border-b border-gold-500/30"
            : "bg-gradient-to-b from-black/85 via-black/40 to-transparent py-4 sm:py-6"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          <a
            href="#home"
            className="font-script text-2xl sm:text-3xl tracking-wider font-bold text-gold-400 drop-shadow-md flex items-center gap-2"
          >
            <Crown className="w-5 h-5 text-gold-400 hidden xs:inline-block" />
            {weddingConfig.bride.name} & {weddingConfig.groom.name}
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "relative py-1 text-xs sm:text-sm font-display font-medium tracking-[0.2em] uppercase transition-colors duration-300 hover:text-gold-400",
                    isActive ? "text-gold-400" : "text-ivory-200/80"
                  )}
                >
                  {item.label}

                  {/* Smooth Sliding Underline Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-gold-400 hover:text-gold-500 transition-colors focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Mobile Navigation Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Luxury Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-maroon-900/98 backdrop-blur-2xl flex flex-col items-center justify-center space-y-8 px-6 text-center border-b-2 border-gold-500/40"
          >
            <div className="w-16 h-16 rounded-full border border-gold-500/40 flex items-center justify-center mb-2">
              <Crown className="w-8 h-8 text-gold-400" />
            </div>

            {navItems.map((item, index) => (
              <motion.a
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 + 0.1 }}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-2xl font-display tracking-widest uppercase py-1 border-b border-transparent hover:border-gold-400 transition-all",
                  activeSection === item.id
                    ? "text-gold-400 font-bold border-gold-400"
                    : "text-ivory-200/80"
                )}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
