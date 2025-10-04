// server/src/comment/comment.routes.js
import express from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { createComment, toggleLikeComment } from './comment.controller.js'; // ✅ FIXED
import { authenticateGoogle } from '../middleware/auth.js';

const router = express.Router({ mergeParams: true });

// GET /api/blogs/:slug/comments (implement later if needed)
router.get('/', (req, res) => {
  res.status(501).json({ success: false, message: 'getComments not implemented yet' });
});

// POST /api/blogs/:slug/comments
router.post('/', authenticateGoogle, asyncHandler(createComment));

// POST /api/blogs/:slug/comments/:commentId/like
router.post('/:commentId/like', authenticateGoogle, asyncHandler(toggleLikeComment));

export { router as commentRoutes };
