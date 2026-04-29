'use client';

import React, { useEffect, useRef } from 'react';

export default function TaglineSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );
    if (ref?.current) observer?.observe(ref?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section className="bg-background py-20 md:py-28 border-t border-border">
      <div className="px-6 md:px-10 max-w-screen-xl mx-auto">
        <div ref={ref} className="reveal-up max-w-3xl">
          <h2 className="font-display text-3xl md:text-5xl font-light text-foreground leading-tight">
            Where technical precision meets a decade of creative practice.
          </h2>
          <div
            className="mt-5 h-px w-20"
            style={{ backgroundColor: 'var(--primary)' }}
          />
        </div>
      </div>
    </section>
  );
}