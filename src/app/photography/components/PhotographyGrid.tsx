'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import ProjectModal, { ModalProject } from '@/components/ui/ProjectModal';

const photos: ModalProject[] = [
{
  id: 'ph1',
  title: 'Colonnade, Dublin',
  year: '2023',
  category: 'Built Environment',
  description: 'A study of the underground brutalist colonnade — massive concrete pillars framing a solitary figure walking toward a brilliant light source. The geometry of the floor pattern amplifies the sense of depth and scale.',
  image: "https://images.unsplash.com/photo-1717658943692-a7713dd058b5",
  alt: 'Underground brutalist colonnade with massive concrete pillars, solitary figure walking toward brilliant light source at far end, geometric floor pattern',
  role: 'Photographer'
},
{
  id: 'ph2',
  title: 'Atlantic Shore, Connemara',
  year: '2022',
  category: 'Coastal',
  description: 'Wide Atlantic beach with turquoise shallow water and white sand under a vast overcast sky. The stillness of the scene captures the raw, unhurried quality of the west of Ireland coastline.',
  image: "https://images.unsplash.com/photo-1629732316002-a58ae9a59d15",
  alt: 'Wide Atlantic beach with turquoise shallow water and white sand, bright overcast light, vast open sky',
  role: 'Photographer'
},
{
  id: 'ph3',
  title: 'Window Study I',
  year: '2023',
  category: 'Light & Shadow',
  description: 'A minimalist interior study exploring the relationship between a deep-set window and the sharp rectangular light pattern it casts on a concrete wall. Strong geometric shadows define the composition.',
  image: "https://images.unsplash.com/photo-1498247253003-6ee55c706fd2",
  alt: 'Minimalist interior with deep-set window casting sharp rectangular light pattern on concrete wall, strong geometric shadow',
  role: 'Photographer'
},
{
  id: 'ph4',
  title: 'Concrete Ceiling, Galway',
  year: '2023',
  category: 'Built Environment',
  description: 'Looking up at a raw concrete ceiling structure with intersecting beams under dramatic low-key industrial lighting. The deep shadows and exposed material texture reveal the honest beauty of brutalist construction.',
  image: "https://images.unsplash.com/photo-1676422765574-2818349f03f0",
  alt: 'Looking up at raw concrete ceiling structure with intersecting beams, dramatic low-key industrial lighting, deep shadows',
  role: 'Photographer'
},
{
  id: 'ph5',
  title: 'Fern Frond, Burren',
  year: '2022',
  category: 'Flora',
  description: 'A close-up of an unfurling fern frond against a soft green bokeh background. The delicate natural form is captured in diffused forest light, emphasising the spiral geometry found in nature.',
  image: "https://images.unsplash.com/photo-1713274843564-ffafc618174f",
  alt: 'Close-up of unfurling fern frond against soft green bokeh background, delicate natural form, diffused forest light',
  role: 'Photographer'
},
{
  id: 'ph6',
  title: 'Facade Rhythm',
  year: '2024',
  category: 'Built Environment',
  description: 'A repetitive window grid on a modernist building facade under flat bright daylight. The image reduces architecture to pure geometric abstraction — a study in rhythm, repetition, and proportion.',
  image: "https://images.unsplash.com/photo-1602796430054-9112780c6d54",
  alt: 'Repetitive window grid on modernist building facade, flat bright daylight, geometric abstract composition',
  role: 'Photographer'
},
{
  id: 'ph7',
  title: 'Dusk Silhouette, Aran',
  year: '2022',
  category: 'Coastal',
  description: 'A dramatic dusk sky over the Aran Islands, with warm orange and purple tones silhouetting dry stone walls in the foreground. The image captures the timeless, elemental quality of the island landscape.',
  image: "https://images.unsplash.com/photo-1664723828502-0cd7b8334b54",
  alt: 'Dramatic dusk sky over island landscape, warm orange and purple tones, silhouetted dry stone walls in foreground',
  role: 'Photographer'
},
{
  id: 'ph8',
  title: 'Stairwell, ATU',
  year: '2023',
  category: 'Light & Shadow',
  description: 'A minimalist institutional stairwell with clerestory light casting a long diagonal shadow across clean white steps. The composition distils the stairwell to its essential geometry of light, shadow, and movement.',
  image: "https://images.unsplash.com/photo-1676049938042-44cc51faf43f",
  alt: 'Minimalist institutional stairwell with clerestory light, clean white walls, long diagonal shadow cast across steps',
  role: 'Photographer'
}];


export default function PhotographyGrid() {
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
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const leftCol = photos.filter((_, i) => i % 2 === 0);
  const rightCol = photos.filter((_, i) => i % 2 !== 0);

  const openModal = (photo: ModalProject) => {
    const idx = photos.findIndex((p) => p.id === photo.id);
    setActiveIndex(idx);
  };

  return (
    <>
      <ProjectModal
        projects={photos}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onPrev={() => setActiveIndex((i) => i !== null && i > 0 ? i - 1 : i)}
        onNext={() => setActiveIndex((i) => i !== null && i < photos.length - 1 ? i + 1 : i)} />


      <section className="bg-background py-16 md:py-20">
        <div className="px-6 md:px-10 max-w-screen-xl mx-auto">

          {/* Photography Club President note */}
          <div className="mb-10 flex items-center gap-3">
            <span className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-primary">
              Former Photography Club President
            </span>
            <span className="font-sans text-[11px] text-muted-foreground tracking-wide">
              · 2021 · Form 6
            </span>
          </div>

          {/* Series filter bar */}
          <div className="flex flex-wrap gap-6 mb-12 border-b border-border pb-6">
            {['ALL', 'BUILDINGS', 'LIGHTS', 'BEACHES', 'FLORA', 'OTHERS'].map((tab) =>
            <button
              key={tab}
              className={`font-sans text-[11px] font-medium tracking-[0.16em] uppercase transition-colors duration-200 ${
              tab === 'ALL' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`
              }>
                {tab}
              </button>
            )}
          </div>

          {/* Two-column asymmetric grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Left column */}
            <div className="flex flex-col gap-8 md:gap-12">
              {leftCol.map((photo, index) =>
              <div
                key={photo.id}
                ref={(el) => {itemRefs.current[index * 2] = el;}}
                className="reveal-fade group cursor-pointer"
                onClick={() => openModal(photo)}>

                  <div
                  className="relative overflow-hidden gallery-item mb-3"
                  style={{ aspectRatio: index % 2 === 0 ? '4/5' : '3/2' }}>

                    <AppImage
                    src={photo.image}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy" />

                  </div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-sans text-sm font-medium text-foreground">{photo.title}</h3>
                    <span className="font-sans text-xs text-muted-foreground">{photo.category}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right column — offset */}
            <div className="flex flex-col gap-8 md:gap-12 md:mt-16">
              {rightCol.map((photo, index) =>
              <div
                key={photo.id}
                ref={(el) => {itemRefs.current[index * 2 + 1] = el;}}
                className="reveal-fade group cursor-pointer"
                onClick={() => openModal(photo)}>

                  <div
                  className="relative overflow-hidden gallery-item mb-3"
                  style={{ aspectRatio: index % 2 === 0 ? '3/2' : '4/5' }}>

                    <AppImage
                    src={photo.image}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy" />

                  </div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-sans text-sm font-medium text-foreground">{photo.title}</h3>
                    <span className="font-sans text-xs text-muted-foreground">{photo.category}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>);

}