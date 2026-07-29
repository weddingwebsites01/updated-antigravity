import { weddingConfig } from "../config/wedding";
import { Instagram, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-maroon-900 text-ivory-200 py-12 md:py-20 border-t border-gold-500/20">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
        <h2 className="font-script text-4xl sm:text-5xl md:text-6xl text-gold-400 mb-6 sm:mb-8">
          {weddingConfig.bride.name} & {weddingConfig.groom.name}
        </h2>
        
        <p className="font-display tracking-[0.2em] uppercase mb-12 opacity-80">
          Thank you for being part of our journey
        </p>

        <div className="flex justify-center space-x-8 mb-16">
          <a href="#" className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center hover:bg-gold-500 hover:text-maroon-900 transition-all duration-300">
            <Instagram size={18} />
          </a>
          <a href={`mailto:${weddingConfig.contact.email}`} className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center hover:bg-gold-500 hover:text-maroon-900 transition-all duration-300">
            <Mail size={18} />
          </a>
          <a href={`tel:${weddingConfig.contact.phone}`} className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center hover:bg-gold-500 hover:text-maroon-900 transition-all duration-300">
            <Phone size={18} />
          </a>
        </div>

        <div className="text-xs tracking-widest uppercase opacity-50 flex flex-col md:flex-row justify-center items-center gap-4">
          <span>© {new Date().getFullYear()} {weddingConfig.bride.name} & {weddingConfig.groom.name}</span>
          <span className="hidden md:inline">•</span>
          <span>Designed with Love</span>
        </div>
      </div>
    </footer>
  );
}
