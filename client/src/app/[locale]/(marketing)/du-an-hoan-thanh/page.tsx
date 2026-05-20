import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ProjectsListView } from '@/features/projects/views/projects-list-view';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('projects');

  return (
    <>
      <h1 className="sr-only">{t('page.title')}</h1>
      <ProjectsListView />
    </>
  );
}
