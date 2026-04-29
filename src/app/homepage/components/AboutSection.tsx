'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

interface MetaItem {
  label: string;
  value: string;
}

const metaItems: MetaItem[] = [
{ label: 'Discipline', value: 'Architectural Technology · Photography · Art' },
{ label: 'Education', value: 'BSc Architectural Technology · ATU Galway' },
{ label: 'Focus', value: 'Sustainable Design · BIM · Green Energy' },
{ label: 'Based In', value: 'Galway, Ireland' }];


export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    [textRef.current, imageRef.current, metaRef.current].forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-background py-20 md:py-28 border-t border-border">
      <div className="px-6 md:px-10 max-w-screen-xl mx-auto">
        {/* Two-column: bio text left, portrait right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-16 md:mb-20">
          {/* Bio text */}
          <div ref={textRef} className="reveal-up flex flex-col justify-between">
            <div>
              <p className="font-sans text-base md:text-lg text-foreground leading-relaxed mb-6">
                Where technical precision meets a decade of creative practice.
              </p>
              <p className="font-sans text-base md:text-lg text-foreground leading-relaxed mb-6">
                I&apos;m an architectural technology graduate with a strong foundation in sustainable design, BIM workflows, and residential planning. My journey into the building engineering industry began at 10 years old, sparking a lifelong passion. This, combined with a decade of art studies, provides a unique creative outlook on architecture.
              </p>
              <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                I am experienced in transforming conceptual ideas into practical, visually compelling outcomes through a mix of hand drawing, BIM modelling, and rendering. Self-driven and team-oriented, I&apos;ve proven my determination in design competitions and internships. Currently, I&apos;m advancing towards architectural licensing, with a long-term focus on BIM engineering and green energy innovation.
              </p>
            </div>
          </div>

          {/* Portrait */}
          <div ref={imageRef} className="reveal-fade">
            <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
              <AppImage
                src="https://images.unsplash.com/photo-1706009238933-ee170740b222"
                alt="Architect standing in minimalist concrete space, warm light casting geometric shadow patterns on floor, professional and contemplative"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy" />

            </div>
          </div>
        </div>

        {/* Metadata grid */}
        <div ref={metaRef} className="reveal-up">
          {metaItems.map((item) =>
          <div key={item.label} className="meta-row">
              <span className="meta-label">{item.label}</span>
              <span className="meta-value">{item.value}</span>
            </div>
          )}
        </div>
      </div>
    </section>);

}