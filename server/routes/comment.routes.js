import express from "express";
import {
  addComment,
  getPostComments,
  deleteComment,
  updateComment,
} from "../controllers/comment.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

// ✅ Public route
router.get("/:postId", getPostComments);

// ✅ Protected routes
router.post("/:postId", protect, addComment);
router.delete("/:commentId", protect, deleteComment);
router.put("/:commentId", protect, updateComment);

export default router;