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

function isHomePathname(pathname: string) {
  const path = pathname.split('?')[0].replace(/\/$/, '') || '/';
  return path === '/';
}

export function SiteHeader() {
  const t = useTranslations('common');
  const ts = useTranslations('site');
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const isHomePage = isHomePathname(pathname);
  const [heroInView, setHeroInView] = useState(isHomePage);
  const useHeroOverlayNav = isHomePage && heroInView;

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isHomePage) {
      setHeroInView(false);
      return;
    }

    const hero = document.querySelector('[data-hero-section]');
    if (!hero) {
      setHeroInView(false);
      return;
    }

    const HEADER_OFFSET_PX = 120;

    const syncHeroOverlay = () => {
      const rect = hero.getBoundingClientRect();
      setHeroInView(rect.bottom > HEADER_OFFSET_PX);
    };

    syncHeroOverlay();
    window.addEventListener('scroll', syncHeroOverlay, { passive: true });
    window.addEventListener('resize', syncHeroOverlay, { passive: true });

    return () => {
      window.removeEventListener('scroll', syncHeroOverlay);
      window.removeEventListener('resize', syncHeroOverlay);
    };
  }, [isHomePage, pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

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
          ? 'border-b border-white/10'
          : 'border-b-2 border-brand-yellow/40 bg-surface/95 shadow-sm backdrop-blur-md',
      )}
    >
      <div className="bg-gradient-to-r from-primary via-primary to-[#1e3a8a] text-sm font-semibold text-white sm:text-base">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-3 gap-y-2 px-3 py-2 sm:px-4 sm:py-2.5">
          <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5 sm:gap-2">
            <Phone className="h-4 w-4 shrink-0 text-brand-yellow sm:h-5 sm:w-5" />
            <span className="shrink-0">{t('hotlineBar')}</span>
            <HotlineLinks
              linkClassName="text-sm font-bold text-brand-yellow hover:text-white sm:text-base"
              separator="bar"
            />
          </span>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span className="hidden text-sm text-blue-100/95 md:inline lg:text-base">
              {ts('brand.tagline')}
            </span>
            <LocaleSwitcher variant="bar" />
          </div>
        </div>
      </div>

      <div
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 transition-colors duration-300 sm:gap-4 sm:px-4 sm:py-3.5',
          useHeroOverlayNav ? 'bg-transparent' : 'bg-surface/95',
        )}
      >
        <Link href={paths.home} className="flex min-w-0 shrink items-center">
          <BrandLogo size="md" priority className="max-w-[min(100%,160px)] sm:max-w-[180px]" />
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          <Link
            href={paths.home}
            className={cn(
              'rounded-lg px-4 py-2.5 text-base font-bold tracking-tight transition-colors',
              useHeroOverlayNav
                ? 'text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.65)] hover:bg-white/15'
                : 'text-foreground hover:bg-amber-50',
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
                  : 'text-foreground hover:bg-amber-50',
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
                  : 'text-foreground hover:bg-amber-50',
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
            useHeroOverlayNav
              ? 'text-white [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.6))]'
              : 'text-primary',
          )}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={t('labels.menu')}
        >
          {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {mobileOpen ? (
        <div
          className="fixed inset-0 top-[var(--header-offset,7.5rem)] z-40 bg-black/40 lg:hidden"
          aria-hidden
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <div
        className={cn(
          'relative z-50 border-t border-border bg-surface shadow-lg lg:hidden',
          mobileOpen
            ? 'block max-h-[min(70dvh,calc(100dvh-var(--header-offset,7.5rem)))] overflow-y-auto overscroll-contain'
            : 'hidden',
        )}
      >
        <nav className="flex flex-col gap-1 p-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-3.5 text-base font-bold tracking-tight hover:bg-amber-50 active:bg-amber-100 sm:text-lg"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <p className="px-3 pb-1 pt-3 text-xs font-extrabold uppercase tracking-wide text-muted">
            {t('nav.services')}
          </p>
          {SERVICE_SLUGS.map((slug) => (
            <Link
              key={slug}
              href={paths.serviceDetail(slug)}
              className="rounded-lg px-3 py-3 text-sm font-semibold leading-snug hover:bg-amber-50 active:bg-amber-100 sm:text-base"
              onClick={() => setMobileOpen(false)}
            >
              {ts(`services.${slug}.title`)}
            </Link>
          ))}
          <a href={siteConfig.contact.hotlines[0].href} className="mt-3 block">
            <Button variant="accent" className="h-12 w-full" size="lg">
              {t('cta.quoteNow')}
            </Button>
          </a>
        </nav>
      </div>
    </header>
  );
}
