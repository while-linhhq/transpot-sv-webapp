'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { siteAssets } from '@/config/site-assets';
import { paths } from '@/router/paths';
import { GalleryMediaTile } from '@/components/usable/gallery-media-tile';
import { SectionHeading } from '@/components/usable/section-heading';

export function GallerySection() {
  const th = useTranslations('home.gallery');
  const captions = th.raw('alts') as string[];
  const featuredMedia = siteAssets.galleryMedia.slice(0, 12);
  const featuredMediaMobile = featuredMedia.slice(0, 8);

  return (
    <section className="bg-gradient-to-b from-amber-50/80 to-background py-4 max-md:py-3 sm:py-10">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <SectionHeading
          eyebrow={th('eyebrow')}
          title={th('title')}
          description={th('description')}
          className="mb-4 max-md:mb-3 md:mb-8"
        />

        <div className="grid grid-cols-4 gap-1 md:hidden">
          {featuredMediaMobile.map((media, index) => (
            <GalleryMediaTile
              key={`${media.src}-${index}`}
              media={media}
              alt={captions[index] ?? th('fallbackAlt', { index: index + 1 })}
              sizes="25vw"
            />
          ))}
        </div>

        <div className="hidden grid-cols-3 gap-3 md:grid lg:grid-cols-4 lg:gap-4">
          {featuredMedia.map((media, index) => (
            <GalleryMediaTile
              key={`${media.src}-${index}`}
              media={media}
              alt={captions[index] ?? th('fallbackAlt', { index: index + 1 })}
              sizes="(max-width: 1024px) 33vw, 25vw"
            />
          ))}
        </div>

        <div className="mt-4 text-center max-md:mt-3 sm:mt-8">
          <Link
            href={paths.projects}
            className="inline-flex min-h-9 w-full items-center justify-center rounded-lg border-2 border-primary px-4 py-2 text-xs font-bold uppercase tracking-wide text-primary transition-colors hover:bg-primary hover:text-white max-md:max-w-xs sm:min-h-11 sm:w-auto sm:rounded-xl sm:px-6 sm:py-3 sm:text-sm"
          >
            {th('viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
