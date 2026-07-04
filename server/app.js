import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
dotenv.config();
const app = express();
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const allowedOrigin = process.env.CLIENT_URL || "http://localhost:3000";
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DevBlog API Running",
  });
});

export default app;