import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ContactSection } from '@/features/home/components/contact-section';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <>
      <h1 className="sr-only">{t('page.title')}</h1>
      <ContactSection />
    </>
  );
}
