import { useState } from "react";
import { weddingConfig } from "../../config/wedding";
import { Sparkles, Send, CheckCircle2, Crown } from "lucide-react";

export function Rsvp() {
  const [guestName, setGuestName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [guestCount, setGuestCount] = useState("1");
  const [attendanceStatus, setAttendanceStatus] = useState("Yes");
  const [selectedEvents, setSelectedEvents] = useState<string[]>(
    weddingConfig.events.map((e) => e.title)
  );
  const [specialMessage, setSpecialMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleEvent = (eventTitle: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventTitle)
        ? prev.filter((t) => t !== eventTitle)
        : [...prev, eventTitle]
    );
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    setIsSubmitting(true);

    // Format WhatsApp Message professionally
    const eventListText =
      selectedEvents.length > 0
        ? selectedEvents.map((ev) => `• ${ev}`).join("\n")
        : "• Not specified";

    const formattedMessage = `🌸 *Royal Wedding RSVP* 🌸\n\n` +
      `*Name:* ${guestName.trim()}\n` +
      (mobileNumber.trim() ? `*Mobile:* ${mobileNumber.trim()}\n` : "") +
      `*Attendance:* ${attendanceStatus}\n` +
      `*Number of Guests:* ${guestCount}\n\n` +
      `*Events Attending:*\n${eventListText}\n\n` +
      (specialMessage.trim() ? `*Message:*\n"${specialMessage.trim()}"` : "");

    const whatsappUrl = `https://wa.me/${weddingConfig.rsvpWhatsAppNumber}?text=${encodeURIComponent(
      formattedMessage
    )}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.open(whatsappUrl, "_blank");
      
      setTimeout(() => setIsSuccess(false), 5000);
    }, 600);
  };

  const isFormValid = guestName.trim().length > 0;

  return (
    <section id="rsvp" className="py-16 md:py-28 bg-maroon-900 text-ivory-200 relative overflow-hidden">
      {/* Background Royal Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500" />

      <div className="container mx-auto px-4 sm:px-6 max-w-3xl relative z-10">
        {/* Header Badge */}
        <div className="text-center mb-10 md:mb-16">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Crown className="w-5 h-5 text-gold-400" />
            <span className="text-gold-400 font-display tracking-[0.25em] uppercase text-xs font-semibold">
              Response Requested
            </span>
            <Crown className="w-5 h-5 text-gold-400" />
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display text-gold-400 mb-3 font-bold drop-shadow">
            Kindly Confirm Your Presence
          </h2>
          <p className="text-ivory-200/90 text-sm sm:text-base font-sans max-w-lg mx-auto italic">
            "Your presence will make our celebration even more special. Please let us know if you'll be joining us."
          </p>
          <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-4" />
        </div>

        {/* RSVP Glass Container Card */}
        <div className="bg-maroon-800 rounded-3xl p-6 sm:p-10 border-2 border-gold-500/40 shadow-[0_15px_45px_rgba(0,0,0,0.8)] relative">
          <form onSubmit={handleRsvpSubmit} className="space-y-6">
            {/* Guest Name & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-display tracking-widest uppercase text-gold-400 mb-2 font-semibold">
                  Guest Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Smith"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-black/40 border border-gold-500/30 rounded-xl px-4 py-3 text-ivory-100 text-sm focus:outline-none focus:border-gold-400 transition-colors placeholder:text-ivory-200/40"
                />
              </div>

              <div>
                <label className="block text-xs font-display tracking-widest uppercase text-gold-400 mb-2 font-semibold">
                  Mobile Number <span className="text-ivory-200/40 font-normal">(Optional)</span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full bg-black/40 border border-gold-500/30 rounded-xl px-4 py-3 text-ivory-100 text-sm focus:outline-none focus:border-gold-400 transition-colors placeholder:text-ivory-200/40"
                />
              </div>
            </div>

            {/* Attendance Status & Guest Count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-display tracking-widest uppercase text-gold-400 mb-2 font-semibold">
                  Will You Attend?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Yes", "No", "Maybe"].map((status) => (
                    <button
                      type="button"
                      key={status}
                      onClick={() => setAttendanceStatus(status)}
                      className={`py-2.5 rounded-xl text-xs font-display tracking-wider font-semibold transition-all border ${
                        attendanceStatus === status
                          ? "bg-gold-500 text-maroon-900 border-gold-400 shadow-md"
                          : "bg-black/30 text-ivory-200 border-gold-500/20 hover:border-gold-500/50"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-display tracking-widest uppercase text-gold-400 mb-2 font-semibold">
                  Number of Guests
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full bg-black/40 border border-gold-500/30 rounded-xl px-4 py-3 text-ivory-100 text-sm focus:outline-none focus:border-gold-400 transition-colors"
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num} className="bg-maroon-900 text-ivory-100">
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dynamic Event Checkboxes */}
            <div>
              <label className="block text-xs font-display tracking-widest uppercase text-gold-400 mb-3 font-semibold">
                Which Events Will You Attend?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {weddingConfig.events.map((event) => {
                  const isChecked = selectedEvents.includes(event.title);
                  return (
                    <label
                      key={event.id}
                      onClick={() => toggleEvent(event.title)}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all ${
                        isChecked
                          ? "bg-gold-500/15 border-gold-500 text-ivory-100"
                          : "bg-black/20 border-gold-500/20 text-ivory-200/60 hover:border-gold-500/40"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="hidden"
                      />
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          isChecked
                            ? "bg-gold-500 border-gold-500 text-maroon-900"
                            : "border-gold-500/40"
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <span className="text-xs sm:text-sm font-display font-medium">
                        {event.title}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Special Message */}
            <div>
              <label className="block text-xs font-display tracking-widest uppercase text-gold-400 mb-2 font-semibold">
                Special Message for the Couple <span className="text-ivory-200/40 font-normal">(Optional)</span>
              </label>
              <textarea
                rows={3}
                placeholder="Warm wishes or special requirements..."
                value={specialMessage}
                onChange={(e) => setSpecialMessage(e.target.value)}
                className="w-full bg-black/40 border border-gold-500/30 rounded-xl px-4 py-3 text-ivory-100 text-sm focus:outline-none focus:border-gold-400 transition-colors placeholder:text-ivory-200/40 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`w-full py-4 rounded-xl font-display tracking-[0.2em] uppercase text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer ${
                isFormValid && !isSubmitting
                  ? "bg-gold-500 text-maroon-900 hover:bg-gold-400 active:scale-[0.99]"
                  : "bg-gold-500/40 text-maroon-900/60 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-maroon-900" />
                  Redirecting to WhatsApp...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-maroon-900" />
                  Send RSVP via WhatsApp
                </>
              )}
            </button>

            {isSuccess && (
              <p className="text-center text-xs text-gold-400 font-display tracking-wider animate-fade-in">
                ✓ Redirecting to WhatsApp with pre-filled RSVP details...
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
