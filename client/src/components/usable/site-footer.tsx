import { useTranslations } from 'next-intl';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SERVICE_SLUGS, siteConfig } from '@/config/site-config';
import { paths } from '@/router/paths';
import { BrandLogo } from '@/components/usable/brand-logo';
import { HotlineLinks } from '@/components/usable/hotline-links';

export function SiteFooter() {
  const t = useTranslations('common');
  const ts = useTranslations('site');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-4 border-brand-yellow bg-primary text-blue-50">
      {/* Mobile layout */}
      <div className="mx-auto max-w-7xl px-3 py-6 md:hidden">
        <div className="flex items-start gap-3 border-b border-white/10 pb-4">
          <BrandLogo size="sm" className="shrink-0 brightness-110" />
          <div className="min-w-0 flex-1">
            <p className="line-clamp-2 text-[11px] leading-snug text-blue-100">
              {ts('brand.description')}
            </p>
            <p className="mt-1.5 text-[11px] font-semibold text-brand-yellow">
              <HotlineLinks
                linkClassName="text-brand-yellow hover:text-white"
                separator="bar"
              />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3 py-4">
          <div>
            <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wide text-brand-yellow">
              {t('labels.services')}
            </h3>
            <ul className="space-y-1 text-[11px] leading-snug">
              {SERVICE_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link href={paths.serviceDetail(slug)} className="hover:text-white">
                    {ts(`services.${slug}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wide text-brand-yellow">
              {t('labels.links')}
            </h3>
            <ul className="space-y-1 text-[11px] leading-snug">
              <li>
                <Link href={paths.home} className="hover:text-white">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href={paths.projects} className="hover:text-white">
                  {t('nav.projects')}
                </Link>
              </li>
              <li>
                <Link href={paths.contact} className="hover:text-white">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <a href={paths.pricing} className="hover:text-white">
                  {t('nav.pricing')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg bg-white/5 px-3 py-2.5 text-[11px] leading-relaxed">
          <p className="mb-1.5 flex items-center gap-1.5 font-semibold text-brand-yellow">
            <Phone className="h-3.5 w-3.5 shrink-0" />
            {t('labels.contact')}
          </p>
          <HotlineLinks
            layout="stack"
            linkClassName="font-semibold text-white hover:text-brand-yellow"
          />
          <p className="mt-1.5 flex items-start gap-1.5">
            <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-yellow" />
            <a href={`mailto:${siteConfig.contact.email}`} className="break-all hover:text-white">
              {siteConfig.contact.email}
            </a>
          </p>
          <p className="mt-1 flex items-start gap-1.5 text-blue-100">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-yellow" />
            <span>{ts('contact.address')}</span>
          </p>
          <p className="mt-2 text-[10px] text-blue-200" suppressHydrationWarning>
            {t('labels.taxCode')}:{' '}
            <span className="tabular-nums">{siteConfig.contact.taxCode}</span>
          </p>
        </div>
      </div>

      {/* Desktop layout (unchanged structure) */}
      <div className="mx-auto hidden max-w-7xl gap-8 px-3 py-10 sm:gap-10 sm:px-4 sm:py-12 md:grid md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-4">
            <BrandLogo size="sm" className="brightness-110" />
          </div>
          <p className="text-sm text-blue-100">{ts('brand.description')}</p>
          <p className="mt-3 text-sm text-brand-yellow">
            {t('labels.hotline')}:{' '}
            <HotlineLinks
              linkClassName="text-brand-yellow hover:text-white"
              separator="bar"
            />
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-brand-yellow">{t('labels.services')}</h3>
          <ul className="space-y-2 text-sm">
            {SERVICE_SLUGS.map((slug) => (
              <li key={slug}>
                <Link href={paths.serviceDetail(slug)} className="hover:text-white">
                  {ts(`services.${slug}.title`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-brand-yellow">{t('labels.links')}</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={paths.home} className="hover:text-white">
                {t('nav.home')}
              </Link>
            </li>
            <li>
              <Link href={paths.projects} className="hover:text-white">
                {t('nav.projects')}
              </Link>
            </li>
            <li>
              <Link href={paths.contact} className="hover:text-white">
                {t('nav.contact')}
              </Link>
            </li>
            <li>
              <a href={paths.pricing} className="hover:text-white">
                {t('nav.pricing')}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-brand-yellow">{t('labels.contact')}</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
              <HotlineLinks
                layout="stack"
                linkClassName="font-semibold text-white hover:text-brand-yellow"
              />
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white">
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
              <span>{ts('contact.address')}</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-blue-200" suppressHydrationWarning>
            {t('labels.taxCode')}:{' '}
            <span className="tabular-nums">{siteConfig.contact.taxCode}</span>
          </p>
        </div>
      </div>

      <div className="border-t border-white/15 bg-[#152a6b] px-3 py-3 text-center text-[10px] leading-snug text-blue-200 max-md:py-2.5 sm:text-sm">
        {t('footer.copyright', { year, brand: ts('brand.name') })}
      </div>
    </footer>
  );
}
