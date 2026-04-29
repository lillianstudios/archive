'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

interface Project {
  id: string;
  title: string;
  year: string;
  category: string;
  image: string;
  alt: string;
  span?: 'wide' | 'normal';
}

const projects: Project[] = [
{
  id: 'p1',
  title: 'Coastal Threshold House',
  year: '2025',
  category: 'Speculative Residential',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_17ed54c15-1776778711567.png",
  alt: 'Modernist desert villa with flat roof, timber louvres, and reflective pool at golden hour, arid rocky landscape',
  span: 'wide'
},
{
  id: 'p2',
  title: 'Concrete Pavilion Study',
  year: '2024',
  category: 'Academic',
  image: "https://images.unsplash.com/photo-1656432630709-b998adb36d6d",
  alt: 'Raw concrete pavilion with deep reveals, dramatic shadows from overhead skylights, minimalist interior',
  span: 'normal'
},
{
  id: 'p3',
  title: 'Urban Infill Proposal',
  year: '2024',
  category: 'Competition Entry',
  image: "https://images.unsplash.com/photo-1729346495840-471b9f807693",
  alt: 'Dense urban building facade with rhythm of windows and balconies, late afternoon light, city context',
  span: 'normal'
},
{
  id: 'p4',
  title: 'Light Corridor Internship',
  year: '2023',
  category: 'Professional Placement',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fab624e4-1772483658963.png",
  alt: 'Long minimalist corridor with clerestory windows casting diagonal light bars across polished concrete floor',
  span: 'wide'
},
{
  id: 'p5',
  title: 'Green Envelope Retrofit',
  year: '2023',
  category: 'Sustainable Design',
  image: "https://images.unsplash.com/photo-1725529007618-8fa89ad839ad",
  alt: 'Contemporary building facade with integrated green wall system, vertical gardens on concrete grid, bright daylight',
  span: 'normal'
},
{
  id: 'p6',
  title: 'Tectonic Fragment',
  year: '2022',
  category: 'Academic — Year 3',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_19fb51f96-1775823769438.png",
  alt: 'Architectural model detail with intersecting planes and angular voids, crisp studio lighting, white card model',
  span: 'normal'
}];


export default function ArchitectureGallery() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-background py-16 md:py-20">
      <div className="px-6 md:px-10 max-w-screen-xl mx-auto">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-6 mb-12 border-b border-border pb-6">
          {['ALL', 'ACADEMIC', 'PROFESSIONAL', 'PERSONAL'].map((tab) => (
            <button
              key={tab}
              className={`font-sans text-[11px] font-medium tracking-[0.16em] uppercase transition-colors duration-200 ${
                tab === 'ALL' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {projects.map((project, index) =>
          <div
            key={project.id}
            ref={(el) => {itemRefs.current[index] = el;}}
            className={`reveal-fade bg-background group cursor-pointer ${
            project.span === 'wide' ? 'md:col-span-2' : ''}`
            }>

              {/* Image */}
              <div
              className="relative overflow-hidden gallery-item"
              style={{
                aspectRatio: project.span === 'wide' ? '16/7' : '4/3'
              }}>

                <AppImage
                src={project.image}
                alt={project.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                sizes={
                project.span === 'wide' ? '(max-width: 768px) 100vw, 100vw' : '(max-width: 768px) 100vw, 50vw'
                }
                loading="lazy" />

              </div>

              {/* Caption */}
              <div className="px-0 py-5 border-b border-border flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-sans text-sm font-medium text-foreground mb-1">
                    {project.title}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground tracking-wide">
                    {project.category}
                  </p>
                </div>
                <span className="font-sans text-xs text-muted-foreground flex-shrink-0 pt-0.5">
                  {project.year}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}