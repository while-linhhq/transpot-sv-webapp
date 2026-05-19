import { siteAssets } from '@/config/site-assets';
import { SectionHeading } from '@/components/usable/section-heading';
import { GalleryImageCard } from '@/components/usable/gallery-image-card';

const captions = [
  'Đội ngũ Lê Đạt tại hiện trường',
  'Chuyển nhà trọn gói',
  'Bốc xếp chuyên nghiệp',
  'Chuyển văn phòng',
  'Vận chuyển hàng hóa',
  'Xe tải Đà Nẵng',
  'Đóng gói an toàn',
  'Chuyển chung cư',
  'Dịch vụ 24/24',
  'Đồng phục vàng — uy tín',
  'Hàng hóa cồng kềnh',
  'Khách hàng hài lòng',
];

export function GallerySection() {
  return (
    <section className="bg-gradient-to-b from-amber-50/80 to-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Thực tế"
          title="HÌNH ẢNH THỰC TẾ"
          description="Ảnh chụp từ các chuyến vận chuyển, chuyển nhà và chuyển văn phòng của Taxi Tải Lê Đạt"
        />
        <div className="grid auto-rows-[140px] grid-cols-2 gap-3 md:auto-rows-[180px] md:grid-cols-4 md:gap-4">
          {siteAssets.gallery.map((src, index) => (
            <GalleryImageCard
              key={`${src}-${index}`}
              src={src}
              alt={captions[index] ?? `Dự án vận chuyển ${index + 1}`}
              index={index}
              featured={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
