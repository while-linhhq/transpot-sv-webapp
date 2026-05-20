'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { paths } from '@/router/paths';
import { SectionHeading } from '@/components/usable/section-heading';
import { Button } from '@/components/ui/button';

export function ProjectsTeaser() {
  const th = useTranslations('home.projectsTeaser');

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow={th('eyebrow')}
          title={th('title')}
          description={th('description')}
        />
        <p className="text-center text-muted">{th('empty')}</p>
        <div className="mt-8 text-center">
          <Link href={paths.projects}>
            <Button variant="outline" className="gap-2">
              {th('viewAll')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
