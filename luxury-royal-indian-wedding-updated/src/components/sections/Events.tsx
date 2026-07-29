import { motion } from "motion/react";
import { weddingConfig } from "../../config/wedding";
import { MapPin, Calendar, Clock } from "lucide-react";

export function Events() {
  return (
    <section id="events" className="py-16 md:py-32 bg-maroon-900 text-ivory-200">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-12 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl sm:text-5xl md:text-7xl font-display text-gold-400 mb-4 md:mb-6"
          >
            The Celebrations
          </motion.h2>
          <div className="w-24 h-[1px] bg-gold-500 mx-auto opacity-50" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {weddingConfig.events.map((event, index) => {
            const dateObj = new Date(event.date);
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="group relative bg-maroon-800/40 rounded-2xl p-4 sm:p-5 border border-gold-500/20 hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[3/4] overflow-hidden rounded-xl mb-6 relative">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20">
                      <h3 className="text-2xl sm:text-3xl font-display text-gold-400 mb-1">{event.title}</h3>
                    </div>
                  </div>

                  <div className="space-y-3 px-1">
                    <div className="flex items-center text-ivory-200/80 text-sm">
                      <Calendar size={16} className="mr-3 text-gold-500 shrink-0" />
                      <span className="tracking-wider">{dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center text-ivory-200/80 text-sm">
                      <Clock size={16} className="mr-3 text-gold-500 shrink-0" />
                      <span className="tracking-wider">{dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex items-start text-ivory-200/80 text-sm">
                      <MapPin size={16} className="mr-3 text-gold-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-ivory-200 text-sm">{event.venue}</p>
                        <p className="text-xs opacity-75 mt-0.5">{event.address}</p>
                      </div>
                    </div>
                    
                    <p className="pt-3 text-ivory-200/70 text-xs sm:text-sm leading-relaxed border-t border-ivory-200/10 mt-4">
                      {event.description}
                    </p>
                    
                    <div className="pt-2 text-xs">
                      <span className="tracking-[0.15em] uppercase text-gold-500 font-semibold">Dress Code: </span>
                      <span className="text-ivory-200/90">{event.dressCode}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-gold-500/10">
                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gold-500/10 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-maroon-900 transition-all text-xs font-display tracking-wider uppercase font-semibold"
                  >
                    Get Directions
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
