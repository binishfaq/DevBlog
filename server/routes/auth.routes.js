import express from "express";
import protect from "../middleware/auth.middleware.js";
import passport from "../config/passport.js";

import {
  register,
  login,
  getCurrentUser,
  logout,
  updateUser,
  uploadAvatar,
  forgotPassword,
  resetPassword,
  googleAuthSuccess,
} from "../controllers/auth.controller.js";

import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator.js";

import validate from "../middleware/validate.js";

const router = express.Router();

// ============ AUTH ROUTES ============

// Register
router.post("/register", registerValidator, validate, register);

// Login
router.post("/login", loginValidator, validate, login);

// Current User
router.get("/me", protect, getCurrentUser);

// Logout
router.post("/logout", logout);

// Update User
router.put("/update", protect, updateUser);

// Upload Avatar
router.post("/upload-avatar", protect, uploadAvatar);

// ============ PASSWORD RESET ROUTES ============

// Forgot Password - Request reset link
router.post("/forgot-password", forgotPassword);

// Reset Password - Use token to reset
router.post("/reset-password/:token", resetPassword);

// ============ GOOGLE OAUTH ROUTES ============

// Initiate Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  googleAuthSuccess
);

// ============ GITHUB OAUTH ROUTES ============

// Initiate GitHub OAuth
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub OAuth Callback
router.get(
  "/github/callback",
  passport.authenticate("github", { session: false, failureRedirect: "/login" }),
  googleAuthSuccess
);

export default router;