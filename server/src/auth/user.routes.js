import { Router } from 'express';
import { authenticateGoogle } from '../middleware/auth.js';
import {
  getUserById,
  followUser,
  unfollowUser,
  getDashboard,
  getStats,
  getLikedBlogs,
  getBookmarkedBlogs,
  updateMe,
} from './user.controller.js';

const router = Router();

// ---------------------
// 🔒 Protected routes
// ---------------------

// Dashboard + Stats
router.get('/dashboard', authenticateGoogle, getDashboard);
router.get('/stats', authenticateGoogle, getStats);

// User interactions
router.get('/likes', authenticateGoogle, getLikedBlogs);
router.get('/bookmarks', authenticateGoogle, getBookmarkedBlogs);

// Profile update
router.put('/profile', authenticateGoogle, updateMe);

// Follow system
router.post('/:id/follow', authenticateGoogle, followUser);
router.post('/:id/unfollow', authenticateGoogle, unfollowUser);

// ---------------------
// 🌍 Public routes
// ---------------------
router.get('/:id', getUserById);

export { router as userRoutes };
