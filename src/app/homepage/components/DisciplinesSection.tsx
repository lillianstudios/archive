'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

interface Discipline {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  alt: string;
}

const disciplines: Discipline[] = [
{
  id: 'architecture',
  title: 'Architecture',
  description:
  'Academic explorations, professional placements, and speculative projects that investigate the relationship between structure, light, and human experience.',
  href: '/architecture',
  image:
  "https://img.rocket.new/generatedImages/rocket_gen_img_17ed54c15-1776778711567.png",
  alt: 'Modernist desert villa with flat roof, timber fins, and reflective pool, warm golden-hour light, arid landscape'
},
{
  id: 'photography',
  title: 'Photography',
  description:
  'A curated lens on buildings, light, beaches, flora, and the overlooked moments that shape our perception of the built and natural environment.',
  href: '/photography',
  image:
  "https://images.unsplash.com/photo-1717658943692-a7713dd058b5",
  alt: 'Underground brutalist colonnade with massive concrete pillars, figure walking toward brilliant light at far end, dramatic contrast'
},
{
  id: 'art',
  title: 'Art',
  description:
  'Gestural and mixed-media works exploring materiality, form, and the boundary between architectural drawing and fine art expression.',
  href: '/homepage',
  image:
  "https://images.unsplash.com/photo-1594558344766-c1102c802a43",
  alt: 'Abstract mixed media canvas with expressive gestural marks in terracotta, cobalt blue, and charcoal on textured paper ground'
}];


export default function DisciplinesSection() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    rowRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-background">
      {disciplines.map((discipline, index) =>
      <div
        key={discipline.id}
        ref={(el) => {rowRefs.current[index] = el;}}
        className="discipline-row reveal-fade">

          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[480px] md:min-h-[560px]">
            {/* Image — left column */}
            <div className="relative overflow-hidden" style={{ minHeight: '320px' }}>
              <AppImage
              src={discipline.image}
              alt={discipline.alt}
              fill
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy" />

            </div>

            {/* Text — right column */}
            <div className="flex flex-col justify-center px-8 md:px-16 py-14 md:py-20 bg-background">
              <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-6 leading-tight">
                {discipline.title}
              </h2>
              <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-sm">
                {discipline.description}
              </p>
              <Link href={discipline.href} className="explore-link">
                EXPLORE
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>);

}