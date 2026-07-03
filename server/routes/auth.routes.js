import express from "express";
import protect from "../middleware/auth.middleware.js";

import {
  register,
  login,
  getCurrentUser,
  logout,
} from "../controllers/auth.controller.js";

import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator.js";

import validate from "../middleware/validate.js";

const router = express.Router();

// Register
router.post(
  "/register",
  registerValidator,
  validate,
  register
);

// Login
router.post(
  "/login",
  loginValidator,
  validate,
  login
);

// Current User
router.get("/me", protect, getCurrentUser);

// Logout
router.post("/logout", logout);

export default router;