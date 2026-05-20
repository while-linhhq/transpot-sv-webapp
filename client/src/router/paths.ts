export const paths = {
  home: '/',
  services: '/dich-vu',
  serviceDetail: (slug: string) => `/dich-vu/${slug}`,
  projects: '/du-an-hoan-thanh',
  contact: '/lien-he',
  pricing: '/#bang-gia',
} as const;
