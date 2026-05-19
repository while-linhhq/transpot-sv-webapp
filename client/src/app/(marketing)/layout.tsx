import { SiteHeader } from '@/components/usable/site-header';
import { SiteFooter } from '@/components/usable/site-footer';
import { FloatingCta } from '@/components/usable/floating-cta';
import { LocalBusinessJsonLd } from '@/components/usable/json-ld';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LocalBusinessJsonLd />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <FloatingCta />
    </>
  );
}
