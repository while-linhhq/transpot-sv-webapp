import type { Request, Response } from 'express';
import path from 'path';
import { db } from '../lib/db.js';
import { AppError } from '../lib/app-error.js';

export async function upload(req: Request, res: Response) {
  if (!req.file) {
    throw new AppError('No file uploaded', 400, 'NO_FILE');
  }

  const url = `/uploads/${req.file.filename}`;
  const media = await db.media.create({
    data: {
      filename: req.file.filename,
      url,
      mime: req.file.mimetype,
      size: req.file.size,
    },
  });

  res.status(201).json({
    success: true,
    data: {
      ...media,
      fullUrl: `${process.env.API_PUBLIC_URL ?? 'http://localhost:4000'}${url}`,
    },
  });
}
