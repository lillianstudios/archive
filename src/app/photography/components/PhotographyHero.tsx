import React from 'react';

export default function PhotographyHero() {
  return (
    <section className="pt-14 bg-background border-b border-border">
      <div className="px-6 md:px-10 max-w-screen-xl mx-auto py-16 md:py-20">
        <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-primary mb-4">
          02 — DISCIPLINE
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-light text-foreground leading-none tracking-tight mb-6">
          Photography
        </h1>
        <p className="font-sans text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
          A curated lens on buildings, light, beaches, flora, and the overlooked moments that shape our perception of the built and natural environment.
        </p>
      </div>
    </section>
  );
}