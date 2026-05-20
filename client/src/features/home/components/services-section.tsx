'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SERVICE_SLUGS } from '@/config/site-config';
import { getServiceImage } from '@/config/site-assets';
import { paths } from '@/router/paths';
import { SectionHeading } from '@/components/usable/section-heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ServicesSection() {
  const th = useTranslations('home.services');
  const ts = useTranslations('site');

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow={th('eyebrow')}
          title={th('title')}
          description={th('description')}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_SLUGS.map((slug) => {
            const imageSrc = getServiceImage(slug);
            return (
              <Link key={slug} href={paths.serviceDetail(slug)}>
                <Card className="group h-full overflow-hidden rounded-2xl border-2 border-border bg-surface shadow-sm transition-all hover:-translate-y-1 hover:border-brand-yellow hover:shadow-lg">
                  {imageSrc && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={imageSrc}
                        alt={ts(`services.${slug}.title`)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="line-clamp-2 group-hover:text-primary">
                      {ts(`services.${slug}.title`)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 text-sm text-muted">
                      {ts(`services.${slug}.shortDescription`)}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                      {th('viewDetail')}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
