'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, MessageCircle, Phone, Shield } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/config/site-config';
import { paths } from '@/router/paths';
import { Button } from '@/components/ui/button';
import { BrandLogo } from '@/components/usable/brand-logo';
import { cn } from '@/lib/utils';

const HERO_AUTO_ADVANCE_MS = 5_000;

type HeroSlide = {
  src: string;
  objectPosition: string;
};

const HERO_SLIDES: HeroSlide[] = [
  {
    src: '/file ảnh , video chuyển nhà/477571391_620893267365320_7131657903643879955_n.jpg',
    objectPosition: '50% 40%',
  },
  {
    src: '/images/875c0bc486e107bf5ef028.jpg',
    objectPosition: '50% 60%',
  },
  {
    src: '/file ảnh , video chuyển nhà/487552364_1855572948531580_1450942284952090609_n (1).jpg',
    objectPosition: '50% 70%',
  },
  {
    src: '/ảnh và video bổ sung/z7842892386435_69630d4b74ef30b400bd6fe000465bae.jpg',
    objectPosition: '50% 52%',
  },
];

export function HeroSection() {
  const t = useTranslations('site');
  const th = useTranslations('home.hero');
  const tc = useTranslations('common');
  const locale = useLocale();
  const { contact } = siteConfig;
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    if (HERO_SLIDES.length <= 1) return;
    const id = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, HERO_AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, []);

  const hotlineText = contact.hotlines.map((h) => h.display).join(
    locale === 'vi' ? ' hoặc ' : ' or '
  );

  return (
    <section
      className="relative isolate -mt-[122px] h-[100svh] overflow-hidden pt-[122px] sm:-mt-[114px] sm:pt-[114px] lg:-mt-[98px] lg:pt-[98px]"
      aria-roledescription="carousel"
      aria-label={th('carouselLabel')}
    >
      {HERO_SLIDES.map((slide, idx) => (
        <Image
          key={`${idx}-${slide.src}`}
          src={slide.src}
          alt={th('imageAlt')}
          fill
          className={cn(
            'object-cover brightness-100 saturate-105 transition-opacity duration-700 ease-in-out',
            idx === heroIndex ? 'z-10 opacity-100' : 'z-0 opacity-0',
          )}
          style={{ objectPosition: slide.objectPosition }}
          sizes="100vw"
          priority
          loading="eager"
        />
      ))}
      <div className="absolute inset-0 bg-slate-950/52" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/64 via-black/36 to-black/16" />
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-yellow via-primary to-accent" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-3xl rounded-2xl bg-transparent px-4 py-4 backdrop-blur-0 transition-all duration-300 hover:bg-black/20 hover:backdrop-blur-[2px] md:px-6 md:py-6 xl:max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-yellow/80 bg-brand-yellow/25 px-4 py-1.5 text-base font-extrabold text-white shadow-sm backdrop-blur-sm [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
            <Shield className="h-4 w-4 text-brand-yellow" />
            {t('brand.tagline')}
          </div>

          <BrandLogo size="xl" priority className="mb-5" />
          <h1 className="sr-only">{t('brand.name')}</h1>

          <p className="mt-4 text-lg font-semibold leading-relaxed text-white/95 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)] sm:text-xl md:text-2xl">
            {t('brand.description')}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {siteConfig.brand.priceTiers.map((tier) => (
              <span
                key={tier}
                className="rounded-lg border border-white/35 bg-white/20 px-3 py-1 text-base font-extrabold text-white backdrop-blur-sm [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]"
              >
                {tier}
              </span>
            ))}
            <span className="rounded-lg bg-accent px-3 py-1 text-base font-extrabold text-white shadow-sm [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">
              {t('brand.priceFromLabel', { price: siteConfig.brand.priceFrom })}
            </span>
          </div>

          <p className="mt-4 text-lg font-extrabold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5)] md:text-xl">
            {th('callPrompt', { hotlines: hotlineText })}
          </p>

          <div className="mt-7 flex flex-wrap gap-3 md:mt-8">
            <a href={contact.hotlines[0].href}>
              <Button size="lg" variant="accent" className="gap-2 text-lg font-extrabold">
                <Phone className="h-5 w-5" />
                {tc('cta.callQuote')}
              </Button>
            </a>
            <a href={contact.zaloHref} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="yellow" className="gap-2 text-lg font-extrabold">
                <MessageCircle className="h-5 w-5" />
                {tc('cta.zalo')}
              </Button>
            </a>
            <Link
              href={paths.pricing}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-white/70 px-8 text-lg font-extrabold text-white transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white [text-shadow:0_1px_2px_rgba(0,0,0,0.4)]"
            >
              {tc('cta.pricing')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </div>

      {HERO_SLIDES.length > 1 ? (
        <div
          className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2 sm:bottom-5 md:bottom-6"
          role="tablist"
          aria-label={th('carouselDotsLabel')}
        >
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={idx === heroIndex}
              aria-label={th('carouselGoToSlide', { n: idx + 1 })}
              onClick={() => setHeroIndex(idx)}
              className={cn(
                'h-2.5 w-2.5 rounded-full ring-2 ring-white/80 transition-all',
                idx === heroIndex ? 'scale-110 bg-white' : 'bg-white/45 hover:bg-white/70',
              )}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
