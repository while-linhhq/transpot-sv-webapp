'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ImageIcon, Play } from 'lucide-react';
import type { GalleryMediaItem } from '@/config/site-assets';
import { isGalleryImageUnoptimized } from '@/lib/gallery-media';
import { cn } from '@/lib/utils';

type GalleryMediaTileProps = {
  media: GalleryMediaItem;
  alt: string;
  sizes: string;
  className?: string;
  aspectClassName?: string;
};

export function GalleryMediaTile({
  media,
  alt,
  sizes,
  className,
  aspectClassName = 'aspect-[3/4] max-md:aspect-square',
}: GalleryMediaTileProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <article
      className={cn(
        'overflow-hidden rounded-sm border border-border bg-surface shadow-sm md:rounded-xl',
        className,
      )}
    >
      <div className={cn('relative w-full bg-slate-200', aspectClassName)}>
        {media.type === 'video' ? (
          <>
            {media.poster ? (
              <Image
                src={media.poster}
                alt=""
                fill
                aria-hidden
                className={cn(
                  'object-cover transition-opacity duration-300',
                  videoPlaying ? 'opacity-0' : 'opacity-100',
                )}
                sizes={sizes}
                unoptimized={isGalleryImageUnoptimized(media.poster)}
              />
            ) : null}
            <video
              src={media.src}
              poster={media.poster}
              className="absolute inset-0 h-full w-full object-cover"
              controls
              preload="metadata"
              playsInline
              onPlay={() => setVideoPlaying(true)}
              onPause={() => setVideoPlaying(false)}
              onEnded={() => setVideoPlaying(false)}
            />
            {!videoPlaying ? (
              <div
                className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/25"
                aria-hidden
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-primary shadow-md md:h-12 md:w-12">
                  <Play className="ml-0.5 h-5 w-5 fill-current md:h-6 md:w-6" />
                </span>
              </div>
            ) : null}
          </>
        ) : imageFailed ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-100 p-2 text-center text-muted">
            <ImageIcon className="h-6 w-6 opacity-60" aria-hidden />
            <span className="line-clamp-2 text-[10px] font-medium leading-snug md:text-xs">
              {alt}
            </span>
          </div>
        ) : (
          <Image
            src={media.src}
            alt={alt}
            fill
            className="object-cover"
            sizes={sizes}
            unoptimized={isGalleryImageUnoptimized(media.src)}
            onError={() => setImageFailed(true)}
          />
        )}
      </div>
    </article>
  );
}
