'use client';

import { useLocale, useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site-config';
import { HotlineLinks } from '@/components/usable/hotline-links';
import { cn } from '@/lib/utils';
import { SectionHeading } from './section-heading';

function DataTable({
  title,
  note,
  headers,
  rows,
  rowKeys,
}: {
  title: string;
  note?: string;
  headers: readonly string[];
  rows: Record<string, string>[];
  rowKeys: string[];
}) {
  const tp = useTranslations('pricing');

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm max-md:rounded-lg md:rounded-2xl">
      <div className="border-b border-border bg-amber-50 px-3 py-2 max-md:px-3 max-md:py-2 sm:px-5 sm:py-4">
        <h3 className="text-sm font-bold text-foreground max-md:leading-snug sm:text-lg">{title}</h3>
        {note && <p className="mt-0.5 text-[10px] text-muted max-md:line-clamp-2 sm:mt-1 sm:text-sm">{note}</p>}
      </div>
      <p className="border-b border-border bg-slate-50/80 px-3 py-1.5 text-center text-[10px] font-medium text-muted lg:hidden">
        {tp('tableScrollHint')}
      </p>
      <div className="-mx-px overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-width:thin]">
        <table className="w-full min-w-[36rem] text-left text-xs sm:min-w-[640px] sm:text-sm">
          <thead>
            <tr className="border-b border-border bg-slate-50">
              {headers.map((header, colIdx) => (
                <th
                  key={header}
                  className={cn(
                    'whitespace-nowrap px-3 py-2.5 font-semibold text-foreground sm:px-4 sm:py-3',
                    colIdx === 0 &&
                      'sticky left-0 z-10 bg-slate-50 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.12)]',
                  )}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.vehicleType}
                className="border-b border-border last:border-0 hover:bg-slate-50/50"
              >
                {rowKeys.map((key, colIdx) => (
                  <td
                    key={key}
                    className={cn(
                      'whitespace-nowrap px-3 py-2.5 text-muted sm:px-4 sm:py-3',
                      colIdx === 0 &&
                        'sticky left-0 z-10 bg-surface shadow-[4px_0_8px_-4px_rgba(0,0,0,0.08)]',
                    )}
                  >
                    <span
                      className={
                        key === 'vehicleType' ? 'font-semibold text-foreground' : ''
                      }
                    >
                      {row[key] ?? tp('emptyCell')}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PricingSection() {
  const tp = useTranslations('pricing');
  const { pricing } = siteConfig;
  const locale = useLocale();

  const dateLabel = new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(pricing.updatedAt));

  const innerHeaders = [
    tp('innerHeaders.vehicle'),
    tp('innerHeaders.openPrice'),
    tp('innerHeaders.fromKm5'),
    tp('innerHeaders.interProvince'),
    tp('innerHeaders.loadingTime'),
    tp('innerHeaders.waitingTime'),
  ];

  const interHeaders = [
    tp('interHeaders.vehicle'),
    tp('interHeaders.km40to100'),
    tp('interHeaders.km101Plus'),
    tp('interHeaders.timeSurcharge'),
    tp('interHeaders.overnightFee'),
  ];

  const innerRows = pricing.innerCity.map((row) => ({
    vehicleType: tp(`vehicles.${row.vehicleKey}`),
    openPrice: row.openPrice,
    fromKm5: row.fromKm5,
    interProvince: row.interProvince,
    loadingTime: row.loadingTime,
    waitingTime: row.waitingTime,
  }));

  const interRows = pricing.interProvince.map((row) => ({
    vehicleType: tp(`vehicles.${row.vehicleKey}`),
    km40to100: row.km40to100,
    km101Plus: row.km101Plus,
    timeSurcharge: row.timeSurcharge,
    overnightFee: row.overnightFee,
  }));

  return (
    <section id="bang-gia" className="scroll-mt-20 bg-slate-50 py-5 max-md:py-4 sm:scroll-mt-24 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <SectionHeading
          eyebrow={tp('eyebrow')}
          title={tp('title')}
          description={tp('updated', { date: dateLabel })}
        />

        <div className="space-y-4 max-md:space-y-3 sm:space-y-8">
          <DataTable
            title={tp('innerCityTitle')}
            note={tp('innerCityNote')}
            headers={innerHeaders}
            rows={innerRows}
            rowKeys={[
              'vehicleType',
              'openPrice',
              'fromKm5',
              'interProvince',
              'loadingTime',
              'waitingTime',
            ]}
          />

          <DataTable
            title={tp('interProvinceTitle')}
            note={tp('interProvinceNote')}
            headers={interHeaders}
            rows={interRows}
            rowKeys={[
              'vehicleType',
              'km40to100',
              'km101Plus',
              'timeSurcharge',
              'overnightFee',
            ]}
          />
        </div>

        <div className="mt-4 grid gap-3 rounded-xl bg-amber-400 px-3 py-4 max-md:rounded-lg sm:mt-8 sm:gap-6 sm:rounded-2xl sm:px-6 sm:py-7 md:grid-cols-2 md:px-10">
          <div>
            <h3 className="text-lg font-extrabold uppercase leading-tight text-red-950 max-md:leading-snug sm:text-3xl md:text-4xl">
              {tp('cta.title')}
            </h3>
            <p className="mt-1 text-xs font-medium text-red-950/80 max-md:line-clamp-2 sm:mt-3 sm:text-sm md:text-base">
              {tp('cta.description')}
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <ul className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] font-semibold text-red-950 max-md:leading-snug sm:block sm:space-y-3 sm:text-base">
              <li>— {tp('cta.benefits.insurance')}</li>
              <li>— {tp('cta.benefits.ontime')}</li>
              <li>— {tp('cta.benefits.trained')}</li>
              <li>— {tp('cta.benefits.noHiddenFee')}</li>
            </ul>
            <a
              href={siteConfig.contact.hotlines[0].href}
              className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-lg bg-red-950 px-3 text-center text-[11px] font-extrabold uppercase tracking-wide text-amber-200 transition-colors hover:bg-red-900 max-md:leading-tight sm:mt-5 sm:h-12 sm:w-auto sm:px-5 sm:text-sm md:text-base"
            >
              {tp('cta.button', { hotline: siteConfig.contact.hotlines[0].display })}
            </a>
          </div>
        </div>

        <p className="mt-3 text-center text-xs text-muted max-md:leading-snug sm:mt-6 sm:text-sm">
          {tp('footerPrefix')}{' '}
          <HotlineLinks
            linkClassName="font-semibold text-primary hover:underline"
            separator="or"
          />{' '}
          {tp('footerSuffix')}
        </p>
      </div>
    </section>
  );
}
