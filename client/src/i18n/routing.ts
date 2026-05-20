import { defineRouting } from 'next-intl/routing';

export const locales = ['vi', 'en'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'vi',
  localePrefix: 'as-needed',
  // Always serve Vietnamese at `/` unless user picks `/en` or uses locale switcher
  localeDetection: false,
});
