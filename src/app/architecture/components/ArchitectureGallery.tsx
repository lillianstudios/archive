'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import ProjectModal, { ModalProject } from '@/components/ui/ProjectModal';

interface Project extends ModalProject {
  span?: 'wide' | 'normal';
}

const projects: Project[] = [
{
  id: 'p1',
  title: 'Coastal Threshold House',
  year: '2025',
  category: 'Speculative Residential',
  description: 'A speculative residential design exploring the threshold between interior comfort and the raw coastal landscape. Timber louvres mediate light and privacy while a reflective pool extends the horizon line into the living space.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_17ed54c15-1776778711567.png",
  alt: 'Modernist desert villa with flat roof, timber louvres, and reflective pool at golden hour, arid rocky landscape',
  materials: 'Timber, Concrete, Glass',
  role: 'Designer',
  span: 'wide'
},
{
  id: 'p2',
  title: 'Concrete Pavilion Study',
  year: '2024',
  category: 'Academic',
  description: 'A raw concrete pavilion exploring the interplay of mass and void. Deep reveals and overhead skylights create dramatic shadow patterns that shift throughout the day, animating the minimalist interior.',
  image: "https://images.unsplash.com/photo-1656432630709-b998adb36d6d",
  alt: 'Raw concrete pavilion with deep reveals, dramatic shadows from overhead skylights, minimalist interior',
  materials: 'In-situ Concrete',
  role: 'Designer',
  span: 'normal'
},
{
  id: 'p3',
  title: 'Urban Infill Proposal',
  year: '2024',
  category: 'Competition Entry',
  description: 'A competition entry addressing the challenge of urban densification through a sensitive infill strategy. The facade rhythm responds to the existing streetscape while introducing a contemporary material language.',
  image: "https://images.unsplash.com/photo-1729346495840-471b9f807693",
  alt: 'Dense urban building facade with rhythm of windows and balconies, late afternoon light, city context',
  materials: 'Brick, Steel, Glass',
  role: 'Designer',
  span: 'normal'
},
{
  id: 'p4',
  title: 'Light Corridor Internship',
  year: '2023',
  category: 'Professional Placement',
  description: 'Developed during a professional placement, this corridor project explores how clerestory windows can transform a utilitarian circulation space into an experiential journey through shifting light and shadow.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fab624e4-1772483658963.png",
  alt: 'Long minimalist corridor with clerestory windows casting diagonal light bars across polished concrete floor',
  materials: 'Polished Concrete, Steel',
  role: 'Intern Architect',
  span: 'wide'
},
{
  id: 'p5',
  title: 'Green Envelope Retrofit',
  year: '2023',
  category: 'Sustainable Design',
  description: 'A sustainable retrofit proposal integrating a living green wall system into an existing concrete grid facade. The vertical gardens improve thermal performance while creating a new ecological identity for the building.',
  image: "https://images.unsplash.com/photo-1725529007618-8fa89ad839ad",
  alt: 'Contemporary building facade with integrated green wall system, vertical gardens on concrete grid, bright daylight',
  materials: 'Concrete, Living Wall System',
  role: 'Designer',
  span: 'normal'
},
{
  id: 'p6',
  title: 'Tectonic Fragment',
  year: '2022',
  category: 'Academic — Year 3',
  description: 'A physical model study investigating tectonic expression through the intersection of planes and angular voids. The white card model was developed as part of a third-year studio exploring structural honesty and material authenticity.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_19fb51f96-1775823769438.png",
  alt: 'Architectural model detail with intersecting planes and angular voids, crisp studio lighting, white card model',
  materials: 'White Card, Balsa',
  role: 'Designer',
  span: 'normal'
}];


export default function ArchitectureGallery() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

  const openModal = (project: Project) => {
    const idx = projects.findIndex((p) => p.id === project.id);
    setActiveIndex(idx);
  };

  return (
    <>
      <ProjectModal
        projects={projects}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onPrev={() => setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i))}
        onNext={() => setActiveIndex((i) => (i !== null && i < projects.length - 1 ? i + 1 : i))}
      />

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
              }
              onClick={() => openModal(project)}>

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
      </section>
    </>
  );
}