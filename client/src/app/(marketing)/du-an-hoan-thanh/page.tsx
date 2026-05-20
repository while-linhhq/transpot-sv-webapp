import { ProjectsListView } from '@/features/projects/views/projects-list-view';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dự án hoàn thành',
  description: 'Các dự án vận chuyển, chuyển nhà đã hoàn thành của Vận chuyển Lê Đạt',
};

export default function ProjectsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-sky-600 to-sky-800 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-sm font-medium text-sky-200">Portfolio</p>
          <h1 className="mt-2 text-4xl font-bold">Dự án hoàn thành</h1>
        </div>
      </section>
      <ProjectsListView />
    </>
  );
}
