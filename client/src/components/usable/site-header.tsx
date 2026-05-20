'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, Phone, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { SERVICE_SLUGS, siteConfig } from '@/config/site-config';
import { paths } from '@/router/paths';
import { Button } from '@/components/ui/button';
import { BrandLogo } from '@/components/usable/brand-logo';
import { HotlineLinks } from '@/components/usable/hotline-links';
import { LocaleSwitcher } from '@/components/usable/locale-switcher';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const t = useTranslations('common');
  const ts = useTranslations('site');
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  /** Chỉ trang chủ có hero full-screen tối — các URL khác nền sáng/vàng làm chữ menu trắng bị “mất” */
  const isHomePage = pathname === '/' || pathname === '';
  const useHeroOverlayNav = isAtTop && isHomePage;

  useEffect(() => {
    const updateHeaderState = () => {
      setIsAtTop(window.scrollY <= 8);
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
    return () => window.removeEventListener('scroll', updateHeaderState);
  }, []);

  const navItems = [
    { href: paths.home, label: t('nav.home') },
    { href: paths.projects, label: t('nav.projects') },
    { href: paths.contact, label: t('nav.contact') },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        useHeroOverlayNav
          ? 'border-b border-white/10 bg-transparent backdrop-blur-[1px]'
          : 'border-b-2 border-brand-yellow/40 bg-surface/95 backdrop-blur-md'
      )}
    >
      <div className="bg-gradient-to-r from-primary via-primary to-[#1e3a8a] text-base font-semibold text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2.5">
          <span className="flex flex-wrap items-center gap-2">
            <Phone className="h-5 w-5 shrink-0 text-brand-yellow" />
            {t('hotlineBar')}{' '}
            <HotlineLinks
              linkClassName="text-base font-bold text-brand-yellow hover:text-white"
              separator="bar"
            />
          </span>
          <div className="flex items-center gap-3">
            <span className="hidden text-base text-blue-100/95 sm:inline">{ts('brand.tagline')}</span>
            <LocaleSwitcher />
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5">
        <Link href={paths.home} className="flex shrink-0 items-center">
          <BrandLogo size="md" priority />
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          <Link
            href={paths.home}
            className={cn(
              'rounded-lg px-4 py-2.5 text-base font-bold tracking-tight transition-colors',
              useHeroOverlayNav
                ? 'text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.65)] hover:bg-white/15'
                : 'text-foreground hover:bg-amber-50'
            )}
          >
            {t('nav.home')}
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className={cn(
                'rounded-lg px-4 py-2.5 text-base font-bold tracking-tight transition-colors',
                useHeroOverlayNav
                  ? 'text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.65)] hover:bg-white/15'
                  : 'text-foreground hover:bg-amber-50'
              )}
            >
              {t('nav.services')}
            </button>
            {servicesOpen && (
              <div className="absolute left-0 top-full z-50 min-w-[300px] rounded-xl border-2 border-brand-yellow/50 bg-surface p-2 shadow-xl">
                {SERVICE_SLUGS.map((slug) => (
                  <Link
                    key={slug}
                    href={paths.serviceDetail(slug)}
                    className="block rounded-lg px-3 py-3 text-base font-semibold leading-snug hover:bg-amber-50 hover:text-primary"
                  >
                    {ts(`services.${slug}.title`)}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {navItems.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-lg px-4 py-2.5 text-base font-bold tracking-tight transition-colors',
                useHeroOverlayNav
                  ? 'text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.65)] hover:bg-white/15'
                  : 'text-foreground hover:bg-amber-50'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={siteConfig.contact.hotlines[0].href}>
            <Button variant="accent" size="lg">
              {t('cta.quoteNow')}
            </Button>
          </a>
        </div>

        <button
          type="button"
          className={cn(
            'rounded-lg p-2.5 lg:hidden',
            useHeroOverlayNav ? 'text-white [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.6))]' : 'text-primary'
          )}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={t('labels.menu')}
        >
          {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
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
              className="rounded-lg px-3 py-3 text-lg font-bold tracking-tight hover:bg-amber-50"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <p className="px-3 pb-1 pt-3 text-sm font-extrabold uppercase tracking-wide text-muted">
            {t('nav.services')}
          </p>
          {SERVICE_SLUGS.map((slug) => (
            <Link
              key={slug}
              href={paths.serviceDetail(slug)}
              className="rounded-lg px-3 py-2.5 text-base font-semibold leading-snug hover:bg-amber-50"
              onClick={() => setMobileOpen(false)}
            >
              {ts(`services.${slug}.title`)}
            </Link>
          ))}
          <a href={siteConfig.contact.hotlines[0].href} className="mt-2 block">
            <Button variant="accent" className="w-full" size="lg">
              {t('cta.quoteNow')}
            </Button>
          </a>
        </nav>
      </div>
    </header>
  );
}
