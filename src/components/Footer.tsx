import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 md:px-10 py-8">
        <p className="text-[11px] font-sans font-medium tracking-[0.14em] uppercase text-muted-foreground">
          © 2026 LILLIAN STUDIO ARCHIVE
        </p>
        <nav className="flex items-center gap-6">
          <Link
            href="/architecture"
            className="text-[11px] font-sans font-medium tracking-[0.14em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Architecture
          </Link>
          <span className="text-muted-foreground text-xs">·</span>
          <Link
            href="/photography"
            className="text-[11px] font-sans font-medium tracking-[0.14em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Photography
          </Link>
          <span className="text-muted-foreground text-xs">·</span>
          <Link
            href="/homepage"
            className="text-[11px] font-sans font-medium tracking-[0.14em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Art
          </Link>
        </nav>
      </div>
    </footer>
  );
}