import api from "../api/axios";

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  console.log(userData);
console.log(JSON.stringify(userData, null, 2));
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  console.log(userData);
console.log(JSON.stringify(userData, null, 2));
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};