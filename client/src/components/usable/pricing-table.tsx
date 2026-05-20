import { siteProfile } from '@/config/site-profile';
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
  rowKeys: (keyof (typeof rows)[0] & string)[];
}) {
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
                  className="px-4 py-3 font-semibold text-foreground whitespace-nowrap"
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
                  <td key={key} className="px-4 py-3 text-muted whitespace-nowrap">
                    <span
                      className={
                        key === 'vehicleType' ? 'font-semibold text-foreground' : ''
                      }
                    >
                      {(row as Record<string, string>)[key] ?? '—'}
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
  const { pricing } = siteProfile;

  const innerRows = pricing.innerCity.map((row) => ({
    vehicleType: row.vehicleType,
    openPrice: row.openPrice ?? '—',
    fromKm5: row.fromKm5 ?? '—',
    interProvince: row.interProvince ?? '—',
    loadingTime: row.loadingTime ?? '—',
    waitingTime: row.waitingTime ?? '—',
  }));

  const interRows = pricing.interProvince.map((row) => ({
    vehicleType: row.vehicleType,
    km40to100: row.km40to100 ?? '—',
    km101Plus: row.km101Plus ?? '—',
    timeSurcharge: row.timeSurcharge ?? '—',
    overnightFee: row.overnightFee ?? '—',
  }));

  return (
    <section id="bang-gia" className="scroll-mt-24 bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Bảng giá"
          title="BẢNG GIÁ CƯỚC XE"
          description={`Giá cước xe tải được cập nhật ngày ${pricing.updatedAtLabel}`}
        />

        <div className="space-y-8">
          <DataTable
            title="BẢNG GIÁ TRONG NỘI THÀNH ĐÀ NẴNG (PHẠM VI DƯỚI 30KM)"
            note={pricing.innerCityNote}
            headers={pricing.innerCityHeaders}
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
            title="BẢNG GIÁ CƯỚC NGOẠI TỈNH"
            note={pricing.interProvinceNote}
            headers={pricing.interProvinceHeaders}
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

        <p className="mt-6 text-center text-sm text-muted">
          Liên hệ hotline{' '}
          <HotlineLinks
            linkClassName="font-semibold text-primary hover:underline"
            separator=" hoặc "
          />{' '}
          để được báo giá và khảo sát thực tế miễn phí.
        </p>
      </div>
    </section>
  );
}
