import express from "express";
import {
  createPost,
  getMyPosts,
  getSinglePost,
  updatePost,
  deletePost,
  getPostBySlug,
  likePost,
  addComment,
  deleteComment,
  getCategories,
  getPosts,
} from "../controllers/post.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

// ============ PUBLIC ROUTES (no authentication required) ============
router.get("/", getPosts);
router.get("/categories/all", getCategories);
router.get("/slug/:slug", getPostBySlug);  // ← This increments views (public viewing)

// ============ PROTECTED ROUTES (require authentication) ============
router.post("/", protect, createPost);
router.get("/my-posts", protect, getMyPosts);
router.get("/:id", protect, getSinglePost);  // ← This does NOT increment views (editing)
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);
router.post("/:id/like", protect, likePost);
router.post("/:id/comments", protect, addComment);
router.delete("/:id/comments/:commentId", protect, deleteComment);

export default router;