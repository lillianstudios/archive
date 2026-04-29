'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax on scroll
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const imgEl = heroRef.current.querySelector('.hero-img') as HTMLElement;
      if (imgEl) {
        imgEl.style.transform = `translateY(${scrollY * 0.25}px)`;
      }
    };

    // Entrance animation
    const timer = setTimeout(() => {
      if (textRef.current) {
        textRef.current.style.opacity = '1';
        textRef.current.style.transform = 'translateY(0)';
      }
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden"
      style={{ height: 'calc(100vh - 56px)', marginTop: '56px' }}>

      {/* Full-bleed image */}
      <div className="absolute inset-0 overflow-hidden">
        <AppImage
          src="https://images.unsplash.com/photo-1549977921-5fc2c54502b4"
          alt="Brutalist concrete architecture at dusk, dramatic warm golden light raking across textured concrete facade, deep shadows, atmospheric sky"
          fill
          priority
          className="hero-img object-cover object-center"
          sizes="100vw" />

        {/* Subtle gradient overlay — bottom-left text region */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
      </div>

      {/* Bottom-left text overlay */}
      <div
        ref={textRef}
        className="absolute bottom-12 left-8 md:left-12 z-10"
        style={{
          opacity: 0,
          transform: 'translateY(16px)',
          transition: 'opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}>

        <p className="text-white/70 font-sans text-xs font-light tracking-[0.3em] uppercase mb-3">
          PORTFOLIO · 2026
        </p>
        <h1 className="font-sans text-white font-bold leading-none tracking-tight"
        style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', letterSpacing: '-0.01em' }}>

          LILLIAN
        </h1>
        <p className="text-white/80 font-sans font-light tracking-[0.28em] uppercase mt-1"
        style={{ fontSize: 'clamp(0.75rem, 2vw, 1.1rem)' }}>

          STUDIO ARCHIVE
        </p>
      </div>

      {/* Vertical text — right edge */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-3">
        <span
          className="writing-vertical text-white/30 font-sans text-[9px] font-medium tracking-[0.35em] uppercase">

          ARCHITECTURE · PHOTOGRAPHY · ART
        </span>
      </div>
    </section>);

}