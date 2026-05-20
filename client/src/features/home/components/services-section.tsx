'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SERVICE_SLUGS } from '@/config/site-config';
import { getServiceImage } from '@/config/site-assets';
import { paths } from '@/router/paths';
import { SectionHeading } from '@/components/usable/section-heading';
import { MobileHorizontalScroll } from '@/components/usable/mobile-horizontal-scroll';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

function ServiceCard({
  slug,
  compact = false,
}: {
  slug: (typeof SERVICE_SLUGS)[number];
  compact?: boolean;
}) {
  const th = useTranslations('home.services');
  const ts = useTranslations('site');
  const imageSrc = getServiceImage(slug);

  return (
    <Link href={paths.serviceDetail(slug)} className="block h-full">
      <Card
        className={cn(
          'group h-full overflow-hidden rounded-2xl border-2 border-border bg-surface shadow-sm transition-all hover:-translate-y-1 hover:border-brand-yellow hover:shadow-lg',
          compact &&
            'rounded-lg border hover:translate-y-0 hover:border-border hover:shadow-sm',
        )}
      >
        {imageSrc && (
          <div
            className={cn(
              'relative aspect-[16/10] overflow-hidden',
              compact && 'aspect-[5/3]',
            )}
          >
            <Image
              src={imageSrc}
              alt={ts(`services.${slug}.title`)}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes={compact ? '280px' : '(max-width: 768px) 100vw, 33vw'}
            />
          </div>
        )}
        <CardHeader className={cn(compact && 'p-2.5 pb-1')}>
          <CardTitle
            className={cn(
              'line-clamp-2 text-lg group-hover:text-primary',
              compact && 'text-sm leading-snug',
            )}
          >
            {ts(`services.${slug}.title`)}
          </CardTitle>
        </CardHeader>
        <CardContent className={cn(compact && 'p-2.5 pt-0')}>
          <p
            className={cn(
              'line-clamp-2 text-sm text-muted',
              compact && 'text-[11px] leading-snug',
            )}
          >
            {ts(`services.${slug}.shortDescription`)}
          </p>
          <span
            className={cn(
              'mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent',
              compact && 'mt-1.5 text-[11px]',
            )}
          >
            {th('viewDetail')}
            <ArrowRight className={cn('h-4 w-4', compact && 'h-3 w-3')} />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}

export function ServicesSection() {
  const th = useTranslations('home.services');
  const tc = useTranslations('common');

  return (
    <section className="py-16 md:py-24 max-md:py-4">
      <div className="mx-auto max-w-7xl px-4 max-md:px-3">
        <SectionHeading
          eyebrow={th('eyebrow')}
          title={th('title')}
          description={th('description')}
          className="max-md:mb-4"
        />

        <MobileHorizontalScroll
          hint={tc('labels.swipeHint')}
          ariaLabel={th('title')}
          fadeFromClassName="from-background"
        >
          {SERVICE_SLUGS.map((slug) => (
            <div key={slug} className="w-[58vw] max-w-[210px] shrink-0 snap-start">
              <ServiceCard slug={slug} compact />
            </div>
          ))}
        </MobileHorizontalScroll>

        <div className="hidden grid-cols-2 gap-6 md:grid lg:grid-cols-3">
          {SERVICE_SLUGS.map((slug) => (
            <ServiceCard key={slug} slug={slug} />
          ))}
        </div>
      </div>
    </section>
  );
}
