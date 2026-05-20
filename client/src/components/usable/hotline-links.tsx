import { Fragment } from 'react';
import { siteProfile } from '@/config/site-profile';
import { cn } from '@/lib/utils';

type HotlineLinksProps = {
  className?: string;
  linkClassName?: string;
  separator?: string;
  layout?: 'inline' | 'stack';
};

export function HotlineLinks({
  className,
  linkClassName,
  separator = ' · ',
  layout = 'inline',
}: HotlineLinksProps) {
  const { hotlines } = siteProfile.contact;

  if (layout === 'stack') {
    return (
      <span className={cn('flex flex-col gap-1', className)}>
        {hotlines.map((line) => (
          <a
            key={line.href}
            href={line.href}
            className={cn('font-bold hover:underline', linkClassName)}
          >
            {line.display}
          </a>
        ))}
      </span>
    );
  }

  return (
    <span className={className}>
      {hotlines.map((line, index) => (
        <Fragment key={line.href}>
          {index > 0 && <span className="opacity-80">{separator}</span>}
          <a href={line.href} className={cn('font-bold hover:underline', linkClassName)}>
            {line.display}
          </a>
        </Fragment>
      ))}
    </span>
  );
}
