import Like from "../models/Like.js";
import Post from "../models/Post.js";

// ==================== TOGGLE LIKE ====================
export const toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const existingLike = await Like.findOne({ post: postId, user: userId });

    if (existingLike) {
      await Like.findByIdAndDelete(existingLike._id);
      const likeCount = await Like.countDocuments({ post: postId });

      return res.status(200).json({
        success: true,
        message: "Post unliked",
        liked: false,
        likes: likeCount,
      });
    } else {
      await Like.create({
        post: postId,
        user: userId,
      });
      const likeCount = await Like.countDocuments({ post: postId });

      return res.status(200).json({
        success: true,
        message: "Post liked",
        liked: true,
        likes: likeCount,
      });
    }
  } catch (error) {
    console.error("Like error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== GET POST LIKES ====================
export const getPostLikes = async (req, res) => {
  try {
    const { postId } = req.params;
    
    const likes = await Like.find({ post: postId })
      .populate("user", "username fullName avatar")
      .sort({ createdAt: -1 });

    const likeCount = await Like.countDocuments({ post: postId });

    res.status(200).json({
      success: true,
      likes,
      likeCount,
    });
  } catch (error) {
    console.error("Get likes error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== CHECK IF USER LIKED POST ====================
export const checkUserLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    const like = await Like.findOne({ post: postId, user: userId });

    res.status(200).json({
      success: true,
      liked: !!like,
    });
  } catch (error) {
    console.error("Check like error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};