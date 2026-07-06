import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import Post from "../models/Post.model.js";
import {
  getPosts,
  getMyPosts,
  getPostById,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  addComment,
  getCategories,
  getAllCategories
} from "../controllers/post.controller.js";

const router = express.Router();

// ============================================
// PUBLIC ROUTES
// ============================================

// ✅ Static routes first (no parameters)
router.get("/categories", getAllCategories);
router.get("/categories/all", getCategories);
router.get("/", getPosts);

// ============================================
// PROTECTED ROUTES - MUST COME BEFORE /:id
// ============================================

// ✅ IMPORTANT: Specific routes must come BEFORE parameter routes
router.get("/my-posts", protect, getMyPosts);  // <-- MOVED HERE - BEFORE /:id

router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);
router.post("/:id/like", protect, toggleLike);
router.post("/:id/comments", protect, addComment);

// ============================================
// PARAMETER ROUTES - MUST COME LAST
// ============================================

// ✅ Slug route
router.get("/slug/:slug", getPostBySlug);

// ✅ ID route (catch-all - must be absolute last)
router.get("/:id", getPostById);

// ============================================
// DELETE COMMENT ROUTE
// ============================================
router.delete("/comments/:commentId", protect, async (req, res) => {
  try {
    const { commentId } = req.params;
    console.log("📡 Deleting comment:", commentId);
    
    const post = await Post.findOne({ 'comments._id': commentId });
    
    if (!post) {
      return res.status(404).json({ message: "Comment not found" });
    }
    
    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    
    // Check if user is authorized
    if (comment.user.toString() !== req.user._id.toString() && 
        post.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }
    
    comment.deleteOne();
    await post.save();
    
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Delete comment error:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;