import React from 'react';
import { StarField } from './components/StarField';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { MusicPlayer } from './components/MusicPlayer';
import { VideoSection } from './components/VideoSection';
import { GalaxyCarousel } from './components/GalaxyCarousel';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="relative h-screen bg-black text-white overflow-x-hidden">
      <StarField />
      
      <main className="relative z-10 h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        <Hero />
        <About />
        <GalaxyCarousel />
        <VideoSection />
        <MusicPlayer />
        <Footer />
      </main>
    </div>
  );
}
