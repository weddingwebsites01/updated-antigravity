import { weddingConfig } from "../../config/wedding";
import { MapPin, Calendar, Clock, Sparkles } from "lucide-react";

export function Events() {
  return (
    <section id="events" className="py-16 md:py-28 bg-maroon-900 text-ivory-200 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span className="text-gold-400 font-display tracking-[0.25em] uppercase text-xs font-semibold">
              Royal Functions & Rituals
            </span>
            <Sparkles className="w-4 h-4 text-gold-400" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display text-gold-400 mb-3 font-bold drop-shadow">
            The Celebrations
          </h2>
          <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto opacity-70" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {weddingConfig.events.map((event) => {
            const dateObj = new Date(event.date);
            return (
              <div
                key={event.id}
                className="relative bg-maroon-800 rounded-2xl p-4 border border-gold-500/30 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="aspect-[3/4] overflow-hidden rounded-xl mb-4 relative border border-gold-500/20">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20">
                      <h3 className="text-xl sm:text-2xl font-display text-gold-400 font-bold drop-shadow">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-2 px-1">
                    <div className="flex items-center text-ivory-200/90 text-xs">
                      <Calendar size={14} className="mr-2.5 text-gold-400 shrink-0" />
                      <span className="tracking-wider font-medium">
                        {dateObj.toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center text-ivory-200/90 text-xs">
                      <Clock size={14} className="mr-2.5 text-gold-400 shrink-0" />
                      <span className="tracking-wider font-medium">
                        {dateObj.toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="flex items-start text-ivory-200/90 text-xs">
                      <MapPin size={14} className="mr-2.5 text-gold-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-ivory-100">{event.venue}</p>
                        <p className="text-[11px] opacity-75">{event.address}</p>
                      </div>
                    </div>

                    <p className="pt-2 text-ivory-200/80 text-xs leading-relaxed border-t border-gold-500/20 mt-3">
                      {event.description}
                    </p>

                    <div className="pt-1 text-[11px]">
                      <span className="tracking-[0.15em] uppercase text-gold-400 font-semibold">
                        Dress Code:{" "}
                      </span>
                      <span className="text-ivory-200">{event.dressCode}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-gold-500/20">
                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-gold-500/15 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-maroon-900 transition-colors text-xs font-display tracking-widest uppercase font-semibold cursor-pointer shadow-sm"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
