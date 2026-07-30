/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { useLenis } from "./hooks/useLenis";
import { Preloader } from "./components/Preloader";
import { OpeningVideo } from "./components/sections/OpeningVideo";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/sections/Hero";
import { Story } from "./components/sections/Story";
import { Events } from "./components/sections/Events";
import { Gallery } from "./components/sections/Gallery";
import { Family } from "./components/sections/Family";
import { Venue } from "./components/sections/Venue";
import { Footer } from "./components/Footer";
import { GoldParticles } from "./components/GoldParticles";
import { PartyPopperButton } from "./components/PartyPopper";
import { AudioPlayer } from "./components/AudioPlayer";

export default function App() {
  useLenis();
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);

  return (
    <div className="bg-ivory-200 min-h-screen text-maroon-900 selection:bg-gold-500 selection:text-maroon-900 relative overflow-x-hidden">
      {/* Preload all images, video, and audio before launching */}
      {!isPreloaded && <Preloader onLoaded={() => setIsPreloaded(true)} />}

      {/* Global Background Audio Player */}
      <AudioPlayer autoStart={true} />

      {/* Ambient Gold Particles */}
      <GoldParticles />

      {isPreloaded && !showMainContent && (
        <OpeningVideo onComplete={() => setShowMainContent(true)} />
      )}

      {showMainContent && (
        <>
          <Navigation />
          <main>
            <Hero />
            <Story />
            <Events />
            <Gallery />
            <Family />
            <Venue />
          </main>
          <Footer />
          <PartyPopperButton />
        </>
      )}
    </div>
  );
}
