'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { siteAssets } from '@/config/site-assets';
import { paths } from '@/router/paths';
import { SectionHeading } from '@/components/usable/section-heading';

export function GallerySection() {
  const th = useTranslations('home.gallery');
  const captions = th.raw('alts') as string[];
  const featuredMedia = siteAssets.galleryMedia.slice(0, 12);

  return (
    <section className="bg-gradient-to-b from-amber-50/80 to-background pt-8 pb-8 md:pt-10 md:pb-10">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow={th('eyebrow')}
          title={th('title')}
          description={th('description')}
          className="mb-6 md:mb-8"
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {featuredMedia.map((media, index) => (
            <article
              key={`${media.src}-${index}`}
              className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm"
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
                    alt={captions[index] ?? th('fallbackAlt', { index: index + 1 })}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                )}
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href={paths.projects}
            className="inline-flex items-center justify-center rounded-xl border-2 border-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-primary transition-colors hover:bg-primary hover:text-white"
          >
            {th('viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
