'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '@/components/usable/section-heading';

const USP_AUTO_ADVANCE_MS = 4_500;

const USP_SLIDES = [
  '/ảnh và video bổ sung/z7842868467525_b71a6e43527a42448c270c716bd86dc4.jpg',
  '/ảnh và video bổ sung/z7842868505326_9e3aca2e3f5955cb291bb1c354f7d29f.jpg',
  '/ảnh và video bổ sung/z7842868571659_086428f3afcaa5bcf2dde7c26831049d.jpg',
  '/ảnh và video bổ sung/z7842868608755_8d2c1e2675d7f630c680e31ec5698daa.jpg',
] as const;

export function UspSection() {
  const th = useTranslations('home.usp');
  const usp = useTranslations('site').raw('usp') as string[];
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (USP_SLIDES.length <= 1) return;
    const id = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % USP_SLIDES.length);
    }, USP_AUTO_ADVANCE_MS);

    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-primary py-5 text-white max-md:py-4 sm:py-16 md:py-24">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(245,197,24,0.12)_0%,transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-3 sm:px-4">
        <div className="grid items-center gap-5 max-md:gap-4 sm:gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="max-md:order-2">
            <SectionHeading
              eyebrow={th('eyebrow')}
              title={th('title')}
              description={th('description')}
              align="left"
              className="mb-5 max-md:mb-4 md:mb-8 [&_h2]:text-white [&_h2]:[text-shadow:0_2px_12px_rgba(0,0,0,0.45)] [&_h2_span]:bg-none [&_h2_span]:text-white [&_h2_span]:[text-shadow:0_2px_12px_rgba(0,0,0,0.45)] [&_p.inline-block]:bg-brand-yellow [&_p.inline-block]:text-primary [&_p.inline-block]:font-extrabold [&_p.inline-block]:ring-1 [&_p.inline-block]:ring-brand-yellow/80 [&_p.inline-block]:shadow-[0_2px_8px_rgba(0,0,0,0.25)] [&_p:not(.inline-block)]:text-sm [&_p:not(.inline-block)]:font-semibold [&_p:not(.inline-block)]:leading-relaxed [&_p:not(.inline-block)]:text-white [&_p:not(.inline-block)]:[text-shadow:0_1px_4px_rgba(0,0,0,0.55)] sm:[&_p:not(.inline-block)]:text-lg"
            />
            <ul className="grid gap-1.5 max-md:grid-cols-2 sm:grid-cols-2 sm:gap-3">
              {usp.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-1.5 rounded-md border border-white/15 bg-white/10 p-2 backdrop-blur-sm max-md:py-1.5 sm:gap-3 sm:rounded-xl sm:p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-yellow sm:h-5 sm:w-5" />
                  <span className="text-[10px] leading-snug text-blue-50 max-md:line-clamp-3 sm:text-sm sm:leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto w-full max-md:order-1 max-md:max-w-sm sm:max-w-md md:max-w-xl lg:mx-0 lg:max-w-none">
            <div className="absolute -inset-1 rounded-xl bg-brand-yellow opacity-80 sm:-inset-2 sm:rounded-3xl" />
            <div className="relative overflow-hidden rounded-xl border-2 border-brand-yellow bg-slate-900 shadow-xl sm:rounded-3xl sm:border-4 sm:shadow-2xl">
              <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] lg:min-h-[420px]">
                {USP_SLIDES.map((src, idx) => (
                  <Image
                    key={src}
                    src={src}
                    alt={th('imageAlt')}
                    fill
                    className={
                      idx === slideIndex
                        ? 'object-contain opacity-100 transition-opacity duration-700 ease-in-out'
                        : 'object-contain opacity-0 transition-opacity duration-700 ease-in-out'
                    }
                    sizes="(max-width: 1024px) 100vw, 560px"
                    priority={idx === 0}
                  />
                ))}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/35 to-transparent" />
                {USP_SLIDES.length > 1 ? (
                  <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-2">
                    {USP_SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        aria-label={`Slide ${idx + 1}`}
                        aria-selected={idx === slideIndex}
                        onClick={() => setSlideIndex(idx)}
                        className={
                          idx === slideIndex
                            ? 'h-2.5 w-2.5 rounded-full bg-white ring-2 ring-white/90'
                            : 'h-2.5 w-2.5 rounded-full bg-white/45 ring-2 ring-white/80'
                        }
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
