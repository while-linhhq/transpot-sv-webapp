import type { ErrorRequestHandler } from 'express';

import { logger } from '../utils/logger';

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  logger.error(
    {
      err,
      req: {
        method: req.method,
        url: req.originalUrl ?? req.url,
      },
    },
    'Unhandled error'
  );

  res.status(500).json({
    success: false,
    error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' },
  });
};

