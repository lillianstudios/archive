import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import DisciplinesSection from './components/DisciplinesSection';
import AboutSection from './components/AboutSection';
import TaglineSection from './components/TaglineSection';

export default function HomepagePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <DisciplinesSection />
      <AboutSection />
      <TaglineSection />
      <Footer />
    </main>
  );
}