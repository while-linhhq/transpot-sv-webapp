'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Truck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteProfile } from '@/config/site-profile';

type GalleryImageCardProps = {
  src: string;
  alt: string;
  index: number;
  featured?: boolean;
};

export function GalleryImageCard({
  src,
  alt,
  index,
  featured = false,
}: GalleryImageCardProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          'relative flex aspect-[4/3] flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-brand-yellow bg-gradient-to-br from-primary to-primary/80 p-4 text-white shadow-md',
          featured && 'md:col-span-2 md:row-span-2'
        )}
      >
        <Truck className="mb-2 h-10 w-10 opacity-80" />
        <span className="text-sm font-semibold">{alt}</span>
        <span className="mt-1 text-xs opacity-80">{siteProfile.brand.name}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border-2 border-border shadow-md ring-0 ring-brand-yellow/0 transition-all hover:border-brand-yellow hover:shadow-lg hover:ring-4 hover:ring-brand-yellow/30',
        featured
          ? 'col-span-2 row-span-2 h-full min-h-[280px] md:min-h-0'
          : 'h-full min-h-[140px]'
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes={
          featured
            ? '(max-width: 768px) 100vw, 66vw'
            : '(max-width: 768px) 50vw, 33vw'
        }
        onError={() => setFailed(true)}
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent p-3 pt-10">
        <span className="line-clamp-2 text-sm font-semibold text-white">{alt}</span>
      </div>
    </div>
  );
}
