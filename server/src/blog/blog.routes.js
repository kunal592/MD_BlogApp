// server/src/blog/blog.routes.js
import express from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import { authenticateGoogle, requireBlogAuthor } from "../middleware/auth.js";
import {
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleLike,
  toggleBookmark,
  getMyBlogs,
  createComment,
  getComments,
  getTags,
} from "./blog.controller.js";

const router = express.Router();

// Tags
router.get("/tags", asyncHandler(getTags));

// Public blogs
router.get("/", asyncHandler(getAllBlogs));
router.get("/:slug", asyncHandler(getBlogBySlug));

// Blog actions (protected)
router.post("/", authenticateGoogle, asyncHandler(createBlog));
router.put("/:id", authenticateGoogle, requireBlogAuthor, asyncHandler(updateBlog));
router.delete("/:id", authenticateGoogle, requireBlogAuthor, asyncHandler(deleteBlog));

// Like & bookmark (protected)
router.post("/:id/like", authenticateGoogle, asyncHandler(toggleLike));
router.post("/:id/bookmark", authenticateGoogle, asyncHandler(toggleBookmark));

// Comments (protected for POST, public for GET)
router.post("/:id/comments", authenticateGoogle, asyncHandler(createComment));
router.get("/:id/comments", asyncHandler(getComments));

// User's own posts
router.get("/me/posts", authenticateGoogle, asyncHandler(getMyBlogs));

export { router as blogRoutes };
