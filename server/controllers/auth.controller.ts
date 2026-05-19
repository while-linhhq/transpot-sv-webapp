import type { Request, Response } from 'express';
import { z } from 'zod';
import * as authService from '../services/auth.service.js';
import { AppError } from '../lib/app-error.js';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError('Validation failed', 422, 'VALIDATION_ERROR');
  }
  const data = await authService.login(parsed.data.email, parsed.data.password);
  res.json({ success: true, data });
}

export async function refresh(req: Request, res: Response) {
  const parsed = refreshSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError('Validation failed', 422, 'VALIDATION_ERROR');
  }
  const data = await authService.refresh(parsed.data.refreshToken);
  res.json({ success: true, data });
}

export async function me(req: Request, res: Response) {
  const user = await authService.getMe(req.user!.userId);
  res.json({ success: true, data: user });
}
