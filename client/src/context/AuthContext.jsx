import { createContext, useContext, useEffect, useState } from "react";

import {
  loginUser,
  logoutUser,
  registerUser,
  getCurrentUser,
} from "../services/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // Check login on app start
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const data = await getCurrentUser();

      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Register
  const register = async (formData) => {
    const data = await registerUser(formData);

    setUser(data.user);

    return data;
  };

  // Login
  const login = async (formData) => {
    const data = await loginUser(formData);

    setUser(data.user);

    return data;
  };

  // Logout
  const logout = async () => {
    await logoutUser();

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        checkUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);