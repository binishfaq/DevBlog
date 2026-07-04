import api from "../api/axios";

export const createPost = async (postData) => {
  const token = localStorage.getItem("token");

  const response = await api.post("/posts", postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};



export const getMyPosts = async () => {
  const response = await api.get("/posts/my-posts");
  return response.data;
};

export const getSinglePost = async (id) => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};

export const updatePost = async (id, post) => {
  const res = await api.put(`/posts/${id}`, post);
  return res.data;
};

export const deletePost = async (id) => {
  const res = await api.delete(`/posts/${id}`);
  return res.data;
};