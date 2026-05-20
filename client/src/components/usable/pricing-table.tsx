'use client';

import { useLocale, useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site-config';
import { HotlineLinks } from '@/components/usable/hotline-links';
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
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="border-b border-border bg-amber-50 px-5 py-4">
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        {note && <p className="mt-1 text-sm text-muted">{note}</p>}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-slate-50">
              {headers.map((header) => (
                <th
                  key={header}
                  className="whitespace-nowrap px-4 py-3 font-semibold text-foreground"
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
                {rowKeys.map((key) => (
                  <td key={key} className="whitespace-nowrap px-4 py-3 text-muted">
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
    <section id="bang-gia" className="scroll-mt-24 bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow={tp('eyebrow')}
          title={tp('title')}
          description={tp('updated', { date: dateLabel })}
        />

        <div className="space-y-8">
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

        <div className="mt-8 grid gap-6 rounded-2xl bg-amber-400 px-6 py-7 md:grid-cols-2 md:px-10">
          <div>
            <h3 className="text-3xl font-extrabold uppercase leading-tight text-red-950 md:text-4xl">
              {tp('cta.title')}
            </h3>
            <p className="mt-3 text-sm font-medium text-red-950/80 md:text-base">
              {tp('cta.description')}
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <ul className="space-y-3 text-sm font-semibold text-red-950 md:text-base">
              <li>— {tp('cta.benefits.insurance')}</li>
              <li>— {tp('cta.benefits.ontime')}</li>
              <li>— {tp('cta.benefits.trained')}</li>
              <li>— {tp('cta.benefits.noHiddenFee')}</li>
            </ul>
            <a
              href={siteConfig.contact.hotlines[0].href}
              className="mt-5 inline-flex h-12 items-center justify-center rounded-lg bg-red-950 px-5 text-sm font-extrabold uppercase tracking-wide text-amber-200 transition-colors hover:bg-red-900 md:text-base"
            >
              {tp('cta.button', { hotline: siteConfig.contact.hotlines[0].display })}
            </a>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted">
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
