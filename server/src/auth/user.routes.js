import { Router } from 'express';
import { authenticateGoogle } from '../middleware/auth.js';
import {
  getUserById,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  getDashboard,
  getStats,
  getLikedBlogs,
  getBookmarkedBlogs,
  updateMe,
} from './user.controller.js';

const router = Router();

// Protected
router.get('/dashboard', authenticateGoogle, getDashboard);
router.get('/stats', authenticateGoogle, getStats);
router.get('/likes', authenticateGoogle, getLikedBlogs);
router.get('/bookmarks', authenticateGoogle, getBookmarkedBlogs);
router.put('/profile', authenticateGoogle, updateMe);
router.post('/:id/follow', authenticateGoogle, followUser);
router.post('/:id/unfollow', authenticateGoogle, unfollowUser);

// Public
router.get('/:id/followers', getFollowers);
router.get('/:id/following', getFollowing);
router.get('/:id', getUserById);

export { router as userRoutes };
