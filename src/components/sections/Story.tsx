import { weddingConfig } from "../../config/wedding";
import { Sparkles } from "lucide-react";

export function Story() {
  return (
    <section id="story" className="py-16 md:py-28 bg-ivory-100 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-gold-500" />
            <span className="text-gold-500 font-display tracking-[0.25em] uppercase text-xs font-semibold">
              Our Journey Together
            </span>
            <Sparkles className="w-4 h-4 text-gold-500" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display text-maroon-900 mb-3 font-bold">
            Our Story
          </h2>
          <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
        </div>

        <div className="space-y-16 md:space-y-28">
          {weddingConfig.story.map((item, index) => (
            <div
              key={item.title}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="w-full md:w-1/2">
                <div className="relative aspect-[4/5] overflow-hidden rounded-tl-[80px] rounded-br-[80px] shadow-xl border-2 border-gold-500/30">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-maroon-900/10 mix-blend-overlay" />
                </div>
              </div>

              <div className="w-full md:w-1/2 text-center md:text-left">
                <span className="text-gold-500 font-display font-semibold tracking-[0.2em] uppercase text-xs mb-2 block">
                  {item.date}
                </span>
                <h3 className="text-3xl md:text-4xl font-display text-maroon-900 font-bold mb-4">
                  {item.title}
                </h3>
                <p className="text-maroon-900/80 leading-relaxed text-base sm:text-lg font-sans">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
