import api from "../api/axios";

// Login user
export const loginUser = async (credentials) => {
  try {
    console.log("📝 loginUser called with:", credentials);
    const response = await api.post("/auth/login", credentials);
    console.log("✅ loginUser response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ loginUser error:", error.response?.data || error.message);
    throw error;
  }
};

// Register user
export const registerUser = async (userData) => {
  try {
    console.log("📝 registerUser called with:", userData);
    const response = await api.post("/auth/register", userData);
    console.log("✅ registerUser response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ registerUser error:", error.response?.data || error.message);
    throw error;
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    console.error("❌ getCurrentUser error:", error.response?.data || error.message);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (userData) => {
  try {
    const response = await api.put("/auth/update", userData);
    return response.data;
  } catch (error) {
    console.error("❌ updateUserProfile error:", error.response?.data || error.message);
    throw error;
  }
};