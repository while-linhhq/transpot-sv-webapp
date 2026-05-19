import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { siteProfile } from '@/config/site-profile';
import { siteAssets } from '@/config/site-assets';
import { SectionHeading } from '@/components/usable/section-heading';

export function UspSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-16 text-white md:py-24">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(245,197,24,0.12)_0%,transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Cam kết"
              title="TẠI SAO CHỌN LÊ ĐẠT?"
              description="Đem lại giải pháp vận chuyển tối ưu — giá rẻ, nhanh, an toàn tại Đà Nẵng"
              align="left"
              className="mb-8 [&_h2]:text-white [&_p.text-lg]:text-blue-100"
            />
            <ul className="grid gap-3 sm:grid-cols-2">
              {siteProfile.usp.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-yellow" />
                  <span className="text-sm leading-relaxed text-blue-50">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-2 rounded-3xl bg-brand-yellow opacity-80" />
            <div className="relative overflow-hidden rounded-3xl border-4 border-brand-yellow shadow-2xl">
              <div className="relative aspect-[4/5]">
                <Image
                  src={siteAssets.heroAlt}
                  alt="Nhân viên Taxi Tải Lê Đạt"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
