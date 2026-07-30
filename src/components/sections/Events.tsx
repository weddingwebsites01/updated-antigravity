import { motion } from "motion/react";
import { weddingConfig } from "../../config/wedding";
import { MapPin, Calendar, Clock, Sparkles } from "lucide-react";

export function Events() {
  return (
    <section id="events" className="py-20 md:py-36 bg-maroon-900 text-ivory-200 relative overflow-hidden">
      {/* Subtle royal background glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span className="text-gold-400 font-display tracking-[0.25em] uppercase text-xs font-semibold">
              Royal Functions & Rituals
            </span>
            <Sparkles className="w-4 h-4 text-gold-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-display text-gold-400 mb-4 md:mb-6 font-bold drop-shadow"
          >
            The Celebrations
          </motion.h2>
          <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto opacity-70" />
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
                className="group relative bg-maroon-800/50 backdrop-blur-md rounded-2xl p-5 border border-gold-500/30 hover:border-gold-500/80 transition-all duration-500 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <div>
                  <div className="aspect-[3/4] overflow-hidden rounded-xl mb-6 relative border border-gold-500/20">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-1000"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20">
                      <h3 className="text-2xl font-display text-gold-400 font-bold drop-shadow">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-3 px-1">
                    <div className="flex items-center text-ivory-200/90 text-xs sm:text-sm">
                      <Calendar size={16} className="mr-3 text-gold-400 shrink-0" />
                      <span className="tracking-wider font-medium">
                        {dateObj.toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center text-ivory-200/90 text-xs sm:text-sm">
                      <Clock size={16} className="mr-3 text-gold-400 shrink-0" />
                      <span className="tracking-wider font-medium">
                        {dateObj.toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="flex items-start text-ivory-200/90 text-xs sm:text-sm">
                      <MapPin size={16} className="mr-3 text-gold-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-ivory-100">{event.venue}</p>
                        <p className="text-[11px] opacity-75 mt-0.5">{event.address}</p>
                      </div>
                    </div>

                    <p className="pt-3 text-ivory-200/80 text-xs sm:text-sm leading-relaxed border-t border-gold-500/20 mt-4">
                      {event.description}
                    </p>

                    <div className="pt-2 text-xs">
                      <span className="tracking-[0.15em] uppercase text-gold-400 font-semibold">
                        Dress Code:{" "}
                      </span>
                      <span className="text-ivory-200">{event.dressCode}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-gold-500/20">
                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500/15 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-maroon-900 transition-all duration-300 text-xs font-display tracking-widest uppercase font-semibold cursor-pointer shadow-md"
                  >
                    Get Directions
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
