import Post from "../models/Post.js";
import mongoose from "mongoose";

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

    let slug = post.slug;
    if (title && title !== post.title) {
      slug = title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    }

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

// ==================== GET POST BY SLUG ====================
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

    // Increment views
    if (typeof post.views !== "number") post.views = 0;
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

// ==================== GET ALL PUBLISHED POSTS ====================
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
    if (sort === "popular") sortOption = { views: -1 };
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