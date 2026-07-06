import api from "../api/axios";

// ============================================
// SINGLE POST (Handles both ID and slug)
// ============================================
export const getSinglePost = async (id) => {
  try {
    console.log("📡 Fetching post with ID/slug:", id);
    
    // Try as ID first
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      // If it's a 400 (invalid ID format), try as slug
      if (error.response?.status === 400) {
        console.log("Not found by ID, trying as slug...");
        const response = await api.get(`/posts/slug/${id}`);
        return response.data;
      }
      // If it's a 404, try as slug
      if (error.response?.status === 404) {
        console.log("Not found by ID (404), trying as slug...");
        const response = await api.get(`/posts/slug/${id}`);
        return response.data;
      }
      throw error;
    }
  } catch (error) {
    console.error("❌ Error fetching post:", error);
    throw error;
  }
};

// ============================================
// GET ALL POSTS
// ============================================
export const getPosts = async () => {
  try {
    const response = await api.get("/posts");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

// ============================================
// GET CATEGORIES
// ============================================
export const getCategories = async () => {
  try {
    const response = await api.get("/posts/categories/all");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// ============================================
// GET POST BY ID
// ============================================
export const getPostById = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};

// ============================================
// GET MY POSTS
// ============================================
export const getMyPosts = async () => {
  try {
    const response = await api.get("/posts/my-posts");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching my posts:", error);
    return [];
  }
};

// ============================================
// CREATE POST
// ============================================
export const createPost = async (postData) => {
  try {
    const response = await api.post("/posts", postData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// ============================================
// UPDATE POST
// ============================================
export const updatePost = async (id, postData) => {
  try {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

// ============================================
// DELETE POST
// ============================================
export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

// ============================================
// LIKE POST
// ============================================
export const likePost = async (id) => {
  try {
    const response = await api.post(`/posts/${id}/like`);
    return response.data;
  } catch (error) {
    console.error("Error liking post:", error);
    throw error;
  }
};

// ============================================
// ADD COMMENT
// ============================================
export const addComment = async (id, text) => {
  try {
    const response = await api.post(`/posts/${id}/comments`, { text });
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

// ============================================
// DELETE COMMENT
// ============================================
export const deleteComment = async (commentId) => {
  try {
    const response = await api.delete(`/posts/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};