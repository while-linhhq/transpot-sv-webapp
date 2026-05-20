import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getServiceContent } from '@/features/services/lib/get-service-content';
import { ServiceDetailView } from '@/features/services/views/service-detail-view';
import { SERVICE_SLUGS } from '@/config/site-config';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return SERVICE_SLUGS.flatMap((slug) =>
    ['vi', 'en'].map((locale) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  const service = await getServiceContent(slug);

  if (!service) return { title: t('notFound') };

  return {
    title: service.title,
    description: service.heroDescription,
  };
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = await getServiceContent(slug);
  if (!service) notFound();

  return <ServiceDetailView service={service} />;
}
