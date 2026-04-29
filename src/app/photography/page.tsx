import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PhotographyHero from './components/PhotographyHero';
import PhotographyGrid from './components/PhotographyGrid';

export default function PhotographyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <PhotographyHero />
      <PhotographyGrid />
      <Footer />
    </main>
  );
}