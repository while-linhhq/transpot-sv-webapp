import { SectionHeading } from '@/components/usable/section-heading';

export function ProjectsListView() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Portfolio"
          title="DỰ ÁN HOÀN THÀNH"
          description="Các dự án vận chuyển, chuyển nhà đã hoàn thành"
        />
        <p className="text-center text-muted">
          Hình ảnh dự án sẽ được cập nhật sớm. Liên hệ hotline để xem thêm thực tế.
        </p>
      </div>
    </section>
  );
}
