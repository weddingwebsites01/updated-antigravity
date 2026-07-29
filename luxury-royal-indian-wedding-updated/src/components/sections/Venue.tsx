import { motion } from "motion/react";
import { weddingConfig } from "../../config/wedding";
import { Map, Plane, Train, Phone } from "lucide-react";

export function Venue() {
  return (
    <section id="venue" className="py-16 md:py-32 bg-ivory-200">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-12 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl sm:text-5xl md:text-7xl font-display text-maroon-900 mb-4 md:mb-6"
          >
            The Destination
          </motion.h2>
          <div className="w-24 h-[1px] bg-gold-500 mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="flex flex-col space-y-4">
              <div className="w-full aspect-[4/3] sm:aspect-video lg:aspect-square bg-gray-200 rounded-2xl overflow-hidden shadow-2xl relative border border-gold-500/30">
                <iframe
                  src={weddingConfig.venueLocation.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Venue Map Location"
                  className="w-full h-full rounded-2xl"
                />
              </div>
              <a
                href={weddingConfig.venueLocation.directionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-gold-500 text-maroon-900 font-display tracking-widest uppercase text-xs md:text-sm font-semibold px-6 py-4 rounded-xl shadow-lg hover:bg-gold-400 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group"
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
            <h3 className="text-3xl font-display text-maroon-900 mb-8">Travel Information</h3>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-maroon-900 text-gold-400 rounded-full flex items-center justify-center shrink-0">
                  <Plane size={24} />
                </div>
                <div>
                  <h4 className="font-medium tracking-wider uppercase text-maroon-900 mb-2">Nearest Airport</h4>
                  <p className="text-maroon-900/70 whitespace-pre-line">{weddingConfig.travel?.airport || "Jaipur International Airport (JAI)\nApprox. 30 minutes drive from the venue."}</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-maroon-900 text-gold-400 rounded-full flex items-center justify-center shrink-0">
                  <Train size={24} />
                </div>
                <div>
                  <h4 className="font-medium tracking-wider uppercase text-maroon-900 mb-2">Railway Station</h4>
                  <p className="text-maroon-900/70 whitespace-pre-line">{weddingConfig.travel?.railway || "Jaipur Junction (JP)\nApprox. 20 minutes drive from the venue."}</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-maroon-900 text-gold-400 rounded-full flex items-center justify-center shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-medium tracking-wider uppercase text-maroon-900 mb-2">Concierge & Cabs</h4>
                  <p className="text-maroon-900/70">For travel assistance and pickups:<br/>{weddingConfig.contact.phone}</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-maroon-900/10">
              <h4 className="font-display text-2xl text-maroon-900 mb-4">Recommended Hotels</h4>
              <p className="text-maroon-900/70 leading-relaxed mb-6">
                We have arranged block bookings at nearby properties. Please mention the "{weddingConfig.hashtag}" while booking to avail special rates.
              </p>
              <button className="text-sm font-medium tracking-[0.2em] uppercase text-maroon-900 border-b border-maroon-900 pb-1 hover:text-gold-500 hover:border-gold-500 transition-colors">
                View Accommodations Guide
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
