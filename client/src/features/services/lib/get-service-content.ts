import { getTranslations } from 'next-intl/server';
import { SERVICE_SLUGS, type ServiceSlug } from '@/config/site-config';
import { siteAssets } from '@/config/site-assets';

export type ServiceContent = {
  slug: string;
  title: string;
  heroDescription: string;
  highlights: string[];
  overview: string[];
  checklist: string[];
  commitments: string[];
  timeline: { label: string; value: string }[];
  benefits: string[];
  process: string[];
  faqs: { question: string; answer: string }[];
  media: { type: 'image' | 'video'; src: string }[];
};

const SERVICE_FOLDER_HINTS: Record<ServiceSlug, string[]> = {
  'chuyen-nha-tron-goi': ['file ảnh , video chuyển nhà'],
  'chuyen-van-phong': ['file chuyển văn phòng'],
  'chuyen-hang-hoa': ['images', 'videos', 'ảnh và video bổ sung'],
  'chuyen-phong-tro': ['file ảnh ,video chuyển trọ'],
  'di-doi-nha-xuong': ['images', 'ảnh và video bổ sung', 'file chuyển văn phòng'],
  'chuyen-chung-cu': ['images', 'ảnh và video bổ sung'],
};

function getFolderFromSrc(src: string) {
  return src.split('/').filter(Boolean)[0] ?? '';
}

function selectMediaForService(slug: ServiceSlug) {
  const hints = SERVICE_FOLDER_HINTS[slug];
  const matched = siteAssets.galleryMedia.filter((item) =>
    hints.some((hint) => getFolderFromSrc(item.src).includes(hint))
  );

  // Keep media strict per configured folders to avoid mixing unrelated assets.
  return matched.slice(0, 24);
}

export async function getServiceContent(slug: string): Promise<ServiceContent | null> {
  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) {
    return null;
  }

  const serviceSlug = slug as ServiceSlug;
  const t = await getTranslations('site');
  const ts = await getTranslations('services');
  const title = t(`services.${slug}.title`);
  const heroDescription = t(`services.${slug}.shortDescription`);

  return {
    slug,
    title,
    heroDescription,
    highlights: ts.raw(`serviceProfiles.${slug}.highlights`) as string[],
    overview: [
      ts('detail.overviewLead', { service: title, description: heroDescription }),
      ts('detail.overviewBody', { service: title }),
    ],
    checklist: ts.raw('detail.checklistItems') as string[],
    commitments: (t.raw('usp') as string[]).slice(0, 4),
    timeline: ts.raw('detail.timeline') as { label: string; value: string }[],
    benefits: ts.raw(`serviceProfiles.${slug}.benefits`) as string[],
    process: ts.raw(`serviceProfiles.${slug}.process`) as string[],
    faqs: [
      {
        question: ts(`serviceProfiles.${slug}.faqs.0.question`, { service: title }),
        answer: ts(`serviceProfiles.${slug}.faqs.0.answer`),
      },
      {
        question: ts(`serviceProfiles.${slug}.faqs.1.question`),
        answer: ts(`serviceProfiles.${slug}.faqs.1.answer`),
      },
    ],
    media: selectMediaForService(serviceSlug),
  };
}
