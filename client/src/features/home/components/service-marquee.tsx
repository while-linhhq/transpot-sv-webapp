'use client';

import type { CSSProperties } from 'react';
import { useTranslations } from 'next-intl';

/** Nhiều bản sao để tổng chiều ngang > viewport — tránh khoảng trống sau item cuối khi loop */
const MARQUEE_COPIES = 6;
const MARQUEE_DURATION_S = 32;

export function ServiceMarquee() {
  const t = useTranslations('home.marquee');
  const items = t.raw('items') as string[];

  const flat = Array.from({ length: MARQUEE_COPIES }, () => items).flat();

  const trackStyle = {
    '--marquee-segments': MARQUEE_COPIES,
    '--marquee-duration': `${MARQUEE_DURATION_S}s`,
  } as CSSProperties;

  return (
    <section className="relative z-20 border-y-2 border-accent bg-brand-yellow py-1 max-md:py-0.5 md:py-2">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-black/20" />
      <div className="overflow-hidden">
        <div className="marquee-track flex w-max flex-nowrap items-center" style={trackStyle}>
          {flat.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap px-2 text-[10px] font-extrabold uppercase tracking-wide text-foreground max-md:gap-2 sm:px-4 sm:text-xs md:text-sm"
            >
              {index > 0 && <span className="text-accent">•</span>}
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
