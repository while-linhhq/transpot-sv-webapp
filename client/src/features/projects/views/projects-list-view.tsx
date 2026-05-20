'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { siteAssets } from '@/config/site-assets';
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
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {(['all', 'image', 'video'] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={
                filter === key
                  ? 'rounded-lg border-2 border-primary bg-primary px-4 py-2 text-sm font-bold text-white'
                  : 'rounded-lg border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground hover:border-primary/40'
              }
            >
              {t(`filters.${key}`)}
            </button>
          ))}
        </div>
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {folders.map((folder) => (
            <button
              key={folder}
              type="button"
              onClick={() => setFolderFilter(folder)}
              className={
                folderFilter === folder
                  ? 'rounded-full border border-brand-yellow bg-brand-yellow px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary'
                  : 'rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted hover:border-brand-yellow/50'
              }
            >
              {folder === 'all' ? t('folderFilters.all') : folder}
            </button>
          ))}
        </div>

        {mediaItems.length === 0 ? (
          <p className="text-center text-muted">{t('empty')}</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
            {mediaItems.map((media, index) => (
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
                      alt={t('imageAlt', { index: index + 1 })}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
