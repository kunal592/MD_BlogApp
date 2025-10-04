import express from 'express';
import { authenticateGoogle, requireAdmin } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { createReport, getReports } from './report.controller.js';

const router = express.Router();

router.post('/', authenticateGoogle, asyncHandler(createReport));
router.get('/admin', authenticateGoogle, requireAdmin, asyncHandler(getReports));

export { router as reportRoutes };
