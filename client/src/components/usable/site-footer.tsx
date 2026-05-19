import Link from 'next/link';
import { Mail, MapPin, Phone, Truck } from 'lucide-react';
import { siteProfile } from '@/config/site-profile';
import { paths } from '@/router/paths';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-4 border-brand-yellow bg-primary text-blue-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-yellow text-primary">
              <Truck className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold text-white">{siteProfile.brand.name}</span>
          </div>
          <p className="text-sm text-blue-100">{siteProfile.brand.description}</p>
          <p className="mt-3 text-sm font-bold text-brand-yellow">
            Hotline: {siteProfile.contact.hotline}
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-brand-yellow">Dịch vụ</h3>
          <ul className="space-y-2 text-sm">
            {siteProfile.services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={paths.serviceDetail(service.slug)}
                  className="hover:text-white"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-brand-yellow">Liên kết</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={paths.home} className="hover:text-white">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link href={paths.projects} className="hover:text-white">
                Dự án hoàn thành
              </Link>
            </li>
            <li>
              <Link href={paths.contact} className="hover:text-white">
                Liên hệ
              </Link>
            </li>
            <li>
              <a href={paths.pricing} className="hover:text-white">
                Bảng giá
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-brand-yellow">Liên hệ</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
              <a
                href={siteProfile.contact.hotlineHref}
                className="font-semibold text-white hover:text-brand-yellow"
              >
                {siteProfile.contact.hotline}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
              <a
                href={`mailto:${siteProfile.contact.email}`}
                className="hover:text-white"
              >
                {siteProfile.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
              <span>{siteProfile.contact.address}</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-blue-200">
            MST: {siteProfile.contact.taxCode}
          </p>
        </div>
      </div>

      <div className="border-t border-white/15 bg-[#152a6b] py-4 text-center text-sm text-blue-200">
        © {year} {siteProfile.brand.name}. All rights reserved.
      </div>
    </footer>
  );
}
