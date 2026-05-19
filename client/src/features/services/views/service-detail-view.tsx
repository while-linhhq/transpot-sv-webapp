import Link from 'next/link';
import { Phone } from 'lucide-react';
import { siteProfile } from '@/config/site-profile';
import { paths } from '@/router/paths';
import { Button } from '@/components/ui/button';
import { Accordion } from '@/components/ui/accordion';
import { SectionHeading } from '@/components/usable/section-heading';
import type { ServiceContent } from '../data/service-content';

export function ServiceDetailView({ service }: { service: ServiceContent }) {
  return (
    <>
      <section className="bg-gradient-to-br from-sky-600 to-sky-800 py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <p className="mb-2 text-sm font-medium text-sky-200">Dịch vụ</p>
          <h1 className="text-4xl font-bold md:text-5xl">{service.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-sky-100">
            {service.heroDescription}
          </p>
          <a href={siteProfile.contact.hotlineHref} className="mt-6 inline-block">
            <Button variant="accent" size="lg" className="gap-2">
              <Phone className="h-5 w-5" />
              Liên hệ báo giá
            </Button>
          </a>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Lợi ích" align="left" />
          <ul className="grid gap-4 sm:grid-cols-2">
            {service.benefits.map((benefit) => (
              <li
                key={benefit}
                className="rounded-xl border border-border bg-surface p-4 text-muted"
              >
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Quy trình thực hiện" align="left" />
          <ol className="space-y-4">
            {service.process.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span className="pt-1 text-muted">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHeading title="Câu hỏi thường gặp" align="left" />
          <Accordion
            items={service.faqs.map((faq) => ({
              title: faq.question,
              content: faq.answer,
            }))}
          />
        </div>
      </section>

      <section className="border-t border-border bg-sky-50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="mb-4 text-lg font-medium">
            Cần tư vấn thêm về {service.title}?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={siteProfile.contact.hotlineHref}>
              <Button>Gọi {siteProfile.contact.hotline}</Button>
            </a>
            <Link href={paths.pricing}>
              <Button variant="outline">Xem bảng giá</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
