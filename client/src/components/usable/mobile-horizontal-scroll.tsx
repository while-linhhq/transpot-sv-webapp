'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type MobileHorizontalScrollProps = {
  hint: string;
  ariaLabel?: string;
  fadeFromClassName?: string;
  className?: string;
  children: ReactNode;
};

export function MobileHorizontalScroll({
  hint,
  ariaLabel,
  fadeFromClassName = 'from-background',
  className,
  children,
}: MobileHorizontalScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: true });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const syncEdges = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setEdges({
        left: scrollLeft > 4,
        right: scrollLeft + clientWidth < scrollWidth - 4,
      });
    };

    syncEdges();
    el.addEventListener('scroll', syncEdges, { passive: true });
    window.addEventListener('resize', syncEdges);

    return () => {
      el.removeEventListener('scroll', syncEdges);
      window.removeEventListener('resize', syncEdges);
    };
  }, []);

  return (
    <div className="md:hidden">
      <p
        className="mb-2 flex items-center justify-center gap-1 text-[11px] font-semibold text-primary/80"
        aria-hidden="true"
      >
        <ChevronLeft className="h-3.5 w-3.5 shrink-0 opacity-70" />
        <span className="text-center leading-snug">{hint}</span>
        <ChevronRight className="h-3.5 w-3.5 shrink-0 motion-safe:animate-swipe-hint" />
      </p>

      <div className="relative">
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-y-0 left-0 z-10 w-5 bg-gradient-to-r to-transparent transition-opacity duration-200',
            fadeFromClassName,
            edges.left ? 'opacity-100' : 'opacity-0',
          )}
        />
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l to-transparent transition-opacity duration-200',
            fadeFromClassName,
            edges.right ? 'opacity-100' : 'opacity-0',
          )}
        />

        <div
          ref={scrollRef}
          aria-label={ariaLabel}
          className={cn(
            'scrollbar-none -mx-3 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-3 pb-1',
            className,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
