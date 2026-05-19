import type { ErrorRequestHandler } from 'express';
import { AppError } from '../lib/app-error.js';
import { logger } from '../utils/logger.js';

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const isOperational = err instanceof AppError && err.isOperational;

  logger.error(
    {
      err,
      req: { method: req.method, url: req.originalUrl ?? req.url },
    },
    'Request error'
  );

  if (!isOperational) {
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' },
    });
    return;
  }

  res.status(statusCode).json({
    success: false,
    error: {
      code: err instanceof AppError ? err.code : 'ERROR',
      message: err.message,
    },
  });
};
