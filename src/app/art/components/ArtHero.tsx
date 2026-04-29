import React from 'react';

export default function ArtHero() {
  return (
    <section className="pt-14 bg-background border-b border-border">
      <div className="px-6 md:px-10 max-w-screen-xl mx-auto py-16 md:py-20">
        <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-primary mb-4">
          03 — DISCIPLINE
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-light text-foreground leading-none tracking-tight mb-6">
          Art
        </h1>
        <p className="font-sans text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
          A meditative scroll through gestural works, material studies, and the drawings that exist between architecture and art.
        </p>
      </div>
    </section>
  );
}
