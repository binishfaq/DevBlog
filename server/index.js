import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js"; // ✅ ADD THIS IMPORT

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5000'],
  credentials: true
}));
app.use(express.json());

// Logging
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.path}`);
  next();
});

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "🚀 DevBlog API is running!",
    version: "1.0.0",
    endpoints: {
      auth: {
        register: "POST /api/auth/register",
        login: "POST /api/auth/login",
        profile: "GET /api/auth/me",
        update: "PUT /api/auth/update"
      },
      posts: {
        all: "GET /api/posts",
        myPosts: "GET /api/posts/my-posts",  // ✅ Updated
        single: "GET /api/posts/:id",
        create: "POST /api/posts",
        update: "PUT /api/posts/:id",
        delete: "DELETE /api/posts/:id",
        like: "POST /api/posts/:id/like",
        comment: "POST /api/posts/:id/comments"
      },
      test: "GET /api/test"
    }
  });
});

// Test route
app.get("/api/test", (req, res) => {
  res.json({ 
    message: "✅ Backend is working!",
    timestamp: new Date().toISOString()
  });
});

// ✅ Mount auth routes
app.use("/api/auth", authRoutes);

// ✅ Mount post routes - THIS WAS MISSING!
app.use("/api/posts", postRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.path,
    availableEndpoints: {
      root: "/",
      test: "/api/test",
      auth: "/api/auth",
      posts: "/api/posts"
    }
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    message: "Server error",
    error: err.message
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📝 Test: http://localhost:${PORT}/api/test`);
      console.log(`📚 API Docs: http://localhost:${PORT}/`);
      console.log(`📝 Posts: http://localhost:${PORT}/api/posts`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    console.log('💡 Check your MONGODB_URI in .env file');
  });