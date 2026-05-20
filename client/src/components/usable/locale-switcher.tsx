'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const labels: Record<Locale, string> = {
  vi: 'VI',
  en: 'EN',
};

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={cn(
        'inline-flex rounded-lg border border-white/30 bg-white/10 p-1 text-sm font-bold',
        className
      )}
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          className={cn(
            'rounded-md px-3 py-1.5 transition-colors',
            locale === loc
              ? 'bg-brand-yellow text-primary shadow-sm'
              : 'text-white/90 hover:bg-white/15'
          )}
        >
          {labels[loc]}
        </button>
      ))}
    </div>
  );
}
