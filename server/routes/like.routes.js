import express from "express";
import {
  toggleLike,
  getPostLikes,
  checkUserLike,
} from "../controllers/like.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

// ✅ Public route
router.get("/:postId", getPostLikes);

// ✅ Protected routes
router.post("/:postId/toggle", protect, toggleLike);
router.get("/:postId/check", protect, checkUserLike);

export default router;