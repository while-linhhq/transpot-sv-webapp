import { Router } from 'express';
import { asyncHandler } from '../utils/async-handler.js';
import * as mediaController from '../controllers/media.controller.js';
import { authenticate } from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';

export const mediaRouter = Router();

mediaRouter.post(
  '/upload',
  authenticate,
  upload.single('file'),
  asyncHandler(mediaController.upload)
);
