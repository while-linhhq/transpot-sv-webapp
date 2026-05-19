'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { paths } from '@/router/paths';
import { SectionHeading } from '@/components/usable/section-heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { fetchPublishedProjects } from '@/features/projects/services/projects-api';

export function ProjectsTeaser() {
  const { data, isLoading } = useQuery({
    queryKey: ['projects', 'teaser'],
    queryFn: () => fetchPublishedProjects({ limit: 3 }),
  });

  const projects = data?.items ?? [];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Dự án"
          title="DỰ ÁN HOÀN THÀNH"
          description="Một số dự án vận chuyển tiêu biểu gần đây"
        />

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 animate-pulse rounded-2xl bg-slate-200"
              />
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <Link key={project.id} href={paths.projectDetail(project.slug)}>
                <Card className="group h-full overflow-hidden hover:shadow-md">
                  <div className="aspect-video bg-gradient-to-br from-sky-400 to-sky-700" />
                  <CardHeader>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.tags.slice(0, 2).map((tag) => (
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
                    <p className="line-clamp-2 text-sm text-muted">
                      {project.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">
            Chưa có dự án nào được đăng. Quay lại sau nhé!
          </p>
        )}

        <div className="mt-8 text-center">
          <Link href={paths.projects}>
            <Button variant="outline" className="gap-2">
              Xem tất cả dự án
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
