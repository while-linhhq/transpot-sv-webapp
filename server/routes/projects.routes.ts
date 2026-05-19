import { Router } from 'express';
import { asyncHandler } from '../utils/async-handler.js';
import * as projectsController from '../controllers/projects.controller.js';
import { authenticate } from '../middlewares/auth.js';

export const projectsRouter = Router();

projectsRouter.get('/', asyncHandler(projectsController.list));
projectsRouter.get('/slug/:slug', asyncHandler(projectsController.getBySlug));
projectsRouter.get('/:id', authenticate, asyncHandler(projectsController.getById));
projectsRouter.post('/', authenticate, asyncHandler(projectsController.create));
projectsRouter.patch('/:id', authenticate, asyncHandler(projectsController.update));
projectsRouter.delete('/:id', authenticate, asyncHandler(projectsController.remove));
