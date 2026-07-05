import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

// ✅ FIX: Hash password before saving
UserSchema.pre("save", function(next) {
  // Only hash if password is modified
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    console.log("✅ Password hashed for:", this.email);
    next();
  } catch (error) {
    console.error("❌ Password hashing error:", error);
    next(error);
  }
});

// ✅ Compare password method
UserSchema.methods.comparePassword = function(candidatePassword) {
  try {
    if (!candidatePassword || !this.password) {
      return false;
    }
    return bcrypt.compareSync(candidatePassword, this.password);
  } catch (error) {
    console.error("❌ Compare password error:", error);
    return false;
  }
};

export default mongoose.model("User", UserSchema);