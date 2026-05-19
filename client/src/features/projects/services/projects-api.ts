import { apiFetch } from '@/lib/http-client';
import { paths } from '@/router/paths';

export type Project = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  contentHtml: string;
  coverUrl: string | null;
  galleryJson: string[];
  tags: string[];
  status: 'DRAFT' | 'PUBLISHED';
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ProjectsListResponse = {
  items: Project[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export async function fetchPublishedProjects(params?: {
  page?: number;
  limit?: number;
  tag?: string;
}) {
  const search = new URLSearchParams({
    status: 'PUBLISHED',
    page: String(params?.page ?? 1),
    limit: String(params?.limit ?? 12),
  });
  if (params?.tag) search.set('tag', params.tag);
  return apiFetch<ProjectsListResponse>(
    `${paths.api.projects}?${search.toString()}`
  );
}

export async function fetchProjectBySlug(slug: string) {
  return apiFetch<Project>(`${paths.api.projects}/slug/${slug}`);
}

export async function fetchAllProjects(params?: { page?: number }) {
  const search = new URLSearchParams({
    page: String(params?.page ?? 1),
    limit: '50',
  });
  return apiFetch<ProjectsListResponse>(
    `${paths.api.projects}?${search.toString()}`
  );
}

export async function fetchProjectById(id: string) {
  return apiFetch<Project>(`${paths.api.project(id)}`);
}

export async function createProject(data: Partial<Project>) {
  return apiFetch<Project>(paths.api.projects, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateProject(id: string, data: Partial<Project>) {
  return apiFetch<Project>(paths.api.project(id), {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteProject(id: string) {
  return apiFetch<{ deleted: boolean }>(paths.api.project(id), {
    method: 'DELETE',
  });
}

export async function uploadMedia(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return apiFetch<{ url: string; fullUrl: string }>(paths.api.media, {
    method: 'POST',
    body: formData,
  });
}
