import Post from "../models/Post.js";
import mongoose from "mongoose";  // ✅ Add this import

// ==================== CREATE POST ====================
export const createPost = async (req, res) => {
  try {
    const { title, content, category, tags, featuredImage, status } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, content, and category are required",
      });
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    const post = await Post.create({
      title,
      slug,
      content,
      category,
      tags: tags || [],
      featuredImage: featuredImage || "",
      status: status || "draft",
      author: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== GET MY POSTS ====================
export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error("Get my posts error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== GET SINGLE POST ====================
export const getSinglePost = async (req, res) => {
  try {
    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID format",
      });
    }

    const post = await Post.findOne({
      _id: req.params.id,
      author: req.user._id,
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error("Get single post error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== UPDATE POST ====================
export const updatePost = async (req, res) => {
  try {
    const { title, content, category, tags, featuredImage, status } = req.body;

    // Find post and check ownership
    const post = await Post.findOne({
      _id: req.params.id,
      author: req.user._id,
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Update slug if title changed
    let slug = post.slug;
    if (title && title !== post.title) {
      slug = title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    }

    // Update post
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: title || post.title,
        slug,
        content: content || post.content,
        category: category || post.category,
        tags: tags || post.tags,
        featuredImage: featuredImage !== undefined ? featuredImage : post.featuredImage,
        status: status || post.status,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Update post error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== DELETE POST ====================
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id,
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Delete post error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== GET POST BY SLUG (Public) ====================
// ==================== GET POST BY SLUG (Public) ====================
export const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({
      slug: req.params.slug,
      status: "published",
    }).populate("author", "username fullName email avatar bio role");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // ✅ Increment views - this runs every time ANYONE views the post
    post.views += 1;
    await post.save();

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error("Get post by slug error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ==================== GET ALL PUBLISHED POSTS (Public) ====================
export const getPosts = async (req, res) => {
  try {
    const { search, category, sort, page = 1, limit = 6 } = req.query;
    let query = { status: "published" };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "all") {
      query.category = category;
    }

    let sortOption = { createdAt: -1 };
    if (sort === "popular") sortOption = { likes: -1 };
    if (sort === "trending") sortOption = { views: -1 };
    if (sort === "oldest") sortOption = { createdAt: 1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Post.countDocuments(query);
    const totalPages = Math.ceil(total / parseInt(limit));

    const posts = await Post.find(query)
      .populate("author", "username fullName email avatar bio role createdAt")
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      posts,
      total,
      totalPages,
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== LIKE POST ====================
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    post.likes += 1;
    await post.save();

    res.status(200).json({
      success: true,
      likes: post.likes,
    });
  } catch (error) {
    console.error("Like post error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== ADD COMMENT ====================
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Comment text is required",
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    post.comments.push({
      user: req.user._id,
      text,
    });

    await post.save();
    await post.populate("comments.user", "username fullName avatar");

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comments: post.comments,
    });
  } catch (error) {
    console.error("Add comment error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== DELETE COMMENT ====================
export const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const comment = post.comments.id(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (
      comment.user.toString() !== req.user._id.toString() &&
      post.author.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    comment.deleteOne();
    await post.save();

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Delete comment error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== GET CATEGORIES ====================
export const getCategories = async (req, res) => {
  try {
    const categories = await Post.distinct("category", { status: "published" });

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};