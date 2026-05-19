export const paths = {
  home: '/',
  services: '/dich-vu',
  serviceDetail: (slug: string) => `/dich-vu/${slug}`,
  projects: '/du-an-hoan-thanh',
  projectDetail: (slug: string) => `/du-an-hoan-thanh/${slug}`,
  contact: '/lien-he',
  pricing: '/#bang-gia',
  admin: {
    login: '/admin/login',
    projects: '/admin/projects',
    projectNew: '/admin/projects/new',
    projectEdit: (id: string) => `/admin/projects/${id}/edit`,
  },
  api: {
    base: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1',
    auth: {
      login: '/auth/login',
      refresh: '/auth/refresh',
      me: '/auth/me',
    },
    projects: '/projects',
    project: (id: string) => `/projects/${id}`,
    media: '/media/upload',
  },
} as const;
