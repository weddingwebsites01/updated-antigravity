export const weddingConfig = {
  heroBannerImage: "/images/banner2.png",
  musicUrl: "/music/song.mp3",
  video: {
    opening: "/video/intro.mp4"
  },
  venueLocation: {
    name: "The Royal Palace Gardens",
    address: "123 Palace Road, Jaipur, Rajasthan",
    query: "The Royal Palace Gardens, Jaipur, Rajasthan",
    embedUrl: "https://www.google.com/maps?q=The%20Royal%20Palace%20Gardens%2C%20Jaipur%2C%20Rajasthan&output=embed",
    directionUrl: "https://www.google.com/maps/dir/?api=1&destination=The%20Royal%20Palace%20Gardens%2C%20123%20Palace%20Road%2C%20Jaipur%2C%20Rajasthan",
  },
  bride: {
    name: "Ananya",
    fullName: "Ananya Sharma",
    parents: "Mr. Raj & Mrs. Meera Sharma",
  },
  groom: {
    name: "Vikram",
    fullName: "Vikram Singh",
    parents: "Mr. Anil & Mrs. Sunita Singh",
  },
  weddingDate: "2026-11-20T17:00:00",
  hashtag: "#AnanyaGotVikramed",
  quote: "Two souls with but a single thought, two hearts that beat as one.",
  theme: {
    colors: {
      primary: "#800000", // Deep Maroon
      secondary: "#F5F5DC", // Beige/Cream
      accent: "#D4AF37", // Champagne Gold
      background: "#FFFAF0", // Ivory
      text: "#333333", // Dark grey for readability
    }
  },
  story: [
    {
      title: "How We Met",
      date: "August 2022",
      description: "A chance encounter at a mutual friend's art gallery opening. A conversation about a painting led to a coffee date the next day.",
      image: "/images/s1.jpeg",
    },
    {
      title: "The First Date",
      date: "September 2022",
      description: "A beautiful evening by the lake, talking for hours until the stars came out. We knew there was something special.",
      image: "/images/s2.jpeg",
    },
    {
      title: "The Proposal",
      date: "December 2025",
      description: "A surprise trip to Udaipur. Overlooking the Pichola lake at sunset, Vikram went down on one knee.",
      image: "/images/s3.jpeg",
    }
  ],
  events: [
    {
      id: "haldi",
      title: "Haldi Ceremony",
      date: "2026-11-18T10:00:00",
      venue: "The Royal Palace Gardens",
      address: "123 Palace Road, Jaipur, Rajasthan",
      dressCode: "Yellow / White Traditional",
      mapUrl: "https://www.google.com/maps/dir/?api=1&destination=The%20Royal%20Palace%20Gardens%2C%20Jaipur%2C%20Rajasthan",
      description: "Join us for a morning of vibrant colors, traditional music, and the beautiful Haldi ritual to bless the couple.",
      image: "/images/haldi.png"
    },
    {
      id: "Mehndi",
      title: "Mehndi",
      date: "2026-11-19T19:00:00",
      venue: "The Grand Durbar Hall",
      address: "123 Palace Road, Jaipur, Rajasthan",
      dressCode: "Glamorous / Indo-Western",
      mapUrl: "https://www.google.com/maps/dir/?api=1&destination=The%20Grand%20Durbar%20Hall%2C%20Jaipur%2C%20Rajasthan",
      description: "An evening of dance, music, and celebration. Bring your dancing shoes!",
      image: "/images/mehndi.png"
    },
    {
      id: "ring",
      title: "Ring Ceremony",
      date: "2026-11-17T19:00:00",
      venue: "The Royal Ballroom",
      address: "123 Palace Road, Jaipur, Rajasthan",
      dressCode: "Elegant Traditional",
      mapUrl: "https://www.google.com/maps/dir/?api=1&destination=The%20Royal%20Ballroom%2C%20Jaipur%2C%20Rajasthan",
      description: "Join us as we exchange rings and begin our journey together with our loved ones.",
      image: "/images/ring.png"
    },
    {
      id: "wedding",
      title: "The Wedding",
      date: "2026-11-20T17:00:00",
      venue: "The Lakefront Pavilion",
      address: "123 Palace Road, Jaipur, Rajasthan",
      dressCode: "Traditional / Formals",
      mapUrl: "https://www.google.com/maps/dir/?api=1&destination=The%20Lakefront%20Pavilion%2C%20Jaipur%2C%20Rajasthan",
      description: "The moment we tie the knot. Sunset pheras followed by a grand reception dinner.",
      image: "/images/wedding.png"
    }
  ],
  gallery: [	
    "/images/g1.png",
    "/images/g2.png",
    "/images/g3.png",
    "/images/g4.png",
    "/images/g5.png",
    "/images/g6.png"
  ],
  family: {
    bride: [
      { name: "Rahul Sharma", relation: "Brother", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400" },
      { name: "Priya Sharma", relation: "Sister", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" }
    ],
    groom: [
      { name: "Aditya Singh", relation: "Brother", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
      { name: "Neha Singh", relation: "Sister", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" }
    ]
  },
  scratchCard: {
    title: "Scratch to Reveal the Wedding Date",
    dateText: "November 20, 2026 • Jaipur, Rajasthan",
    blessingText: "You are cordially invited to witness our royal union!",
    revealedTitle: "Date & Details Revealed!"
  },
  travel: {
    airport: "Jaipur International Airport (JAI)\nApprox. 30 minutes drive from the venue.",
    railway: "Jaipur Junction (JP)\nApprox. 20 minutes drive from the venue.",
    hotelsNotice: "We have arranged block bookings at nearby properties. Please mention '#AnanyaGotVikramed' while booking to avail special rates."
  },
  contact: {
    email: "wedding@ananyavikram.com",
    phone: "+91 98765 43210"
  }
};
