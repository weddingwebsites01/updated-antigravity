import { motion } from "motion/react";
import { weddingConfig } from "../../config/wedding";
import { Sparkles } from "lucide-react";

export function Gallery() {
  return (
    <section id="gallery" className="py-20 md:py-36 bg-ivory-200 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-16 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <Sparkles className="w-4 h-4 text-gold-500" />
            <span className="text-gold-500 font-display tracking-[0.25em] uppercase text-xs font-semibold">
              Treasured Memories
            </span>
            <Sparkles className="w-4 h-4 text-gold-500" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-display text-maroon-900 mb-4 md:mb-6 font-bold"
          >
            Captured Moments
          </motion.h2>
          <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {weddingConfig.gallery.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.8, delay: (index % 3) * 0.15 }}
              className="break-inside-avoid overflow-hidden rounded-xl border-2 border-gold-500/20 group relative shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={img}
                alt="Gallery moment"
                className="w-full h-auto transform group-hover:scale-106 transition-transform duration-1000"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-maroon-900/0 group-hover:bg-maroon-900/30 transition-colors duration-500 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-gold-400 font-display tracking-widest uppercase text-xs font-semibold px-4 py-2 border border-gold-400/60 rounded-full backdrop-blur-md">
                  View Moment
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
