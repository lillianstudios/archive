import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArchitectureHero from './components/ArchitectureHero';
import ArchitectureGallery from './components/ArchitectureGallery';

export default function ArchitecturePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ArchitectureHero />
      <ArchitectureGallery />
      <Footer />
    </main>
  );
}