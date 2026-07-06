import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const allowedOrigins = [
  'https://client-black-six-10.vercel.app',
  'https://client-cxawofu5t-zain-bin-ishfaq.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.path}`);
  next(); // ✅ Make sure next() is called
});

// Health check
app.get("/", (req, res) => {
  res.json({ 
    message: "🚀 DevBlog API is running!",
    endpoints: {
      auth: "/api/auth",
      test: "/api/test"
    }
  });
});

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({ 
    message: "✅ Backend is working!",
    timestamp: new Date().toISOString()
  });
});

// Auth routes
app.use("/api/auth", authRoutes);

// ✅ 404 handler - Make sure it has 4 parameters (err, req, res, next)
app.use((err, req, res, next) => {
  console.error('Error stack:', err.stack);
  res.status(500).json({ 
    message: "Server error", 
    error: err.message 
  });
});

// ✅ Error handler - Must come AFTER all routes
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: "Server error", 
    error: err.message 
  });
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📝 Test endpoint: http://localhost:${PORT}/api/test`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    console.log('💡 Make sure MongoDB is running or check your MONGODB_URI');
  });