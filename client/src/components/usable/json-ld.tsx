import { siteProfile } from '@/config/site-profile';

export function LocalBusinessJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    name: siteProfile.brand.name,
    description: siteProfile.brand.description,
    telephone: siteProfile.contact.hotline,
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
