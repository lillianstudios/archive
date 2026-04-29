'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

interface Photo {
  id: string;
  title: string;
  series: string;
  image: string;
  alt: string;
}

const photos: Photo[] = [
{
  id: 'ph1',
  title: 'Colonnade, Dublin',
  series: 'Built Environment',
  image: "https://images.unsplash.com/photo-1717658943692-a7713dd058b5",
  alt: 'Underground brutalist colonnade with massive concrete pillars, solitary figure walking toward brilliant light source at far end, geometric floor pattern'
},
{
  id: 'ph2',
  title: 'Atlantic Shore, Connemara',
  series: 'Coastal',
  image: "https://images.unsplash.com/photo-1629732316002-a58ae9a59d15",
  alt: 'Wide Atlantic beach with turquoise shallow water and white sand, bright overcast light, vast open sky'
},
{
  id: 'ph3',
  title: 'Window Study I',
  series: 'Light & Shadow',
  image: "https://images.unsplash.com/photo-1498247253003-6ee55c706fd2",
  alt: 'Minimalist interior with deep-set window casting sharp rectangular light pattern on concrete wall, strong geometric shadow'
},
{
  id: 'ph4',
  title: 'Concrete Ceiling, Galway',
  series: 'Built Environment',
  image: "https://images.unsplash.com/photo-1676422765574-2818349f03f0",
  alt: 'Looking up at raw concrete ceiling structure with intersecting beams, dramatic low-key industrial lighting, deep shadows'
},
{
  id: 'ph5',
  title: 'Fern Frond, Burren',
  series: 'Flora',
  image: "https://images.unsplash.com/photo-1713274843564-ffafc618174f",
  alt: 'Close-up of unfurling fern frond against soft green bokeh background, delicate natural form, diffused forest light'
},
{
  id: 'ph6',
  title: 'Facade Rhythm',
  series: 'Built Environment',
  image: "https://images.unsplash.com/photo-1602796430054-9112780c6d54",
  alt: 'Repetitive window grid on modernist building facade, flat bright daylight, geometric abstract composition'
},
{
  id: 'ph7',
  title: 'Dusk Silhouette, Aran',
  series: 'Coastal',
  image: "https://images.unsplash.com/photo-1664723828502-0cd7b8334b54",
  alt: 'Dramatic dusk sky over island landscape, warm orange and purple tones, silhouetted dry stone walls in foreground'
},
{
  id: 'ph8',
  title: 'Stairwell, ATU',
  series: 'Light & Shadow',
  image: "https://images.unsplash.com/photo-1676049938042-44cc51faf43f",
  alt: 'Minimalist institutional stairwell with clerestory light, clean white walls, long diagonal shadow cast across steps'
}];


export default function PhotographyGrid() {
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
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Asymmetric two-column layout: alternate tall/short
  const leftCol = photos.filter((_, i) => i % 2 === 0);
  const rightCol = photos.filter((_, i) => i % 2 !== 0);

  return (
    <section className="bg-background py-16 md:py-20">
      <div className="px-6 md:px-10 max-w-screen-xl mx-auto">
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
              className="reveal-fade group cursor-pointer">

                <div
                className="relative overflow-hidden gallery-item mb-3"
                style={{ aspectRatio: index % 2 === 0 ? '4/5' : '3/2' }}>

                  <AppImage
                  src={photo.image}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy" />

                </div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-sans text-sm font-medium text-foreground">{photo.title}</h3>
                  <span className="font-sans text-xs text-muted-foreground">{photo.series}</span>
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
              className="reveal-fade group cursor-pointer">

                <div
                className="relative overflow-hidden gallery-item mb-3"
                style={{ aspectRatio: index % 2 === 0 ? '3/2' : '4/5' }}>

                  <AppImage
                  src={photo.image}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy" />

                </div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-sans text-sm font-medium text-foreground">{photo.title}</h3>
                  <span className="font-sans text-xs text-muted-foreground">{photo.series}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}