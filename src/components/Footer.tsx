import { weddingConfig } from "../config/wedding";
import { Mail, Phone, Crown } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-maroon-900 text-ivory-200 py-16 md:py-24 border-t-2 border-gold-500/40 relative overflow-hidden">
      {/* Background Royal Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center relative z-10">
        <div className="w-12 h-12 rounded-full border border-gold-500/40 flex items-center justify-center mx-auto mb-6">
          <Crown className="w-6 h-6 text-gold-400" />
        </div>

        <h2 className="font-script text-5xl sm:text-6xl md:text-7xl text-gold-400 mb-4 font-bold drop-shadow">
          {weddingConfig.bride.name} & {weddingConfig.groom.name}
        </h2>

        <p className="font-display tracking-[0.25em] uppercase text-xs sm:text-sm text-ivory-200/90 mb-10">
          Thank you for being part of our royal journey
        </p>

        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-10" />

        <div className="flex justify-center items-center gap-6 mb-12">
          <a
            href={`mailto:${weddingConfig.contact.email}`}
            className="w-11 h-11 rounded-full border border-gold-500/40 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-maroon-900 transition-all duration-300 shadow-md cursor-pointer"
            title="Send Email"
          >
            <Mail size={18} />
          </a>
          <a
            href={`tel:${weddingConfig.contact.phone}`}
            className="w-11 h-11 rounded-full border border-gold-500/40 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-maroon-900 transition-all duration-300 shadow-md cursor-pointer"
            title="Call Us"
          >
            <Phone size={18} />
          </a>
        </div>

        <div className="text-[11px] sm:text-xs font-display tracking-widest uppercase text-ivory-200/60 flex flex-col md:flex-row justify-center items-center gap-2 sm:gap-4">
          <span>
            © {new Date().getFullYear()} {weddingConfig.bride.name} & {weddingConfig.groom.name}
          </span>
          <span className="hidden md:inline">•</span>
          <span>{weddingConfig.hashtag}</span>
          <span className="hidden md:inline">•</span>
          <span>Crafted for Royalty</span>
        </div>
      </div>
    </footer>
  );
}
