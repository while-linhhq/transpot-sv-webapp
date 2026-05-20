import Image from 'next/image';
import { siteProfile } from '@/config/site-profile';
import { cn } from '@/lib/utils';

const sizeMap = {
  sm: { width: 140, height: 48, className: 'h-10 w-auto max-w-[140px]' },
  md: { width: 180, height: 62, className: 'h-12 w-auto max-w-[180px]' },
  lg: { width: 240, height: 82, className: 'h-16 w-auto max-w-[240px]' },
  xl: { width: 320, height: 110, className: 'h-24 w-auto max-w-[min(100%,320px)] md:h-28' },
} as const;

type BrandLogoProps = {
  size?: keyof typeof sizeMap;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  size = 'md',
  className,
  priority = false,
}: BrandLogoProps) {
  const { width, height, className: sizeClass } = sizeMap[size];

  return (
    <Image
      src={siteProfile.brand.logoSrc}
      alt={siteProfile.brand.logoAlt}
      width={width}
      height={height}
      priority={priority}
      className={cn('object-contain object-left', sizeClass, className)}
    />
  );
}
