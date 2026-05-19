import type { Request, Response } from 'express';
import { z } from 'zod';
import { ProjectStatus } from '@prisma/client';
import * as projectsService from '../services/projects.service.js';
import { AppError } from '../lib/app-error.js';

function paramAsString(value: string | string[]): string {
  return Array.isArray(value) ? value[0] : value;
}

const projectSchema = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  contentHtml: z.string().min(1),
  coverUrl: z.string().optional(),
  galleryJson: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
});

export async function list(req: Request, res: Response) {
  const isAdmin = !!req.user;
  const statusParam = req.query.status as string | undefined;
  const status =
    statusParam === 'DRAFT' || statusParam === 'PUBLISHED'
      ? (statusParam as ProjectStatus)
      : isAdmin
        ? undefined
        : ProjectStatus.PUBLISHED;

  const data = await projectsService.listProjects({
    status,
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 12,
    tag: req.query.tag as string | undefined,
  });
  res.json({ success: true, data });
}

export async function getBySlug(req: Request, res: Response) {
  const publicOnly = !req.user;
  const data = await projectsService.getProjectBySlug(
    paramAsString(req.params.slug),
    publicOnly
  );
  res.json({ success: true, data });
}

export async function getById(req: Request, res: Response) {
  const data = await projectsService.getProjectById(paramAsString(req.params.id));
  res.json({ success: true, data });
}

export async function create(req: Request, res: Response) {
  const parsed = projectSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError('Validation failed', 422, 'VALIDATION_ERROR');
  }
  const data = await projectsService.createProject(parsed.data);
  res.status(201).json({ success: true, data });
}

export async function update(req: Request, res: Response) {
  const parsed = projectSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    throw new AppError('Validation failed', 422, 'VALIDATION_ERROR');
  }
  const data = await projectsService.updateProject(
    paramAsString(req.params.id),
    parsed.data
  );
  res.json({ success: true, data });
}

export async function remove(req: Request, res: Response) {
  await projectsService.deleteProject(paramAsString(req.params.id));
  res.json({ success: true, data: { deleted: true } });
}
