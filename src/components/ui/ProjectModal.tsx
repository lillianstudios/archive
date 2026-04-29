'use client';

import React, { useEffect, useCallback } from 'react';
import AppImage from '@/components/ui/AppImage';

export interface ModalProject {
  id: string;
  title: string;
  year: string;
  category: string;
  description: string;
  image: string;
  alt: string;
  materials?: string;
  role?: string;
}

interface ProjectModalProps {
  projects: ModalProject[];
  activeIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ProjectModal({ projects, activeIndex, onClose, onPrev, onNext }: ProjectModalProps) {
  const isOpen = activeIndex !== null;
  const project = isOpen ? projects[activeIndex] : null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < projects.length - 1;

  const metaRows = [
    { label: 'YEAR', value: project.year },
    { label: 'CATEGORY', value: project.category },
    ...(project.materials ? [{ label: 'MATERIALS', value: project.materials }] : []),
    ...(project.role ? [{ label: 'ROLE', value: project.role }] : []),
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: 'rgba(26, 28, 32, 0.97)' }}
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 md:px-10 py-5 flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-gray-400">
          {project.category} · {project.year}
        </span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors duration-200 text-xl leading-none"
          aria-label="Close modal"
        >
          ✕
        </button>
      </div>

      {/* Main content */}
      <div
        className="flex flex-col md:flex-row flex-1 overflow-hidden px-6 md:px-10 gap-8 md:gap-12 pb-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left — image (~55%) */}
        <div className="w-full md:w-[55%] flex-shrink-0 relative overflow-hidden rounded-sm"
          style={{ minHeight: '220px', maxHeight: 'calc(100vh - 160px)' }}>
          <AppImage
            src={project.image}
            alt={project.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 55vw"
          />
        </div>

        {/* Right — details */}
        <div className="flex-1 overflow-y-auto flex flex-col justify-start pt-2 md:pt-4 pb-4">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
            {project.title}
          </h2>
          <p className="font-sans text-base text-gray-400 leading-relaxed mb-8 md:mb-10">
            {project.description}
          </p>

          {/* Metadata grid */}
          <div className="mt-auto">
            {metaRows.map((row, i) => (
              <div key={row.label}>
                {i > 0 && <hr className="border-gray-700" />}
                <div className="flex items-start gap-6 py-4">
                  <span className="font-sans text-[10px] font-medium tracking-[0.18em] uppercase text-gray-500 w-24 flex-shrink-0 pt-0.5">
                    {row.label}
                  </span>
                  <span className="font-sans text-base text-white leading-snug">
                    {row.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div
        className="flex items-center justify-between px-6 md:px-10 py-5 flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          className={`font-sans text-[11px] font-medium tracking-[0.18em] uppercase flex items-center gap-2 transition-colors duration-200 ${
            hasPrev ? 'text-white hover:text-gray-300' : 'text-gray-700 cursor-default'
          }`}
        >
          ‹ PREV
        </button>
        <button
          onClick={onNext}
          disabled={!hasNext}
          className={`font-sans text-[11px] font-medium tracking-[0.18em] uppercase flex items-center gap-2 transition-colors duration-200 ${
            hasNext ? 'text-white hover:text-gray-300' : 'text-gray-700 cursor-default'
          }`}
        >
          NEXT ›
        </button>
      </div>
    </div>
  );
}
