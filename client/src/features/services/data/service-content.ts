import { siteProfile } from '@/config/site-profile';

export type ServiceContent = {
  slug: string;
  title: string;
  heroDescription: string;
  benefits: string[];
  process: string[];
  faqs: { question: string; answer: string }[];
};

const defaultBenefits = [
  'Khảo sát và báo giá miễn phí tại nhà',
  'Đóng gói, bọc lót chuyên nghiệp',
  'Tháo lắp, vận chuyển an toàn',
  'Cam kết không phát sinh chi phí',
];

const defaultProcess = [
  'Tiếp nhận yêu cầu và tư vấn',
  'Khảo sát, báo giá chi tiết',
  'Ký hợp đồng và triển khai',
  'Nghiệm thu và bàn giao',
];

export const serviceContentMap: Record<string, ServiceContent> =
  Object.fromEntries(
    siteProfile.services.map((service) => [
      service.slug,
      {
        slug: service.slug,
        title: service.title,
        heroDescription: service.shortDescription,
        benefits: defaultBenefits,
        process: defaultProcess,
        faqs: [
          {
            question: `Giá ${service.title.toLowerCase()} bao nhiêu?`,
            answer:
              'Giá phụ thuộc khối lượng, khoảng cách và thời gian. Liên hệ hotline để được khảo sát miễn phí.',
          },
          {
            question: 'Có cam kết bồi thường không?',
            answer:
              'Chúng tôi cam kết đền bù 100% nếu có hư hại do lỗi vận chuyển.',
          },
        ],
      },
    ])
  );

export function getServiceContent(slug: string): ServiceContent | null {
  return serviceContentMap[slug] ?? null;
}
