import { siteProfile } from '@/config/site-profile';

export function LocalBusinessJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    name: siteProfile.brand.name,
    image: `${siteUrl}${siteProfile.brand.logoSrc}`,
    logo: `${siteUrl}${siteProfile.brand.logoSrc}`,
    description: siteProfile.brand.description,
    telephone: siteProfile.contact.hotlines.map((line) => line.display),
    email: siteProfile.contact.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Đà Nẵng',
      addressCountry: 'VN',
      streetAddress: siteProfile.contact.address,
    },
    areaServed: 'Đà Nẵng và các tỉnh lân cận',
    priceRange: '$$',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
