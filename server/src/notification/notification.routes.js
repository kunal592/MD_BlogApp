// server/src/notification/notification.routes.js
import express from "express";
import { authenticateGoogle } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import {
  getNotifications,
  getUnreadNotifications,
  markAsRead,
  markAllAsRead,
} from "./notification.controller.js";

const router = express.Router();

// ✅ Get all notifications (paginated)
router.get("/", authenticateGoogle, asyncHandler(getNotifications));

// ✅ Get only unread notifications
router.get("/unread", authenticateGoogle, asyncHandler(getUnreadNotifications));

// ✅ Mark one notification as read
router.post("/:id/read", authenticateGoogle, asyncHandler(markAsRead));

// ✅ Mark all notifications as read
router.post("/read-all", authenticateGoogle, asyncHandler(markAllAsRead));

export { router as notificationRoutes };
