/** Đường dẫn ảnh/video thật trong client/public/assets (symlink asset_img_video) */

const base = '/assets';

export const siteAssets = {
  hero: `${base}/875c0bc486e107bf5ef028.jpg`,
  heroAlt: `${base}/45c8fe507375f22bab6437.jpg`,
  promoBanner: `${base}/875c0bc486e107bf5ef028.jpg`,
  video: `${base}/0511.mp4`,

  services: {
    'chuyen-nha-tron-goi': `${base}/7870c2e84fcdce9397dc35.jpg`,
    'chuyen-van-phong': `${base}/632bc3b34e96cfc8968740.jpg`,
    'chuyen-hang-hoa': `${base}/cb994201cf244e7a173527.jpg`,
    'chuyen-phong-tro': `${base}/45c8fe507375f22bab6437.jpg`,
    'di-doi-nha-xuong': `${base}/8bf803608e450f1b565444.jpg`,
    'chuyen-chung-cu': `${base}/632bc3b34e96cfc8968740.jpg`,
  } as Record<string, string>,

  gallery: [
    `${base}/875c0bc486e107bf5ef028.jpg`,
    `${base}/45c8fe507375f22bab6437.jpg`,
    `${base}/7870c2e84fcdce9397dc35.jpg`,
    `${base}/632bc3b34e96cfc8968740.jpg`,
    `${base}/cb994201cf244e7a173527.jpg`,
    `${base}/9c4c17d49af11baf42e042.jpg`,
    `${base}/8bf803608e450f1b565444.jpg`,
    `${base}/dd6050f8dddd5c8305cc34.jpg`,
    `${base}/16dfae472362a23cfb7333.jpg`,
    `${base}/aa38d3a15e84dfda869532.jpg`,
    `${base}/875c0bc486e107bf5ef028.jpg`,
    `${base}/b43108a9858c04d25d9d30.jpg`,
  ],
} as const;

export function getServiceImage(slug: string): string | undefined {
  return siteAssets.services[slug];
}
