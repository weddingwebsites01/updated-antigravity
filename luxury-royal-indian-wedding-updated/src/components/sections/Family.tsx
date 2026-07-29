import { motion } from "motion/react";
import { weddingConfig } from "../../config/wedding";

export function Family() {
  return (
    <section id="family" className="py-16 md:py-32 bg-ivory-100">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-12 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl sm:text-5xl md:text-7xl font-display text-maroon-900 mb-4 md:mb-6"
          >
            Our Family
          </motion.h2>
          <div className="w-24 h-[1px] bg-gold-500 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-24">
          {/* Bride's Side */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-script text-maroon-900 text-center mb-8 sm:mb-12">Bride's Side</h3>
            <div className="grid grid-cols-2 gap-4 sm:gap-8">
              {weddingConfig.family.bride.map((member, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="text-center"
                >
                  <div className="aspect-[3/4] overflow-hidden rounded-full mb-4 sm:mb-6 mx-auto max-w-[160px] sm:max-w-[200px]">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <h4 className="font-display text-lg sm:text-xl text-maroon-900">{member.name}</h4>
                  <p className="text-xs sm:text-sm text-gold-500 tracking-widest uppercase mt-1 sm:mt-2">{member.relation}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Groom's Side */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-script text-maroon-900 text-center mb-8 sm:mb-12">Groom's Side</h3>
            <div className="grid grid-cols-2 gap-4 sm:gap-8">
              {weddingConfig.family.groom.map((member, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="text-center"
                >
                  <div className="aspect-[3/4] overflow-hidden rounded-full mb-6 mx-auto max-w-[200px]">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <h4 className="font-display text-xl text-maroon-900">{member.name}</h4>
                  <p className="text-sm text-gold-500 tracking-widest uppercase mt-2">{member.relation}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
