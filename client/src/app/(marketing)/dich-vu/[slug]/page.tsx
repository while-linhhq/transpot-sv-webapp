import { notFound } from 'next/navigation';
import { getServiceContent } from '@/features/services/data/service-content';
import { ServiceDetailView } from '@/features/services/views/service-detail-view';
import { siteProfile } from '@/config/site-profile';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return siteProfile.services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceContent(slug);
  if (!service) return { title: 'Không tìm thấy' };
  return {
    title: service.title,
    description: service.heroDescription,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceContent(slug);
  if (!service) notFound();
  return <ServiceDetailView service={service} />;
}
