'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { siteAssets } from '@/config/site-assets';
import { GalleryMediaTile } from '@/components/usable/gallery-media-tile';
import { SectionHeading } from '@/components/usable/section-heading';

function getFolderFromSrc(src: string) {
  const parts = src.split('/').filter(Boolean);
  return parts[0] ?? 'khac';
}

export function ProjectsListView() {
  const t = useTranslations('projects.list');
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [folderFilter, setFolderFilter] = useState<string>('all');

  const folders = useMemo(() => {
    const unique = new Set(siteAssets.galleryMedia.map((item) => getFolderFromSrc(item.src)));
    return ['all', ...Array.from(unique)];
  }, []);

  const mediaItems = useMemo(() => {
    return siteAssets.galleryMedia.filter((item) => {
      const matchType = filter === 'all' ? true : item.type === filter;
      const matchFolder =
        folderFilter === 'all' ? true : getFolderFromSrc(item.src) === folderFilter;
      return matchType && matchFolder;
    });
  }, [filter, folderFilter]);

  return (
    <section className="py-5 max-md:py-4 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />
        <div className="mb-5 flex flex-wrap justify-center gap-2 sm:mb-6">
          {(['all', 'image', 'video'] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={
                filter === key
                  ? 'min-h-10 rounded-lg border-2 border-primary bg-primary px-3 py-2 text-sm font-bold text-white sm:px-4'
                  : 'min-h-10 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-semibold text-foreground hover:border-primary/40 sm:px-4'
              }
            >
              {t(`filters.${key}`)}
            </button>
          ))}
        </div>
        <div className="-mx-1 mb-6 flex gap-2 overflow-x-auto overscroll-x-contain px-1 pb-1 sm:mx-0 sm:mb-8 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0">
          {folders.map((folder) => (
            <button
              key={folder}
              type="button"
              onClick={() => setFolderFilter(folder)}
              className={
                folderFilter === folder
                  ? 'shrink-0 rounded-full border border-brand-yellow bg-brand-yellow px-3 py-2 text-xs font-bold uppercase tracking-wide text-primary sm:py-1'
                  : 'shrink-0 rounded-full border border-border bg-surface px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted hover:border-brand-yellow/50 sm:py-1'
              }
            >
              {folder === 'all' ? t('folderFilters.all') : folder}
            </button>
          ))}
        </div>

        {mediaItems.length === 0 ? (
          <p className="text-center text-muted">{t('empty')}</p>
        ) : (
          <div className="grid grid-cols-4 gap-1 max-md:grid-cols-4 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-4">
            {mediaItems.map((media, index) => (
              <GalleryMediaTile
                key={`${media.src}-${index}`}
                media={media}
                alt={t('imageAlt', { index: index + 1 })}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="max-md:rounded-sm"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
