'use client';

import { useTranslations } from 'next-intl';
import { Mail, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '@/config/site-config';
import { SectionHeading } from '@/components/usable/section-heading';
import { Button } from '@/components/ui/button';
import { HotlineLinks } from '@/components/usable/hotline-links';

export function ContactSection() {
  const th = useTranslations('home.contact');
  const tc = useTranslations('common');
  const ts = useTranslations('site');

  return (
    <section className="border-t-4 border-brand-yellow bg-gradient-to-b from-amber-50/60 to-background py-5 max-md:py-4 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <SectionHeading
          eyebrow={th('eyebrow')}
          title={th('title')}
          description={th('description')}
        />
        <div className="grid gap-4 max-md:gap-3 sm:gap-8 lg:grid-cols-2">
          <div className="space-y-3 rounded-lg border border-border bg-surface p-2.5 shadow-sm max-md:space-y-2.5 sm:space-y-6 sm:rounded-2xl sm:p-6">
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-primary sm:mt-1 sm:h-5 sm:w-5" />
              <div>
                <p className="text-xs font-semibold sm:text-base">{tc('labels.hotline')}</p>
                <HotlineLinks
                  layout="inline"
                  separator="bar"
                  linkClassName="text-base font-bold text-accent hover:underline max-md:text-sm"
                  className="flex flex-wrap items-baseline gap-x-1 gap-y-0.5"
                />
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold">{tc('labels.email')}</p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-primary hover:underline"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold">{tc('labels.address')}</p>
                <p className="text-muted">{ts('contact.address')}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 pt-2 sm:flex-row sm:flex-wrap sm:gap-3">
              <a href={siteConfig.contact.hotlines[0].href} className="w-full sm:w-auto">
                <Button className="h-11 w-full sm:w-auto">{tc('cta.callNow')}</Button>
              </a>
              <a
                href={siteConfig.contact.zaloHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="outline" className="h-11 w-full sm:w-auto">
                  {tc('cta.zalo')}
                </Button>
              </a>
            </div>
          </div>
          <div className="min-h-[220px] overflow-hidden rounded-2xl border border-border shadow-sm sm:min-h-[280px] lg:min-h-0">
            <iframe
              title={tc('labels.map')}
              src={siteConfig.map.embedUrl}
              className="h-[140px] w-full max-md:h-[140px] sm:h-[360px] lg:h-[400px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
