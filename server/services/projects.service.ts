import sanitizeHtml from 'sanitize-html';
import { ProjectStatus } from '@prisma/client';
import { db } from '../lib/db.js';
import { AppError } from '../lib/app-error.js';
import { slugify } from '../utils/slugify.js';

const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    'img',
    'h1',
    'h2',
    'h3',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
  ]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ['src', 'alt', 'title', 'width', 'height'],
    a: ['href', 'name', 'target', 'rel'],
    td: ['colspan', 'rowspan'],
    th: ['colspan', 'rowspan'],
  },
};

export type ProjectInput = {
  title: string;
  slug?: string;
  excerpt?: string;
  contentHtml: string;
  coverUrl?: string;
  galleryJson?: string[];
  tags?: string[];
  status?: ProjectStatus;
};

function sanitizeContent(html: string) {
  return sanitizeHtml(html, sanitizeOptions);
}

async function ensureUniqueSlug(base: string, excludeId?: string) {
  let slug = slugify(base);
  let counter = 1;
  while (true) {
    const existing = await db.project.findUnique({ where: { slug } });
    if (!existing || existing.id === excludeId) return slug;
    slug = `${slugify(base)}-${counter++}`;
  }
}

export async function listProjects(params: {
  status?: ProjectStatus;
  page?: number;
  limit?: number;
  tag?: string;
}) {
  const page = params.page ?? 1;
  const limit = Math.min(params.limit ?? 12, 50);
  const skip = (page - 1) * limit;

  const where = {
    ...(params.status ? { status: params.status } : {}),
    ...(params.tag ? { tags: { has: params.tag } } : {}),
  };

  const [items, total] = await Promise.all([
    db.project.findMany({
      where,
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      skip,
      take: limit,
    }),
    db.project.count({ where }),
  ]);

  return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function getProjectBySlug(slug: string, publicOnly = true) {
  const project = await db.project.findUnique({ where: { slug } });
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');
  if (publicOnly && project.status !== ProjectStatus.PUBLISHED) {
    throw new AppError('Project not found', 404, 'NOT_FOUND');
  }
  return project;
}

export async function getProjectById(id: string) {
  const project = await db.project.findUnique({ where: { id } });
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');
  return project;
}

export async function createProject(input: ProjectInput) {
  const slug = await ensureUniqueSlug(input.slug ?? input.title);
  const status = input.status ?? ProjectStatus.DRAFT;

  return db.project.create({
    data: {
      title: input.title,
      slug,
      excerpt: input.excerpt,
      contentHtml: sanitizeContent(input.contentHtml),
      coverUrl: input.coverUrl,
      galleryJson: input.galleryJson ?? [],
      tags: input.tags ?? [],
      status,
      publishedAt: status === ProjectStatus.PUBLISHED ? new Date() : null,
    },
  });
}

export async function updateProject(id: string, input: Partial<ProjectInput>) {
  const existing = await getProjectById(id);
  const slug =
    input.slug || input.title
      ? await ensureUniqueSlug(input.slug ?? input.title!, id)
      : existing.slug;

  const status = input.status ?? existing.status;
  const wasPublished = existing.status === ProjectStatus.PUBLISHED;
  const willPublish = status === ProjectStatus.PUBLISHED;

  return db.project.update({
    where: { id },
    data: {
      ...(input.title ? { title: input.title } : {}),
      slug,
      ...(input.excerpt !== undefined ? { excerpt: input.excerpt } : {}),
      ...(input.contentHtml
        ? { contentHtml: sanitizeContent(input.contentHtml) }
        : {}),
      ...(input.coverUrl !== undefined ? { coverUrl: input.coverUrl } : {}),
      ...(input.galleryJson ? { galleryJson: input.galleryJson } : {}),
      ...(input.tags ? { tags: input.tags } : {}),
      status,
      publishedAt:
        willPublish && !wasPublished
          ? new Date()
          : willPublish
            ? existing.publishedAt
            : null,
    },
  });
}

export async function deleteProject(id: string) {
  await getProjectById(id);
  await db.project.delete({ where: { id } });
}
