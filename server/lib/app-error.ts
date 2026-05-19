export class AppError extends Error {
  constructor(
    message: string,
    public statusCode = 500,
    public code = 'INTERNAL_ERROR'
  ) {
    super(message);
    this.name = 'AppError';
    this.isOperational = true;
  }

  isOperational = true;
}
