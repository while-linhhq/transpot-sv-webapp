import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProjectBySlug } from '@/lib/server-api';
import { ProjectDetailView } from '@/features/projects/views/project-detail-view';

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Không tìm thấy' };
  return {
    title: project.title,
    description: project.excerpt ?? undefined,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  return <ProjectDetailView project={project} />;
}
