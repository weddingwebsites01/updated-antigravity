import { motion } from "motion/react";
import { weddingConfig } from "../../config/wedding";
import { Sparkles } from "lucide-react";

export function Story() {
  return (
    <section id="story" className="py-20 md:py-36 bg-ivory-100 relative overflow-hidden">
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ivory-200 via-ivory-100 to-ivory-200 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
        <div className="text-center mb-16 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <Sparkles className="w-4 h-4 text-gold-500" />
            <span className="text-gold-500 font-display tracking-[0.25em] uppercase text-xs font-semibold">
              Our Journey Together
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
            Our Story
          </motion.h2>
          <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
        </div>

        <div className="space-y-20 md:space-y-36">
          {weddingConfig.story.map((item, index) => (
            <div
              key={item.title}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-20 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="w-full md:w-1/2"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-tl-[100px] rounded-br-[100px] shadow-2xl border-2 border-gold-500/30 group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-maroon-900/15 mix-blend-overlay" />
                  <div className="absolute inset-3 border border-gold-400/40 rounded-tl-[90px] rounded-br-[90px] pointer-events-none" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="w-full md:w-1/2 text-center md:text-left"
              >
                <span className="text-gold-500 font-display font-semibold tracking-[0.25em] uppercase text-xs mb-3 block">
                  {item.date}
                </span>
                <h3 className="text-3xl md:text-4xl font-display text-maroon-900 font-bold mb-5">
                  {item.title}
                </h3>
                <p className="text-maroon-900/80 leading-relaxed text-base sm:text-lg font-sans">
                  {item.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
