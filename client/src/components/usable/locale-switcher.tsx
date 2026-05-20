'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

function shouldUseFullLocaleNavigation() {
  if (typeof window === 'undefined') return false;
  const h = window.location.hostname;
  return h !== 'localhost' && h !== '127.0.0.1';
}

function switchLocale(pathname: string, locale: Locale) {
  const base = window.location.origin;
  const path =
    locale === routing.defaultLocale
      ? pathname
      : `/${locale}${pathname === '/' ? '' : pathname}`;
  window.location.assign(`${base}${path}`);
}

const labels: Record<Locale, string> = {
  vi: 'VI',
  en: 'EN',
};

export function LocaleSwitcher({
  className,
  variant = 'bar',
}: {
  className?: string;
  variant?: 'bar' | 'surface';
}) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const isBar = variant === 'bar';

  return (
    <div
      className={cn(
        'inline-flex rounded-lg p-1 text-sm font-bold',
        isBar
          ? 'border border-white/30 bg-white/10'
          : 'border border-border bg-surface shadow-sm',
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => {
            if (loc === locale) return;
            if (shouldUseFullLocaleNavigation()) {
              switchLocale(pathname, loc);
              return;
            }
            router.replace(pathname, { locale: loc });
          }}
          className={cn(
            'min-h-9 min-w-[2.75rem] rounded-md px-3 py-1.5 transition-colors touch-manipulation',
            locale === loc
              ? 'bg-brand-yellow text-primary shadow-sm'
              : isBar
                ? 'text-white/90 hover:bg-white/15'
                : 'text-muted hover:bg-amber-50 hover:text-foreground',
          )}
        >
          {labels[loc]}
        </button>
      ))}
    </div>
  );
}
