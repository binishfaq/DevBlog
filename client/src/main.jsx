import React from "react";
import ReactDOM from "react-dom/client";

  console.log('🔍 API URL:', import.meta.env.VITE_API_URL);

import "./index.css";

import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </React.StrictMode>
);