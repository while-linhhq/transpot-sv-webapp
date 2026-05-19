import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { healthRouter } from './routes/health.routes.js';
import { authRouter } from './routes/auth.routes.js';
import { projectsRouter } from './routes/projects.routes.js';
import { mediaRouter } from './routes/media.routes.js';
import { notFound } from './middlewares/not-found.js';
import { errorHandler } from './middlewares/error-handler.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createApp() {
  const app = express();

  const allowedOrigins =
    process.env.ALLOWED_ORIGINS?.split(',').map((o) => o.trim()) ?? [
      'http://localhost:3000',
    ];

  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  );
  app.use(express.json({ limit: '5mb' }));

  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  app.use('/api/v1', healthRouter);
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/projects', projectsRouter);
  app.use('/api/v1/media', mediaRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
