import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  username: { type: String, required: true, unique: true, trim: true, lowercase: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  bio: { type: String, default: "" },
  avatar: { type: String, default: "" },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  isVerified: { type: Boolean, default: true },
  verificationToken: { type: String, default: "" },
  verificationTokenExpires: { type: Date },
  resetPasswordToken: { type: String, default: "" },
  resetPasswordExpires: { type: Date },
}, { timestamps: true });

// ✅ No pre-save hook - password hashing done in controller

export default mongoose.model("User", UserSchema);