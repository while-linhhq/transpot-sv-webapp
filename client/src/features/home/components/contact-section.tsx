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
    <section className="border-t-4 border-brand-yellow bg-gradient-to-b from-amber-50/60 to-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow={th('eyebrow')}
          title={th('title')}
          description={th('description')}
        />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6 rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <Phone className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold">{tc('labels.hotline')}</p>
                <HotlineLinks
                  layout="inline"
                  separator="bar"
                  linkClassName="text-lg font-bold text-accent hover:underline"
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
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={siteConfig.contact.hotlines[0].href}>
                <Button>{tc('cta.callNow')}</Button>
              </a>
              <a
                href={siteConfig.contact.zaloHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">{tc('cta.zalo')}</Button>
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <iframe
              title={tc('labels.map')}
              src={siteConfig.map.embedUrl}
              className="h-[400px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
