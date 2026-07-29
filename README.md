# 👑 Luxury Royal Indian Wedding Website - Customization Guide & Documentation

Welcome to your **Royal Indian Wedding Website**! This application is designed to be an ultra-premium, interactive cinematic wedding experience.

---

## 🚀 Quick Setup & Customization Overview

The entire website is engineered to be **100% customizable from a single configuration file**:

👉 **Primary Config File:** `src/config/wedding.ts`

You do **not** need to modify complex component code to customize names, dates, quotes, events, story timelines, photo galleries, or background music/video. Changing `src/config/wedding.ts` instantly updates the whole website.

---

## 📁 Media Asset Locations

You can either host your media files on a CDN (e.g., Unsplash, Cloudinary, Imgur, AWS S3) or place local files inside the `/public` folder:

| Asset Type | Standard Folder Location | Usage in `src/config/wedding.ts` |
| :--- | :--- | :--- |
| **Hero Full-Screen Banner** | `/public/banner.jpg` | Set `heroBannerImage: "/banner.jpg"` |
| **Opening Video** | `/public/video/opening.mp4` | Set `video.opening: "/video/opening.mp4"` |
| **Background Music** | `/public/music/wedding-song.mp3` | Set `musicUrl: "/music/wedding-song.mp3"` |
| **Love Story Photos** | `/public/story/met.jpg` | Set `story[].image: "/story/met.jpg"` |
| **Gallery Photos** | `/public/gallery/1.jpg` | Add to `gallery: ["/gallery/1.jpg", ...]` |
| **Family Photos** | `/public/family/brother.jpg` | Set `family.bride[].image: "/family/brother.jpg"` |
| **Event Photos** | `/public/events/haldi.jpg` | Set `events[].image: "/events/haldi.jpg"` |

---

## ⚙️ Step-by-Step Customization in `src/config/wedding.ts`

Open `src/config/wedding.ts` and modify the fields:

### 1. Couple Details & Dates
```typescript
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
```

### 2. Banner Image, Video & Audio
```typescript
heroBannerImage: "/banner.jpg", // Full-screen responsive hero background banner
musicUrl: "/music/wedding-song.mp3", // Background audio running across the site
video: {
  opening: "/video/opening.mp4" // Full-screen video playing on initial site launch
},
```

### 3. Interactive Scratch Card Reveal
```typescript
scratchCard: {
  title: "Scratch to Reveal the Wedding Date",
  dateText: "November 20, 2026 • Jaipur, Rajasthan",
  blessingText: "You are cordially invited to witness our royal union!",
  revealedTitle: "Date & Details Revealed!"
}
```

### 4. Love Story Timeline
```typescript
story: [
  {
    title: "How We Met",
    date: "August 2022",
    description: "A chance encounter...",
    image: "/story/how-we-met.jpg",
  },
  ...
]
```

### 5. Wedding Ceremonies & Events
```typescript
events: [
  {
    id: "haldi",
    title: "Haldi Ceremony",
    date: "2026-11-18T10:00:00",
    venue: "The Royal Palace Gardens",
    address: "123 Palace Road, Jaipur, Rajasthan",
    dressCode: "Yellow / White Traditional",
    mapUrl: "https://maps.google.com",
    description: "Join us for a morning of vibrant colors...",
    image: "/events/haldi.jpg"
  },
  ...
]
```

### 6. Photo Gallery & Family Members
```typescript
gallery: [
  "/gallery/photo1.jpg",
  "/gallery/photo2.jpg",
  ...
],
family: {
  bride: [
    { name: "Rahul Sharma", relation: "Brother", image: "/family/rahul.jpg" },
  ],
  groom: [
    { name: "Aditya Singh", relation: "Brother", image: "/family/aditya.jpg" },
  ]
}
```

---

## ✨ Features Built-in

1. **🎬 Opening Video Experience**: Plays fullscreen video with smooth transition and name reveal.
2. **🌸 Falling Flower Petals**: Canvas-based interactive falling flower petals raining across the whole site.
3. **🖼️ Full-Screen Responsive Hero Banner**: Covers the entire hero section seamlessly across mobile, tablet, and desktop.
4. **🎟️ Interactive Scratch Card**: Guests scratch with mouse or touch to reveal secret wedding dates & blessing text with party popper explosions.
5. **🎉 Party Poppers**: Interactive confetti celebration button.
6. **🎵 Continuous Background Music**: Global floating player with play/pause and mute/unmute controls.

---

## 🛠️ Commands

- **Build Applet**: `npm run build`
- **Dev Mode**: `npm run dev`
