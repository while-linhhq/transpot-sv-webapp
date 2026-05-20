import type { MetadataRoute } from 'next';
import { SERVICE_SLUGS } from '@/config/site-config';
import { routing } from '@/i18n/routing';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

const staticPaths = ['', '/du-an-hoan-thanh', '/lien-he'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;

    for (const path of staticPaths) {
      entries.push({
        url: `${BASE_URL}${prefix}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.8,
      });
    }

    for (const slug of SERVICE_SLUGS) {
      entries.push({
        url: `${BASE_URL}${prefix}/dich-vu/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return entries;
}
