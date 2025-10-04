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
  getFeed,
  publishBlog,
  unpublishBlog,
  summarizeBlog,
  getTrending,
} from "./blog.controller.js";

const router = express.Router();

router.get("/tags", asyncHandler(getTags));
router.get("/", asyncHandler(getAllBlogs));
router.get("/:slug", asyncHandler(getBlogBySlug));

router.post("/", authenticateGoogle, asyncHandler(createBlog));
router.put("/:id", authenticateGoogle, requireBlogAuthor, asyncHandler(updateBlog));
router.delete("/:id", authenticateGoogle, requireBlogAuthor, asyncHandler(deleteBlog));

router.post("/:id/like", authenticateGoogle, asyncHandler(toggleLike));
router.post("/:id/bookmark", authenticateGoogle, asyncHandler(toggleBookmark));
router.post("/:id/comments", authenticateGoogle, asyncHandler(createComment));
router.get("/:id/comments", asyncHandler(getComments));
router.get("/me/posts", authenticateGoogle, asyncHandler(getMyBlogs));

// 🆕 New
router.get("/feed", authenticateGoogle, asyncHandler(getFeed));
router.put("/:id/publish", authenticateGoogle, requireBlogAuthor, asyncHandler(publishBlog));
router.put("/:id/unpublish", authenticateGoogle, requireBlogAuthor, asyncHandler(unpublishBlog));
router.post("/summarize", authenticateGoogle, asyncHandler(summarizeBlog));
router.get("/trending", asyncHandler(getTrending));

export { router as blogRoutes };
