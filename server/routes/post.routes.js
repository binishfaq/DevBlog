import express from "express";
import {
  createPost,
  getMyPosts,
  getSinglePost,
  updatePost,
  deletePost,
  getPostBySlug,
  getPosts,
  getCategories,
} from "../controllers/post.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

// ============ PUBLIC ROUTES ============
router.get("/", getPosts);
router.get("/slug/:slug", getPostBySlug);
router.get("/categories/all", getCategories);

// ============ PROTECTED ROUTES ============
router.post("/", protect, createPost);
router.get("/my-posts", protect, getMyPosts);
router.get("/:id", protect, getSinglePost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

export default router;