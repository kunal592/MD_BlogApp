import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// configure env
dotenv.config();

// routers & middleware
import { errorHandler } from './middleware/errorHandler.js';
import { authRoutes } from './auth/auth.routes.js';
import { userRoutes } from './auth/user.routes.js';
import { blogRoutes } from './blog/blog.routes.js';
import { commentRoutes } from './comment/comment.routes.js';
import { contactRoutes } from './notification/contact.routes.js';
import { notificationRoutes } from './notification/notification.routes.js';
import { reportRoutes } from './report/report.routes.js';

const app = express();
const PORT = process.env.PORT || 5003;

// security
app.use(helmet({ contentSecurityPolicy: false }));
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// rate limiting (only in production)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2000,
});
if (process.env.NODE_ENV === 'production') app.use(limiter);

// core middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// api mount points
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/blogs/:slug/comments', commentRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/notifications', notificationRoutes);

// health
app.get('/api/health', (req, res) =>
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() })
);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// global error handler
app.use(errorHandler);

// start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 API available at http://localhost:${PORT}/api`);
});
