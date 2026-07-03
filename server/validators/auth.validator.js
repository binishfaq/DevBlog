import { body } from "express-validator";

export const registerValidator = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required"),

  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const loginValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];