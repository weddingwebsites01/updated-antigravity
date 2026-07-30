/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useLenis } from "./hooks/useLenis";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/sections/Hero";
import { Story } from "./components/sections/Story";
import { Events } from "./components/sections/Events";
import { Gallery } from "./components/sections/Gallery";
import { Family } from "./components/sections/Family";
import { Venue } from "./components/sections/Venue";
import { Rsvp } from "./components/sections/Rsvp";
import { Footer } from "./components/Footer";
import { FlowerPetals } from "./components/FlowerPetals";
import { GoldParticles } from "./components/GoldParticles";
import { PartyPopperButton } from "./components/PartyPopper";
import { AudioPlayer } from "./components/AudioPlayer";

export default function App() {
  useLenis();

  return (
    <div className="bg-ivory-200 min-h-screen text-maroon-900 selection:bg-gold-500 selection:text-maroon-900 relative overflow-x-hidden">
      {/* Falling Flower Petals continuously across entire site */}
      <FlowerPetals />

      {/* Global Background Audio Player */}
      <AudioPlayer autoStart={true} />

      {/* Ambient Gold Particles */}
      <GoldParticles />

      {/* Main Website Structure - Starts Directly */}
      <Navigation />
      <main>
        <Hero />
        <Story />
        <Events />
        <Gallery />
        <Family />
        <Venue />
        <Rsvp />
      </main>
      <Footer />
      <PartyPopperButton />
    </div>
  );
}
