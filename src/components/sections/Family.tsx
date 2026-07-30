import { motion } from "motion/react";
import { weddingConfig } from "../../config/wedding";
import { Sparkles } from "lucide-react";

export function Family() {
  return (
    <section id="family" className="py-20 md:py-36 bg-ivory-100 relative overflow-hidden">
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
              Pillars of Love & Blessings
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
            Our Family
          </motion.h2>
          <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-24">
          {/* Bride's Side */}
          <div className="bg-ivory-200/60 rounded-3xl p-6 sm:p-10 border border-gold-500/30 shadow-xl">
            <h3 className="text-3xl sm:text-4xl font-script text-maroon-900 text-center mb-8 sm:mb-12 font-bold">
              Bride's Side
            </h3>
            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              {weddingConfig.family.bride.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="text-center group"
                >
                  <div className="relative aspect-square overflow-hidden rounded-full mb-4 sm:mb-6 mx-auto max-w-[150px] sm:max-w-[190px] border-2 border-gold-500/40 p-1 shadow-lg group-hover:border-gold-500 transition-colors duration-500">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="font-display text-lg sm:text-xl text-maroon-900 font-bold">
                    {member.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gold-500 font-display tracking-widest uppercase mt-1 font-semibold">
                    {member.relation}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Groom's Side */}
          <div className="bg-ivory-200/60 rounded-3xl p-6 sm:p-10 border border-gold-500/30 shadow-xl">
            <h3 className="text-3xl sm:text-4xl font-script text-maroon-900 text-center mb-8 sm:mb-12 font-bold">
              Groom's Side
            </h3>
            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              {weddingConfig.family.groom.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="text-center group"
                >
                  <div className="relative aspect-square overflow-hidden rounded-full mb-4 sm:mb-6 mx-auto max-w-[150px] sm:max-w-[190px] border-2 border-gold-500/40 p-1 shadow-lg group-hover:border-gold-500 transition-colors duration-500">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="font-display text-lg sm:text-xl text-maroon-900 font-bold">
                    {member.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gold-500 font-display tracking-widest uppercase mt-1 font-semibold">
                    {member.relation}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
