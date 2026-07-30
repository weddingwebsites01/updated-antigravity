import { weddingConfig } from "../../config/wedding";
import { Sparkles } from "lucide-react";

export function Family() {
  return (
    <section id="family" className="py-16 md:py-28 bg-ivory-100 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-12 md:mb-20">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-gold-500" />
            <span className="text-gold-500 font-display tracking-[0.25em] uppercase text-xs font-semibold">
              Pillars of Love & Blessings
            </span>
            <Sparkles className="w-4 h-4 text-gold-500" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display text-maroon-900 mb-3 font-bold">
            Our Family
          </h2>
          <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Bride's Side */}
          <div className="bg-ivory-200 rounded-3xl p-6 sm:p-8 border border-gold-500/30 shadow-lg">
            <h3 className="text-3xl sm:text-4xl font-script text-maroon-900 text-center mb-6 sm:mb-8 font-bold">
              Bride's Side
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {weddingConfig.family.bride.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative aspect-square overflow-hidden rounded-full mb-3 sm:mb-4 mx-auto max-w-[140px] sm:max-w-[170px] border-2 border-gold-500/40 p-1 shadow-md">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="font-display text-base sm:text-lg text-maroon-900 font-bold">
                    {member.name}
                  </h4>
                  <p className="text-xs text-gold-500 font-display tracking-widest uppercase mt-0.5 font-semibold">
                    {member.relation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Groom's Side */}
          <div className="bg-ivory-200 rounded-3xl p-6 sm:p-8 border border-gold-500/30 shadow-lg">
            <h3 className="text-3xl sm:text-4xl font-script text-maroon-900 text-center mb-6 sm:mb-8 font-bold">
              Groom's Side
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {weddingConfig.family.groom.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative aspect-square overflow-hidden rounded-full mb-3 sm:mb-4 mx-auto max-w-[140px] sm:max-w-[170px] border-2 border-gold-500/40 p-1 shadow-md">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="font-display text-base sm:text-lg text-maroon-900 font-bold">
                    {member.name}
                  </h4>
                  <p className="text-xs text-gold-500 font-display tracking-widest uppercase mt-0.5 font-semibold">
                    {member.relation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
