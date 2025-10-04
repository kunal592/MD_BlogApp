// server/src/notification/contact.routes.js
import express from "express";
import { authenticateGoogle, requireAdmin } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import {
  createContactRequest,
  getContactRequests,
  updateContactRequestStatus,
} from "./contact.controller.js";

const router = express.Router();

// Public route: anyone can submit a contact request
router.post("/", asyncHandler(createContactRequest));

// Admin-only routes: must be authenticated + admin
router.get("/", authenticateGoogle, requireAdmin, asyncHandler(getContactRequests));
router.put("/:id", authenticateGoogle, requireAdmin, asyncHandler(updateContactRequestStatus));

export { router as contactRoutes };
