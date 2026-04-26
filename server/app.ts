import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { healthRouter } from './routes/health.routes';
import { notFound } from './middlewares/not-found';
import { errorHandler } from './middlewares/error-handler';

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: false,
      credentials: true,
    })
  );
  app.use(express.json({ limit: '1mb' }));

  app.use('/api/v1', healthRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

