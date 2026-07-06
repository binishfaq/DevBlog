import mongoose from "mongoose"; // ✅ IMPORT MONGOOSE
import Post from "../models/Post.model.js";

// ============================================
// GET ALL POSTS
// ============================================
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('createdBy', 'fullName username email avatar');
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: error.message });
  }
};

// ============================================
// GET CURRENT USER'S POSTS
// ============================================
export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 })
      .populate('createdBy', 'fullName username email avatar');
    res.json(posts);
  } catch (error) {
    console.error("Error fetching my posts:", error);
    res.status(500).json({ message: error.message });
  }
};

// ============================================
// GET SINGLE POST BY ID
// ============================================
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("📡 Fetching post with ID:", id);
    
    // ✅ Check if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post ID format" });
    }
    
    const post = await Post.findById(id)
      .populate('createdBy', 'fullName username email avatar bio')
      .populate('comments.user', 'fullName username avatar');
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    // ✅ Increment views
    post.views = (post.views || 0) + 1;
    await post.save();
    
    res.json(post);
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

// ============================================
// GET POST BY SLUG
// ============================================
export const getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    console.log("📡 Fetching post with slug:", slug);
    
    const post = await Post.findOne({ slug })
      .populate('createdBy', 'fullName username email avatar bio')
      .populate('comments.user', 'fullName username avatar');
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    // ✅ Increment views
    post.views = (post.views || 0) + 1;
    await post.save();
    
    res.json(post);
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    res.status(500).json({ message: error.message });
  }
};
// ============================================
// CREATE POST
// ============================================
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(/\s+/g, '-')
    .trim();
};

export const createPost = async (req, res) => {
  try {
    const { title, content, author, image, tags, category, status } = req.body;
    
    console.log("📝 Creating post with data:", req.body);
    
    let slug = generateSlug(title);
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      slug = `${slug}-${Date.now()}`;
    }
    
    let tagsArray = [];
    if (typeof tags === 'string') {
      tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    } else if (Array.isArray(tags)) {
      tagsArray = tags;
    }
    
    const post = await Post.create({
      title: title.trim(),
      content: content.trim(),
      author: author || req.user.fullName,
      image: image || "https://via.placeholder.com/800x400",
      tags: tagsArray,
      category: category || "General",
      slug: slug,
      status: status || "published",
      createdBy: req.user._id
    });
    
    console.log("✅ Post created:", post);
    res.status(201).json(post);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(400).json({ message: error.message });
  }
};

// ============================================
// UPDATE POST
// ============================================
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    if (post.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    
    if (req.body.title && req.body.title !== post.title) {
      const slug = generateSlug(req.body.title);
      const existingPost = await Post.findOne({ slug, _id: { $ne: req.params.id } });
      req.body.slug = existingPost ? `${slug}-${Date.now()}` : slug;
    }
    
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    res.json(updatedPost);
  } catch (error) {
    console.error("Update post error:", error);
    res.status(400).json({ message: error.message });
  }
};

// ============================================
// DELETE POST
// ============================================
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    if (post.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    
    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Delete post error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ============================================
// TOGGLE LIKE
// ============================================
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    const userIndex = post.likes.indexOf(req.user._id);
    
    if (userIndex > -1) {
      post.likes.splice(userIndex, 1);
    } else {
      post.likes.push(req.user._id);
    }
    
    await post.save();
    res.json({ likes: post.likes.length });
  } catch (error) {
    console.error("Toggle like error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ============================================
// ADD COMMENT
// ============================================
export const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    post.comments.push({
      user: req.user._id,
      text: req.body.text
    });
    
    await post.save();
    await post.populate('comments.user', 'fullName username avatar');
    res.status(201).json(post.comments);
  } catch (error) {
    console.error("Add comment error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ============================================
// GET CATEGORIES
// ============================================
export const getCategories = async (req, res) => {
  try {
    const categoryCounts = await Post.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    const result = categoryCounts.map(item => ({
      name: item._id || 'Uncategorized',
      count: item.count
    }));
    
    res.json(result);
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ============================================
// GET ALL CATEGORIES (SIMPLE LIST)
// ============================================
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Post.distinct('category');
    res.json(categories.filter(c => c && c.trim() !== ''));
  } catch (error) {
    console.error("Get all categories error:", error);
    res.status(500).json({ message: error.message });
  }
};