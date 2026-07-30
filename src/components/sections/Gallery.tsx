import { weddingConfig } from "../../config/wedding";
import { Sparkles } from "lucide-react";

export function Gallery() {
  return (
    <section id="gallery" className="py-16 md:py-28 bg-ivory-200 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-12 md:mb-20">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-gold-500" />
            <span className="text-gold-500 font-display tracking-[0.25em] uppercase text-xs font-semibold">
              Treasured Memories
            </span>
            <Sparkles className="w-4 h-4 text-gold-500" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display text-maroon-900 mb-3 font-bold">
            Captured Moments
          </h2>
          <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {weddingConfig.gallery.map((img, index) => (
            <div
              key={index}
              className="break-inside-avoid overflow-hidden rounded-xl border border-gold-500/20 shadow-md"
            >
              <img
                src={img}
                alt="Gallery moment"
                className="w-full h-auto block"
                loading="eager"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
