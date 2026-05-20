import { Fragment } from 'react';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site-config';
import { cn } from '@/lib/utils';

type HotlineLinksProps = {
  className?: string;
  linkClassName?: string;
  separator?: 'or' | 'bar';
  layout?: 'inline' | 'stack';
};

export function HotlineLinks({
  className,
  linkClassName,
  separator = 'or',
  layout = 'inline',
}: HotlineLinksProps) {
  const t = useTranslations('common');
  const { hotlines } = siteConfig.contact;
  const sep = separator === 'bar' ? t('hotlineSep.bar') : t('hotlineSep.or');

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
          {index > 0 && <span className="opacity-80">{sep}</span>}
          <a href={line.href} className={cn('font-bold hover:underline', linkClassName)}>
            {line.display}
          </a>
        </Fragment>
      ))}
    </span>
  );
}
