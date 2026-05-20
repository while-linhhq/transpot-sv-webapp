'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Quote } from 'lucide-react';
import { SectionHeading } from '@/components/usable/section-heading';
import { MobileHorizontalScroll } from '@/components/usable/mobile-horizontal-scroll';

type Testimonial = {
  image: string;
  name: string;
  location: string;
  content: string;
};

function TestimonialCard({
  item,
  compact,
}: {
  item: Testimonial;
  compact?: boolean;
}) {
  return (
    <article
      className={
        compact
          ? 'flex h-full shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm'
          : 'overflow-hidden rounded-2xl border border-border bg-surface shadow-sm'
      }
    >
      <div className="relative w-full shrink-0 bg-slate-100">
        <Image
          src={item.image}
          alt={`${item.name} - ${item.location}`}
          width={828}
          height={1792}
          className="h-auto w-full object-contain"
          sizes={
            compact
              ? '200px'
              : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          }
        />
      </div>
      <div className={compact ? 'flex flex-1 flex-col p-2.5' : 'space-y-3 p-5'}>
        <div className="flex items-start gap-1.5">
          <Quote
            className={
              compact
                ? 'mt-0.5 h-3.5 w-3.5 shrink-0 text-primary'
                : 'mt-0.5 h-5 w-5 shrink-0 text-primary'
            }
          />
          <p
            className={
              compact
                ? 'line-clamp-3 text-[11px] leading-snug text-muted'
                : 'text-sm leading-relaxed text-muted'
            }
          >
            {item.content}
          </p>
        </div>
        <div className={compact ? 'mt-auto border-t border-border pt-2' : 'border-t border-border pt-3'}>
          <p className={compact ? 'text-[11px] font-bold text-foreground' : 'text-sm font-bold text-foreground'}>
            {item.name}
          </p>
          <p className={compact ? 'text-[10px] text-muted' : 'text-xs text-muted'}>
            {item.location}
          </p>
        </div>
      </div>
    </article>
  );
}

export function TestimonialsSection() {
  const t = useTranslations('home.testimonials');
  const tc = useTranslations('common');
  const testimonials = t.raw('items') as Testimonial[];

  return (
    <section className="bg-slate-50 py-4 max-md:py-3 sm:py-10 md:pb-24">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
          className="mb-4 max-md:mb-3 md:mb-8"
        />

        <MobileHorizontalScroll
          hint={tc('labels.swipeHint')}
          ariaLabel={t('title')}
          fadeFromClassName="from-slate-50"
        >
          {testimonials.map((item) => (
            <div key={item.image} className="w-[56vw] max-w-[200px] shrink-0 snap-start">
              <TestimonialCard item={item} compact />
            </div>
          ))}
        </MobileHorizontalScroll>

        {/* Tablet+ */}
        <div className="hidden gap-4 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <TestimonialCard key={item.image} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
