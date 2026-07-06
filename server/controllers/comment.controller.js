import Comment from "../models/Comment.js";
import Post from "../models/Post.model.js";

// ==================== ADD COMMENT ====================
export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment text is required",
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const comment = await Comment.create({
      post: postId,
      user: userId,
      text: text.trim(),
    });

    await comment.populate("user", "username fullName avatar");

    const comments = await Comment.find({ post: postId })
      .populate("user", "username fullName avatar")
      .sort({ createdAt: -1 });

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment,
      comments,
      commentCount: comments.length,
    });
  } catch (error) {
    console.error("Add comment error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== GET POST COMMENTS ====================
export const getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("user", "username fullName avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      comments,
      commentCount: comments.length,
    });
  } catch (error) {
    console.error("Get comments error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== DELETE COMMENT ====================
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (comment.user.toString() !== userId.toString()) {
      const post = await Post.findById(comment.post);
      if (!post || post.author.toString() !== userId.toString()) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized to delete this comment",
        });
      }
    }

    await Comment.findByIdAndDelete(commentId);

    const comments = await Comment.find({ post: comment.post })
      .populate("user", "username fullName avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      comments,
      commentCount: comments.length,
    });
  } catch (error) {
    console.error("Delete comment error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== UPDATE COMMENT ====================
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this comment",
      });
    }

    comment.text = text.trim();
    comment.updatedAt = new Date();
    await comment.save();

    await comment.populate("user", "username fullName avatar");

    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    console.error("Update comment error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};