import type { Metadata } from 'next';
import { Be_Vietnam_Pro, Inter } from 'next/font/google';
import { siteProfile } from '@/config/site-profile';
import './globals.css';

const beVietnam = Be_Vietnam_Pro({
  variable: '--font-display',
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  variable: '--font-body',
  subsets: ['vietnamese', 'latin'],
});

export const metadata: Metadata = {
  title: {
    default: siteProfile.brand.name,
    template: `%s | ${siteProfile.brand.name}`,
  },
  description: siteProfile.brand.description,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  ),
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: siteProfile.brand.name,
    title: siteProfile.brand.name,
    description: siteProfile.brand.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${beVietnam.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
