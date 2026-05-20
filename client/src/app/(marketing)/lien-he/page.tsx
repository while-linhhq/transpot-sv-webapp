import { ContactSection } from '@/features/home/components/contact-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liên hệ',
  description: 'Liên hệ Vận chuyển Lê Đạt để được báo giá và tư vấn miễn phí',
};

export default function ContactPage() {
  return (
    <>
      <h1 className="sr-only">LIÊN HỆ</h1>
      <ContactSection />
    </>
  );
}
