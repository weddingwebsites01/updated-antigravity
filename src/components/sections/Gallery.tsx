import { motion } from "motion/react";
import { weddingConfig } from "../../config/wedding";

export function Gallery() {
  return (
    <section id="gallery" className="py-16 md:py-32 bg-ivory-200">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl sm:text-5xl md:text-7xl font-display text-maroon-900 mb-4 md:mb-6"
          >
            Captured Moments
          </motion.h2>
          <div className="w-24 h-[1px] bg-gold-500 mx-auto" />
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          {weddingConfig.gallery.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.8, delay: (index % 3) * 0.2 }}
              className="break-inside-avoid overflow-hidden rounded-sm group relative"
            >
              <img 
                src={img} 
                alt="Gallery moment" 
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-maroon-900/0 group-hover:bg-maroon-900/20 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
