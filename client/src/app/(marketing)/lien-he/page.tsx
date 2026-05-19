import { ContactSection } from '@/features/home/components/contact-section';
import { SectionHeading } from '@/components/usable/section-heading';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liên hệ',
  description: 'Liên hệ Vận chuyển Lê Đạt để được báo giá và tư vấn miễn phí',
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-sky-600 to-sky-800 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="LIÊN HỆ"
            description="Chúng tôi sẵn sàng hỗ trợ 24/7"
            align="left"
            className="text-white [&_h2]:text-white [&_p]:text-sky-100"
          />
        </div>
      </section>
      <ContactSection />
    </>
  );
}
