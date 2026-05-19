import { paths } from '@/router/paths';
import type { Project, ProjectsListResponse } from '@/features/projects/services/projects-api';

type ApiResponse<T> = {
  success: boolean;
  data?: T;
};

async function serverFetch<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await fetch(`${paths.api.base}${endpoint}`, {
      next: { revalidate: 60 },
    });
    const json = (await res.json()) as ApiResponse<T>;
    if (!res.ok || !json.success) return null;
    return json.data ?? null;
  } catch {
    return null;
  }
}

export async function getPublishedProjects(limit = 24) {
  return serverFetch<ProjectsListResponse>(
    `${paths.api.projects}?status=PUBLISHED&limit=${limit}`
  );
}

export async function getProjectBySlug(slug: string) {
  return serverFetch<Project>(`${paths.api.projects}/slug/${slug}`);
}
