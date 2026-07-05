import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent duplicate likes
LikeSchema.index({ post: 1, user: 1 }, { unique: true });

export default mongoose.model("Like", LikeSchema);