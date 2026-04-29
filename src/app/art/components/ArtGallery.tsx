'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import ProjectModal, { ModalProject } from '@/components/ui/ProjectModal';

const artworks: ModalProject[] = [
{
  id: 'a1',
  title: 'Threshold Study I',
  year: '2025',
  category: 'Paintings',
  description: 'An abstract oil painting exploring the architectural concept of threshold through warm ochre and burnt sienna tones. Gestural brushstrokes suggest the liminal quality of a doorway — the moment between inside and outside.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_185e88dfe-1772211403255.png",
  alt: 'Abstract oil painting with warm ochre and burnt sienna tones, gestural brushstrokes suggesting architectural threshold and light',
  materials: 'Oil on Canvas',
  role: 'Artist'
},
{
  id: 'a2',
  title: 'Structural Fragment',
  year: '2025',
  category: 'Models',
  description: 'A white card architectural model investigating the intersection of planes and angular voids. The crisp studio lighting emphasises the precision of the cuts and the play of shadow across the folded surfaces.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_19fb51f96-1775823769438.png",
  alt: 'White card architectural model with intersecting planes and angular voids, crisp studio lighting on white surface',
  materials: 'White Card, Balsa',
  role: 'Model Maker'
},
{
  id: 'a3',
  title: 'Section Through Light',
  year: '2024',
  category: 'Architectural Drawings',
  description: 'A detailed architectural section drawing in pencil revealing interior spaces animated by light shafts. Human scale figures ground the composition, emphasising the spatial quality of the design.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1307ff846-1765796419291.png",
  alt: 'Detailed architectural section drawing in pencil showing interior spaces with light shafts and human scale figures',
  materials: 'Pencil on Cartridge Paper',
  role: 'Draughtsperson'
},
{
  id: 'a4',
  title: 'Material Study II',
  year: '2024',
  category: 'Paintings',
  description: 'An abstract mixed media painting exploring texture and material through layered acrylic and graphite on raw canvas. The work investigates the tactile qualities of architectural materials — concrete, timber, and stone.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1232b013a-1772147416298.png",
  alt: 'Abstract mixed media painting exploring texture and material with layered acrylic and graphite on raw canvas',
  materials: 'Acrylic, Graphite on Canvas',
  role: 'Artist'
},
{
  id: 'a5',
  title: 'Pavilion Maquette',
  year: '2024',
  category: 'Models',
  description: 'A delicate timber and card pavilion maquette with fine structural members. The model explores a lightweight canopy structure, photographed against a neutral grey background to emphasise the elegance of the structural system.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_150e693ba-1777484335350.png",
  alt: 'Delicate timber and card pavilion maquette with fine structural members, photographed against neutral grey background',
  materials: 'Timber, White Card',
  role: 'Model Maker'
},
{
  id: 'a6',
  title: 'Elevation — Coastal House',
  year: '2023',
  category: 'Architectural Drawings',
  description: 'A precise ink elevation drawing of a coastal house with hatched shadows and hand-lettered annotations. The drawing communicates the material palette and proportional system of the design with technical clarity.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_14a47f32e-1777484333467.png",
  alt: 'Precise ink elevation drawing of coastal house with hatched shadows, hand-lettered annotations and scale bar',
  materials: 'Ink on Tracing Paper',
  role: 'Draughtsperson'
},
{
  id: 'a7',
  title: 'Gestural Landscape',
  year: '2023',
  category: 'Paintings',
  description: 'A large format gestural painting in muted greens and greys evoking the Irish landscape. Expressive mark-making captures the atmospheric quality of the west of Ireland — its shifting light, bogland, and coastal drama.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1540f333d-1777484333129.png",
  alt: 'Large format gestural painting in muted greens and greys evoking Irish landscape, expressive mark-making',
  materials: 'Acrylic on Canvas',
  role: 'Artist'
},
{
  id: 'a8',
  title: 'Tectonic Model III',
  year: '2022',
  category: 'Models',
  description: 'An abstract tectonic study model in white plaster showing folded and fractured surfaces. Directional studio lighting reveals the depth of the relief, exploring how structural forces might be expressed through material deformation.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e053760b-1777484332433.png",
  alt: 'Abstract tectonic study model in white plaster showing folded and fractured surfaces, directional studio lighting',
  materials: 'Plaster',
  role: 'Model Maker'
}];


export default function ArtGallery() {
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

  const leftCol = artworks.filter((_, i) => i % 2 === 0);
  const rightCol = artworks.filter((_, i) => i % 2 !== 0);

  const openModal = (work: ModalProject) => {
    const idx = artworks.findIndex((a) => a.id === work.id);
    setActiveIndex(idx);
  };

  return (
    <>
      <ProjectModal
        projects={artworks}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onPrev={() => setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i))}
        onNext={() => setActiveIndex((i) => (i !== null && i < artworks.length - 1 ? i + 1 : i))}
      />

      <section className="bg-background py-16 md:py-20">
        <div className="px-6 md:px-10 max-w-screen-xl mx-auto">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-6 mb-12 border-b border-border pb-6">
            {['ALL', 'PAINTINGS', 'MODELS', 'ARCHITECTURAL DRAWINGS'].map((tab) =>
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
              {leftCol.map((work, index) =>
              <div
                key={work.id}
                ref={(el) => {itemRefs.current[index * 2] = el;}}
                className="reveal-fade group cursor-pointer"
                onClick={() => openModal(work)}>

                  <div
                  className="relative overflow-hidden gallery-item mb-3"
                  style={{ aspectRatio: index % 2 === 0 ? '4/5' : '3/2' }}>

                    <AppImage
                    src={work.image}
                    alt={work.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy" />

                  </div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-sans text-sm font-medium text-foreground">{work.title}</h3>
                    <span className="font-sans text-xs text-muted-foreground">{work.year}</span>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground tracking-wide mt-0.5">{work.category}</p>
                </div>
              )}
            </div>

            {/* Right column — offset */}
            <div className="flex flex-col gap-8 md:gap-12 md:mt-16">
              {rightCol.map((work, index) =>
              <div
                key={work.id}
                ref={(el) => {itemRefs.current[index * 2 + 1] = el;}}
                className="reveal-fade group cursor-pointer"
                onClick={() => openModal(work)}>

                  <div
                  className="relative overflow-hidden gallery-item mb-3"
                  style={{ aspectRatio: index % 2 === 0 ? '3/2' : '4/5' }}>

                    <AppImage
                    src={work.image}
                    alt={work.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy" />

                  </div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-sans text-sm font-medium text-foreground">{work.title}</h3>
                    <span className="font-sans text-xs text-muted-foreground">{work.year}</span>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground tracking-wide mt-0.5">{work.category}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}