import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArtHero from './components/ArtHero';
import ArtGallery from './components/ArtGallery';

export default function ArtPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ArtHero />
      <ArtGallery />
      <Footer />
    </main>
  );
}
