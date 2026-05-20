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
    <section className="relative overflow-hidden bg-primary py-16 text-white md:py-24">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(245,197,24,0.12)_0%,transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow={th('eyebrow')}
              title={th('title')}
              description={th('description')}
              align="left"
              className="mb-8 [&_h2]:text-white [&_h2]:[text-shadow:0_2px_12px_rgba(0,0,0,0.45)] [&_h2_span]:bg-none [&_h2_span]:text-white [&_h2_span]:[text-shadow:0_2px_12px_rgba(0,0,0,0.45)] [&_p.inline-block]:bg-brand-yellow [&_p.inline-block]:text-primary [&_p.inline-block]:font-extrabold [&_p.inline-block]:ring-1 [&_p.inline-block]:ring-brand-yellow/80 [&_p.inline-block]:shadow-[0_2px_8px_rgba(0,0,0,0.25)] [&_p.text-lg]:font-semibold [&_p.text-lg]:text-white/95"
            />
            <ul className="grid gap-3 sm:grid-cols-2">
              {usp.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-yellow" />
                  <span className="text-sm leading-relaxed text-blue-50">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-xl lg:max-w-2xl">
            <div className="absolute -inset-2 rounded-3xl bg-brand-yellow opacity-80" />
            <div className="relative overflow-hidden rounded-3xl border-4 border-brand-yellow bg-slate-900 shadow-2xl">
              <div className="relative aspect-[3/4]">
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
