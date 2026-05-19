'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { paths } from '@/router/paths';
import { SectionHeading } from '@/components/usable/section-heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fetchPublishedProjects } from '../services/projects-api';

export function ProjectsListView() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['projects', 'published'],
    queryFn: () => fetchPublishedProjects({ limit: 24 }),
  });

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Portfolio"
          title="DỰ ÁN HOÀN THÀNH"
          description="Các dự án vận chuyển, chuyển nhà đã hoàn thành"
        />

        {isLoading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-56 animate-pulse rounded-2xl bg-slate-200" />
            ))}
          </div>
        )}

        {error && (
          <p className="text-center text-red-600">
            Không thể tải dự án. Vui lòng thử lại sau.
          </p>
        )}

        {data && data.items.length === 0 && (
          <p className="text-center text-muted">Chưa có dự án nào được đăng.</p>
        )}

        {data && data.items.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.items.map((project) => (
              <Link key={project.id} href={paths.projectDetail(project.slug)}>
                <Card className="group h-full overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-sky-400 to-sky-700" />
                  <CardHeader>
                    <div className="mb-2 flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="line-clamp-2 group-hover:text-primary">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-sm text-muted">
                      {project.excerpt}
                    </p>
                    {project.publishedAt && (
                      <p className="mt-3 text-xs text-muted">
                        {new Date(project.publishedAt).toLocaleDateString('vi-VN')}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
