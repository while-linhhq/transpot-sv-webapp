import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { paths } from '@/router/paths';
import { SectionHeading } from '@/components/usable/section-heading';
import { Button } from '@/components/ui/button';

export function ProjectsTeaser() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Dự án"
          title="DỰ ÁN HOÀN THÀNH"
          description="Một số dự án vận chuyển tiêu biểu gần đây"
        />
        <p className="text-center text-muted">
          Hình ảnh dự án sẽ được cập nhật sớm.
        </p>
        <div className="mt-8 text-center">
          <Link href={paths.projects}>
            <Button variant="outline" className="gap-2">
              Xem trang dự án
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
