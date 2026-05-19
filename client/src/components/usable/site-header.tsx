'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, Phone, Truck, X } from 'lucide-react';
import { siteProfile } from '@/config/site-profile';
import { paths } from '@/router/paths';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { href: paths.home, label: 'Trang chủ' },
  { href: paths.projects, label: 'Dự án hoàn thành' },
  { href: paths.contact, label: 'Liên hệ' },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-brand-yellow/40 bg-surface/95 backdrop-blur-md">
      <div className="bg-gradient-to-r from-primary via-primary to-[#1e3a8a] text-sm text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2">
          <span className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-brand-yellow" />
            Hotline 24/24:{' '}
            <a
              href={siteProfile.contact.hotlineHref}
              className="font-bold text-brand-yellow hover:text-white"
            >
              {siteProfile.contact.hotline}
            </a>
          </span>
          <span className="hidden text-blue-100 sm:inline">
            {siteProfile.brand.tagline}
          </span>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href={paths.home} className="flex items-center gap-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-yellow text-primary shadow-md">
            <Truck className="h-6 w-6" />
          </span>
          <span className="leading-tight">
            <span className="block text-xs font-bold uppercase tracking-wide text-accent">
              Taxi Tải
            </span>
            <span className="block text-xl font-extrabold text-primary">
              {siteProfile.brand.shortName}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            href={paths.home}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground hover:bg-amber-50"
          >
            Trang chủ
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground hover:bg-amber-50"
            >
              Dịch vụ
            </button>
            {servicesOpen && (
              <div className="absolute left-0 top-full z-50 min-w-[280px] rounded-xl border-2 border-brand-yellow/50 bg-surface p-2 shadow-xl">
                {siteProfile.services.map((service) => (
                  <Link
                    key={service.slug}
                    href={paths.serviceDetail(service.slug)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-amber-50 hover:text-primary"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {navItems.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground hover:bg-amber-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={siteProfile.contact.hotlineHref}>
            <Button variant="accent">Báo giá ngay</Button>
          </a>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-primary lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          'border-t border-border bg-surface lg:hidden',
          mobileOpen ? 'block' : 'hidden'
        )}
      >
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 font-semibold hover:bg-amber-50"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <p className="px-3 pt-2 text-xs font-bold uppercase text-muted">Dịch vụ</p>
          {siteProfile.services.map((service) => (
            <Link
              key={service.slug}
              href={paths.serviceDetail(service.slug)}
              className="rounded-lg px-3 py-2 text-sm hover:bg-amber-50"
              onClick={() => setMobileOpen(false)}
            >
              {service.title}
            </Link>
          ))}
          <a href={siteProfile.contact.hotlineHref} className="mt-2 block">
            <Button variant="accent" className="w-full">
              Báo giá ngay
            </Button>
          </a>
        </nav>
      </div>
    </header>
  );
}
