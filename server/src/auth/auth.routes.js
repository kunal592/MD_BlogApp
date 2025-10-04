import { Router } from 'express';
import { googleAuth, getMe, logout } from './auth.controller.js';
import { authenticateGoogle } from '../middleware/auth.js';

export const authRoutes = Router();

authRoutes.post('/google', googleAuth);
authRoutes.get('/me', authenticateGoogle, getMe);
authRoutes.post('/logout', logout);
