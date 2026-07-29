import { motion } from "motion/react";
import { weddingConfig } from "../../config/wedding";

export function Story() {
  return (
    <section id="story" className="py-16 md:py-32 bg-ivory-100 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="text-center mb-12 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl sm:text-5xl md:text-7xl font-display text-maroon-900 mb-4 md:mb-6"
          >
            Our Story
          </motion.h2>
          <div className="w-24 h-[1px] bg-gold-500 mx-auto" />
        </div>

        <div className="space-y-16 md:space-y-32">
          {weddingConfig.story.map((item, index) => (
            <div 
              key={item.title}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-24 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-full md:w-1/2"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-tl-full rounded-tr-full shadow-2xl">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-maroon-900/10 mix-blend-overlay" />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-full md:w-1/2 text-center md:text-left"
              >
                <span className="text-gold-500 font-medium tracking-[0.2em] uppercase text-sm mb-4 block">
                  {item.date}
                </span>
                <h3 className="text-3xl md:text-4xl font-display text-maroon-900 mb-6">
                  {item.title}
                </h3>
                <p className="text-maroon-900/70 leading-relaxed text-lg">
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
