'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { CheckCircle2, Phone } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/config/site-config';
import { paths } from '@/router/paths';
import { Button } from '@/components/ui/button';
import { Accordion } from '@/components/ui/accordion';
import { SectionHeading } from '@/components/usable/section-heading';
import type { ServiceContent } from '../lib/get-service-content';

export function ServiceDetailView({ service }: { service: ServiceContent }) {
  const t = useTranslations('services.detail');

  return (
    <>
      <section className="bg-gradient-to-br from-slate-950 via-[#102a61] to-primary-dark py-16 text-white shadow-inner md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div>
            <p className="mb-2 text-sm font-semibold tracking-wide text-amber-200/95">
              {t('breadcrumb')}
            </p>
            <h1 className="text-4xl font-extrabold md:text-6xl">{service.title}</h1>
            <p className="mt-4 max-w-3xl text-xl font-semibold text-slate-100 md:text-2xl">
              {service.heroDescription}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {service.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border border-brand-yellow bg-brand-yellow/25 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-brand-yellow shadow-sm"
                >
                  {highlight}
                </span>
              ))}
            </div>
            <a href={siteConfig.contact.hotlines[0].href} className="mt-7 inline-block">
              <Button variant="accent" size="lg" className="gap-2">
                <Phone className="h-5 w-5" />
                {t('contactQuote')}
              </Button>
            </a>
          </div>

          <div className="rounded-2xl border border-white/35 bg-black/35 p-5 shadow-lg backdrop-blur-md">
            <h2 className="text-2xl font-extrabold">{t('executionTimelineTitle')}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.timeline.map((item) => (
                <div key={item.label} className="rounded-xl border border-white/15 bg-white/12 p-3">
                  <p className="text-sm font-bold uppercase tracking-wide text-amber-100/95">
                    {item.label}
                  </p>
                  <p className="mt-1 text-lg font-extrabold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title={t('overviewTitle')} align="left" />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div className="space-y-4 rounded-2xl border-2 border-slate-200 bg-surface p-5 shadow-sm md:p-6">
              {service.overview.map((paragraph) => (
                <p key={paragraph} className="text-lg font-semibold leading-relaxed text-foreground">
                  {paragraph}
                </p>
              ))}
              <div className="pt-2">
                <h3 className="mb-3 text-xl font-extrabold text-foreground">{t('realMedia')}</h3>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {service.media.slice(0, 6).map((media, index) => (
                    <article
                      key={`${media.src}-${index}`}
                      className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm"
                    >
                      <div className="relative aspect-[3/4] bg-slate-100">
                        {media.type === 'video' ? (
                          <video
                            src={media.src}
                            className="h-full w-full object-cover"
                            controls
                            preload="metadata"
                            playsInline
                            muted
                          />
                        ) : (
                          <Image
                            src={media.src}
                            alt={`${service.title} ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 33vw"
                          />
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-2xl border-2 border-amber-300 bg-amber-100/85 p-5 shadow-sm md:p-6">
              <h3 className="text-xl font-extrabold text-foreground">{t('checklistTitle')}</h3>
              <ul className="mt-4 space-y-3">
                {service.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base font-semibold text-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-200/80 py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="space-y-10 rounded-2xl border-2 border-slate-300 bg-white p-5 shadow-md md:p-7">
            <div>
              <SectionHeading title={t('benefits')} align="left" className="mb-6" />
              <div className="grid gap-4 sm:grid-cols-2">
                {service.benefits.map((benefit) => (
                  <article
                    key={benefit}
                    className="rounded-xl border-2 border-slate-200 bg-slate-50 p-4"
                  >
                    <p className="text-base font-semibold leading-relaxed text-foreground">{benefit}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <SectionHeading title={t('commitmentsTitle')} align="left" className="mb-6" />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {service.commitments.map((item) => (
                  <article
                    key={item}
                    className="rounded-xl border-2 border-slate-200 bg-slate-50 p-4 text-base font-extrabold text-foreground"
                  >
                    {item}
                  </article>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <SectionHeading title={t('process')} align="left" className="mb-6" />
              <ol className="grid gap-4 md:grid-cols-2">
                {service.process.map((step, index) => (
                  <li
                    key={step}
                    className="rounded-xl border-2 border-slate-200 bg-slate-50 p-4"
                  >
                    <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-extrabold text-white shadow">
                      {index + 1}
                    </span>
                    <p className="text-base font-semibold leading-relaxed text-foreground">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border-t border-border pt-8">
              <SectionHeading title={t('faq')} align="left" className="mb-6" />
              <div className="max-w-3xl">
                <Accordion
                  items={service.faqs.map((faq) => ({
                    title: faq.question,
                    content: faq.answer,
                  }))}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t-2 border-slate-200 bg-gradient-to-b from-amber-100 to-amber-50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="mb-4 text-xl font-bold">
            {t('ctaTitle', { service: service.title })}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={siteConfig.contact.hotlines[0].href}>
              <Button>
                {t('callHotline', { hotline: siteConfig.contact.hotlines[0].display })}
              </Button>
            </a>
            <Link href={paths.pricing}>
              <Button variant="outline">{t('viewPricing')}</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
