/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useLenis } from './hooks/useLenis';
import { OpeningVideo } from './components/sections/OpeningVideo';
import { Navigation } from './components/Navigation';
import { Hero } from './components/sections/Hero';
import { Story } from './components/sections/Story';
import { Events } from './components/sections/Events';
import { Gallery } from './components/sections/Gallery';
import { Family } from './components/sections/Family';
import { Venue } from './components/sections/Venue';
import { Footer } from './components/Footer';
import { FlowerPetals } from './components/FlowerPetals';
import { PartyPopperButton } from './components/PartyPopper';
import { AudioPlayer } from './components/AudioPlayer';

export default function App() {
  useLenis();
  const [showMainContent, setShowMainContent] = useState(false);

  return (
    <div className="bg-ivory-200 min-h-screen text-maroon-900 selection:bg-gold-500 selection:text-maroon-900 relative">
      {/* Falling Flower Petals continuously across entire app */}
      <FlowerPetals />

      {/* Global Background Audio Player running throughout the website */}
      <AudioPlayer autoStart={true} />

      {!showMainContent && (
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
