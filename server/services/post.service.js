import api from "../api/axios";

export const createPost = async (postData) => {
  const response = await api.post("/posts", postData);
  return response.data;
};

export const getMyPosts = async () => {
  const response = await api.get("/posts/my-posts");
  return response.data;
};

export const getSinglePost = async (id) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const updatePost = async (id, postData) => {
  const response = await api.put(`/posts/${id}`, postData);
  return response.data;
};

export const deletePost = async (id) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};

export const getPostBySlug = async (slug) => {
  const response = await api.get(`/posts/slug/${slug}`);
  return response.data;
};

export const likePost = async (id) => {
  const response = await api.post(`/posts/${id}/like`);
  return response.data;
};

export const addComment = async (id, text) => {
  const response = await api.post(`/posts/${id}/comments`, { text });
  return response.data;
};