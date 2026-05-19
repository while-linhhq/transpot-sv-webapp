import { Router } from 'express';
import { asyncHandler } from '../utils/async-handler.js';
import * as authController from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.js';

export const authRouter = Router();

authRouter.post('/login', asyncHandler(authController.login));
authRouter.post('/refresh', asyncHandler(authController.refresh));
authRouter.get('/me', authenticate, asyncHandler(authController.me));
