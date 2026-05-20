'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Quote } from 'lucide-react';
import { SectionHeading } from '@/components/usable/section-heading';

type Testimonial = {
  image: string;
  name: string;
  location: string;
  content: string;
};

export function TestimonialsSection() {
  const t = useTranslations('home.testimonials');
  const testimonials = t.raw('items') as Testimonial[];

  return (
    <section className="bg-slate-50 pt-8 pb-16 md:pt-10 md:pb-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
          className="mb-6 md:mb-8"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.image}
              className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
            >
              <div className="relative aspect-[9/16] bg-slate-100">
                <Image
                  src={item.image}
                  alt={`${item.name} - ${item.location}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-start gap-2">
                  <Quote className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm leading-relaxed text-muted">{item.content}</p>
                </div>
                <div className="border-t border-border pt-3">
                  <p className="text-sm font-bold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted">{item.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
