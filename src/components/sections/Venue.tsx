import { motion } from "motion/react";
import { weddingConfig } from "../../config/wedding";
import { Map, Plane, Train, Phone, Sparkles } from "lucide-react";

export function Venue() {
  return (
    <section id="venue" className="py-20 md:py-36 bg-ivory-200 relative overflow-hidden">
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
              Location & Logistics
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
            The Destination
          </motion.h2>
          <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="flex flex-col space-y-4">
              <div className="w-full aspect-[4/3] sm:aspect-video lg:aspect-square bg-gray-200 rounded-3xl overflow-hidden shadow-2xl relative border-2 border-gold-500/40">
                <iframe
                  src={weddingConfig.venueLocation.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Venue Map Location"
                  className="w-full h-full rounded-3xl"
                />
              </div>
              <a
                href={weddingConfig.venueLocation.directionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-gold-500 text-maroon-900 font-display tracking-widest uppercase text-xs md:text-sm font-bold px-6 py-4 rounded-2xl shadow-xl hover:bg-gold-400 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Map className="w-4 h-4 text-maroon-900 group-hover:scale-110 transition-transform" />
                Open Live Navigation in Google Maps
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-3xl font-display text-maroon-900 mb-8 font-bold">
              Travel Information
            </h3>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-maroon-900 text-gold-400 rounded-2xl flex items-center justify-center shrink-0 shadow-md border border-gold-500/30">
                  <Plane size={24} />
                </div>
                <div>
                  <h4 className="font-display font-semibold tracking-wider uppercase text-maroon-900 mb-1 text-sm">
                    Nearest Airport
                  </h4>
                  <p className="text-maroon-900/80 whitespace-pre-line text-sm sm:text-base leading-relaxed">
                    {weddingConfig.travel?.airport ||
                      "Jaipur International Airport (JAI)\nApprox. 30 minutes drive from the venue."}
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-maroon-900 text-gold-400 rounded-2xl flex items-center justify-center shrink-0 shadow-md border border-gold-500/30">
                  <Train size={24} />
                </div>
                <div>
                  <h4 className="font-display font-semibold tracking-wider uppercase text-maroon-900 mb-1 text-sm">
                    Railway Station
                  </h4>
                  <p className="text-maroon-900/80 whitespace-pre-line text-sm sm:text-base leading-relaxed">
                    {weddingConfig.travel?.railway ||
                      "Jaipur Junction (JP)\nApprox. 20 minutes drive from the venue."}
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-maroon-900 text-gold-400 rounded-2xl flex items-center justify-center shrink-0 shadow-md border border-gold-500/30">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-display font-semibold tracking-wider uppercase text-maroon-900 mb-1 text-sm">
                    Concierge & Help Desk
                  </h4>
                  <p className="text-maroon-900/80 text-sm sm:text-base leading-relaxed">
                    For travel assistance and pickups:
                    <br />
                    <span className="font-semibold">{weddingConfig.contact.phone}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-maroon-900/15">
              <h4 className="font-display text-2xl text-maroon-900 mb-3 font-bold">
                Recommended Hotels
              </h4>
              <p className="text-maroon-900/80 leading-relaxed mb-6 text-sm sm:text-base">
                We have arranged block bookings at nearby properties. Please mention the "
                <span className="font-semibold text-maroon-900">{weddingConfig.hashtag}</span>"
                while booking to avail special rates.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
