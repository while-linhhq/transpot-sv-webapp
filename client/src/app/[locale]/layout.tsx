import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Be_Vietnam_Pro, Inter } from 'next/font/google';
import { routing } from '@/i18n/routing';
import '../globals.css';

const beVietnam = Be_Vietnam_Pro({
  variable: '--font-display',
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  variable: '--font-body',
  subsets: ['vietnamese', 'latin'],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'site' });
  const tm = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: {
      default: t('brand.name'),
      template: tm('titleTemplate', { brand: t('brand.name') }),
    },
    description: t('brand.description'),
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
    ),
    openGraph: {
      type: 'website',
      locale: tm('ogLocale'),
      siteName: t('brand.name'),
      title: t('brand.name'),
      description: t('brand.description'),
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${beVietnam.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
