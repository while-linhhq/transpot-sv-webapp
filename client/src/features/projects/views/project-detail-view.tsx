'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { paths } from '@/router/paths';
import { Badge } from '@/components/ui/badge';
import type { Project } from '../services/projects-api';

export function ProjectDetailView({ project }: { project: Project }) {
  return (
    <article className="py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4">
        <Link
          href={paths.projects}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại dự án
        </Link>

        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-3xl font-bold md:text-4xl">{project.title}</h1>

        {project.publishedAt && (
          <p className="mt-2 text-sm text-muted">
            {new Date(project.publishedAt).toLocaleDateString('vi-VN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}

        {project.excerpt && (
          <p className="mt-4 text-lg text-muted leading-relaxed">{project.excerpt}</p>
        )}

        <div
          className="prose-content mt-8"
          dangerouslySetInnerHTML={{ __html: project.contentHtml }}
        />
      </div>
    </article>
  );
}
