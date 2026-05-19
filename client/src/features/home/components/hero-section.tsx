import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Phone, Shield } from 'lucide-react';
import { siteProfile } from '@/config/site-profile';
import { siteAssets } from '@/config/site-assets';
import { paths } from '@/router/paths';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const { brand, contact } = siteProfile;

  return (
    <section className="relative overflow-hidden bg-[#fffdf7]">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-yellow via-primary to-accent" />

      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-yellow/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-brand-yellow bg-brand-yellow/30 px-4 py-1.5 text-sm font-bold text-foreground shadow-sm">
            <Shield className="h-4 w-4 text-primary" />
            {brand.tagline}
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-[3.25rem]">
            <span className="text-primary">Taxi Tải</span>{' '}
            <span className="text-accent">{brand.shortName}</span>
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-muted md:text-xl">
            {brand.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {brand.priceTiers.map((tier) => (
              <span
                key={tier}
                className="rounded-lg border border-primary/20 bg-white px-3 py-1 text-sm font-bold text-primary shadow-sm"
              >
                {tier}
              </span>
            ))}
            <span className="rounded-lg bg-accent px-3 py-1 text-sm font-bold text-white shadow-sm">
              Từ {brand.priceFrom}
            </span>
          </div>

          <p className="mt-4 text-base font-semibold">
            Gọi ngay{' '}
            <a
              href={contact.hotlineHref}
              className="text-accent hover:underline"
            >
              {contact.hotline}
            </a>{' '}
            — báo giá miễn phí
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={contact.hotlineHref}>
              <Button size="lg" variant="accent" className="gap-2">
                <Phone className="h-5 w-5" />
                Gọi báo giá
              </Button>
            </a>
            <a
              href={contact.zaloHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="yellow" className="gap-2">
                <MessageCircle className="h-5 w-5" />
                Chat Zalo
              </Button>
            </a>
            <Link href={paths.pricing}>
              <Button size="lg" variant="outline" className="gap-2">
                Bảng giá
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-2 rounded-[1.75rem] bg-gradient-to-br from-brand-yellow via-primary to-accent opacity-90 blur-sm" />
          <div className="relative overflow-hidden rounded-3xl border-4 border-brand-yellow shadow-2xl">
            <div className="relative aspect-[4/3]">
              <Image
                src={siteAssets.hero}
                alt="Đội ngũ Taxi Tải Lê Đạt — vận chuyển Đà Nẵng"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-end justify-between gap-2 p-4 md:p-5">
              <div className="rounded-xl bg-brand-yellow px-4 py-2 text-center shadow-lg">
                <p className="text-xs font-bold uppercase tracking-wide text-primary">
                  Phục vụ
                </p>
                <p className="text-2xl font-extrabold text-foreground">24/24</p>
              </div>
              <div className="rounded-xl bg-accent px-4 py-2 text-white shadow-lg">
                <p className="text-xs font-medium opacity-90">Hotline</p>
                <p className="text-lg font-bold">{contact.hotline}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
