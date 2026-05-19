import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { siteProfile } from '@/config/site-profile';
import { getServiceImage } from '@/config/site-assets';
import { paths } from '@/router/paths';
import { SectionHeading } from '@/components/usable/section-heading';

export function ServicesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Dịch vụ"
          title="DỊCH VỤ VẬN CHUYỂN"
          description="Tài sản của bạn là danh dự và uy tín của chúng tôi — đồng phục vàng, xe tải chuyên dụng"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteProfile.services.map((service) => {
            const imageSrc = getServiceImage(service.slug);
            return (
              <Link
                key={service.slug}
                href={paths.serviceDetail(service.slug)}
                className="group overflow-hidden rounded-2xl border-2 border-border bg-surface shadow-sm transition-all hover:-translate-y-1 hover:border-brand-yellow hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-primary/5">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                  <h3 className="absolute bottom-3 left-3 right-3 text-lg font-bold text-white drop-shadow">
                    {service.title}
                  </h3>
                </div>
                <div className="p-4">
                  <p className="text-sm leading-relaxed text-muted">
                    {service.shortDescription}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary">
                    Xem chi tiết
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
