/** Static media in public/images and public/videos (Next.js public/) */

const images = '/images';
const videos = '/videos';

export const siteAssets = {
  hero: `${images}/875c0bc486e107bf5ef028.jpg`,
  heroAlt: `${images}/45c8fe507375f22bab6437.jpg`,
  promoBanner: `${images}/875c0bc486e107bf5ef028.jpg`,
  video: `${videos}/0511.mp4`,

  services: {
    'chuyen-nha-tron-goi': `${images}/7870c2e84fcdce9397dc35.jpg`,
    'chuyen-van-phong': `${images}/632bc3b34e96cfc8968740.jpg`,
    'chuyen-hang-hoa': `${images}/cb994201cf244e7a173527.jpg`,
    'chuyen-phong-tro': `${images}/45c8fe507375f22bab6437.jpg`,
    'di-doi-nha-xuong': `${images}/8bf803608e450f1b565444.jpg`,
    'chuyen-chung-cu': `${images}/632bc3b34e96cfc8968740.jpg`,
  } as Record<string, string>,

  gallery: [
    `${images}/875c0bc486e107bf5ef028.jpg`,
    `${images}/45c8fe507375f22bab6437.jpg`,
    `${images}/7870c2e84fcdce9397dc35.jpg`,
    `${images}/632bc3b34e96cfc8968740.jpg`,
    `${images}/cb994201cf244e7a173527.jpg`,
    `${images}/9c4c17d49af11baf42e042.jpg`,
    `${images}/8bf803608e450f1b565444.jpg`,
    `${images}/dd6050f8dddd5c8305cc34.jpg`,
    `${images}/16dfae472362a23cfb7333.jpg`,
    `${images}/aa38d3a15e84dfda869532.jpg`,
    `${images}/875c0bc486e107bf5ef028.jpg`,
    `${images}/b43108a9858c04d25d9d30.jpg`,
  ],
} as const;

export function getServiceImage(slug: string): string | undefined {
  return siteAssets.services[slug];
}
