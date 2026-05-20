/** Static media in public/images and public/videos (Next.js public/) */

const images = '/images';
const videos = '/videos';
const heroPrimary = '/ảnh bìa chính/z7842869921066_3a054313f61a7525ce03488f7617990c.jpg';

export type GalleryMediaItem =
  | { type: 'image'; src: string }
  | { type: 'video'; src: string; poster: string };

export const siteAssets = {
  hero: heroPrimary,
  heroAlt: `${images}/45c8fe507375f22bab6437.jpg`,
  /** Hero carousel — thứ tự hiển thị; chỉnh danh sách tại đây */
  heroSlides: [
    heroPrimary,
    `${images}/875c0bc486e107bf5ef028.jpg`,
    `${images}/45c8fe507375f22bab6437.jpg`,
    `${images}/7870c2e84fcdce9397dc35.jpg`,
    `${images}/632bc3b34e96cfc8968740.jpg`,
    `${images}/cb994201cf244e7a173527.jpg`,
    `${images}/9c4c17d49af11baf42e042.jpg`,
  ],
  promoBanner: `${images}/875c0bc486e107bf5ef028.jpg`,
  video: `${videos}/0511.mp4`,

  /** Thumb theo đúng bộ ảnh thư mục / chủ đề dịch vụ */
  services: {
    'chuyen-nha-tron-goi':
      '/file ảnh , video chuyển nhà/481191749_629910139796966_1942217427070644080_n.jpg',
    'chuyen-van-phong':
      '/file chuyển văn phòng/474744722_605708858883761_711080455648243138_n.jpg',
    'chuyen-hang-hoa': `${images}/cb994201cf244e7a173527.jpg`,
    'chuyen-phong-tro':
      '/file ảnh ,video chuyển trọ/485353406_646547621466551_5066794530465415838_n.jpg',
    'di-doi-nha-xuong': `${images}/aa38d3a15e84dfda869532.jpg`,
    'chuyen-chung-cu': `${images}/9ef03f68b24d33136a5c31.jpg`,
  } as Record<string, string>,

  galleryMedia: [
    { type: 'image', src: '/ảnh bìa chính/z7842869921066_3a054313f61a7525ce03488f7617990c.jpg' },
    { type: 'image', src: '/ảnh và video bổ sung/z7842868467525_b71a6e43527a42448c270c716bd86dc4.jpg' },
    { type: 'image', src: '/ảnh và video bổ sung/z7842868505326_9e3aca2e3f5955cb291bb1c354f7d29f.jpg' },
    { type: 'image', src: '/ảnh và video bổ sung/z7842868571659_086428f3afcaa5bcf2dde7c26831049d.jpg' },
    { type: 'image', src: '/ảnh và video bổ sung/z7842868608755_8d2c1e2675d7f630c680e31ec5698daa.jpg' },
    { type: 'image', src: '/ảnh và video bổ sung/z7842892386435_69630d4b74ef30b400bd6fe000465bae.jpg' },
    {
      type: 'video',
      src: '/ảnh và video bổ sung/0511.mp4',
      poster: '/ảnh và video bổ sung/z7842868571659_086428f3afcaa5bcf2dde7c26831049d.jpg',
    },
    {
      type: 'video',
      src: '/ảnh và video bổ sung/7842887009379.mp4',
      poster: '/ảnh và video bổ sung/z7842892386435_69630d4b74ef30b400bd6fe000465bae.jpg',
    },
    { type: 'image', src: '/file chuyển văn phòng/471413167_575017468574070_4119077530771679201_n.jpg' },
    { type: 'image', src: '/file chuyển văn phòng/471818694_575017498574067_7537488002335259312_n.jpg' },
    { type: 'image', src: '/file chuyển văn phòng/474579837_605708925550421_4384125833545168514_n.jpg' },
    { type: 'image', src: '/file chuyển văn phòng/474695802_605708595550454_1655498950265364424_n.jpg' },
    { type: 'image', src: '/file chuyển văn phòng/474744722_605708858883761_711080455648243138_n.jpg' },
    { type: 'image', src: '/file ảnh , video chuyển nhà/470231612_1777329809689228_3160732045540831165_n.jpg' },
    { type: 'image', src: '/file ảnh , video chuyển nhà/477571391_620893267365320_7131657903643879955_n.jpg' },
    { type: 'image', src: '/file ảnh , video chuyển nhà/481191749_629910139796966_1942217427070644080_n.jpg' },
    { type: 'image', src: '/file ảnh , video chuyển nhà/484276441_643445931776720_3650544361251557572_n.jpg' },
    { type: 'image', src: '/file ảnh , video chuyển nhà/487552364_1855572948531580_1450942284952090609_n (1).jpg' },
    {
      type: 'video',
      src: '/file ảnh , video chuyển nhà/7790382726053.mp4',
      poster: '/file ảnh , video chuyển nhà/477571391_620893267365320_7131657903643879955_n.jpg',
    },
    {
      type: 'video',
      src: '/file ảnh , video chuyển nhà/7812685939856.mp4',
      poster: '/file ảnh , video chuyển nhà/481191749_629910139796966_1942217427070644080_n.jpg',
    },
    { type: 'image', src: '/file ảnh ,video chuyển trọ/481704032_633520029435977_3114161530185989922_n.jpg' },
    { type: 'image', src: '/file ảnh ,video chuyển trọ/484576183_643100675144579_4876566259835412692_n.jpg' },
    { type: 'image', src: '/file ảnh ,video chuyển trọ/485353406_646547621466551_5066794530465415838_n.jpg' },
    { type: 'image', src: '/file ảnh ,video chuyển trọ/614678447_876828991771745_163501398158025115_n.jpg' },
    { type: 'image', src: `${images}/11a1b2393f1cbe42e70d38.jpg` },
    { type: 'image', src: `${images}/13a36d3ae01f6141380e36.jpg` },
    { type: 'image', src: `${images}/16dfae472362a23cfb7333.jpg` },
    { type: 'image', src: `${images}/1f9e5907d422557c0c3343.jpg` },
    { type: 'image', src: `${images}/45c8fe507375f22bab6437.jpg` },
    { type: 'image', src: `${images}/4ad9ff417264f33aaa7524.jpg` },
    { type: 'image', src: `${images}/5edeea466763e63dbf7229.jpg` },
    { type: 'image', src: `${images}/632bc3b34e96cfc8968740.jpg` },
    { type: 'image', src: `${images}/7870c2e84fcdce9397dc35.jpg` },
    { type: 'image', src: `${images}/875c0bc486e107bf5ef028.jpg` },
    { type: 'image', src: `${images}/8bf803608e450f1b565444.jpg` },
    { type: 'image', src: `${images}/965a25c2a8e729b970f641.jpg` },
    { type: 'image', src: `${images}/9c4c17d49af11baf42e042.jpg` },
    { type: 'image', src: `${images}/9ef03f68b24d33136a5c31.jpg` },
    { type: 'image', src: `${images}/aa38d3a15e84dfda869532.jpg` },
    { type: 'image', src: `${images}/b43108a9858c04d25d9d30.jpg` },
    { type: 'image', src: `${images}/cb994201cf244e7a173527.jpg` },
    { type: 'image', src: `${images}/d499c3004e25cf7b963439.jpg` },
    { type: 'image', src: `${images}/dd6050f8dddd5c8305cc34.jpg` },
    { type: 'image', src: `${images}/f46146f9cbdc4a8213cd26.jpg` },
    { type: 'image', src: `${images}/fc68b8f135d4b48aedc525.jpg` },
    {
      type: 'video',
      src: `${videos}/0511.mp4`,
      poster: '/ảnh và video bổ sung/z7842868571659_086428f3afcaa5bcf2dde7c26831049d.jpg',
    },
    {
      type: 'video',
      src: `${videos}/271781892827118795487.mp4`,
      poster: `${images}/632bc3b34e96cfc8968740.jpg`,
    },
    {
      type: 'video',
      src: `${videos}/85356601998674016388.mp4`,
      poster: `${images}/7870c2e84fcdce9397dc35.jpg`,
    },
  ] satisfies GalleryMediaItem[],
} as const;

export function getServiceImage(slug: string): string | undefined {
  return siteAssets.services[slug];
}
