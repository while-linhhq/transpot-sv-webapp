import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/config/site-config';

export async function LocalBusinessJsonLd() {
  const t = await getTranslations('site');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    name: t('brand.name'),
    image: `${siteUrl}${siteConfig.brand.logoSrc}`,
    logo: `${siteUrl}${siteConfig.brand.logoSrc}`,
    description: t('brand.description'),
    telephone: siteConfig.contact.hotlines.map((line) => line.display),
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: t('jsonLd.addressLocality'),
      addressCountry: 'VN',
      streetAddress: t('contact.address'),
    },
    areaServed: t('jsonLd.areaServed'),
    priceRange: '$$',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
