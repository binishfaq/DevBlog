import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useState, useEffect } from "react";
import { loginUser } from "../services/auth.service";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ✅ Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // ===== EMAIL LOGIN =====
// Update the handleLogin function in Login.jsx
const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const data = await loginUser({
      email,
      password,
    });

    console.log("📝 Login response:", data);

    if (data.token) {
      // ✅ Save token
      localStorage.setItem("token", data.token);
      
      // ✅ Save user data with consistent structure
      const userData = {
        id: data._id || data.id,
        _id: data._id,
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        avatar: data.avatar,
        bio: data.bio,
        role: data.role,
        isVerified: data.isVerified
      };
      
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("✅ User data saved:", userData);
      
      navigate("/dashboard");
    } else {
      setError("Invalid response from server");
    }
  } catch (error) {
    console.error("❌ Login error:", error);
    setError(error.response?.data?.message || "Login Failed. Please check your credentials.");
  } finally {
    setLoading(false);
  }
};
  // ===== GOOGLE LOGIN =====
  const handleGoogleLogin = () => {
    window.location.href = "https://devblog-backend-nu.vercel.app/api/auth/google";
  };

  // ===== GITHUB LOGIN =====
  const handleGithubLogin = () => {
    window.location.href = "https://devblog-backend-nu.vercel.app/api/auth/github";
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      
      {/* Left Side - Brand */}
      <div className="w-5/12 flex items-center justify-center p-8 relative overflow-hidden">
        <div className="w-[350px] h-[350px] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white flex flex-col justify-center p-6 relative overflow-hidden rounded-tl-2xl rounded-br-2xl shadow-2xl">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
          
          <div className="absolute top-4 right-4 flex gap-1">
            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
          </div>
          <div className="absolute bottom-4 left-4 flex gap-1">
            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
          </div>
          
          <div className="relative z-10 flex flex-col justify-center items-start text-left w-full h-full">
            <div className="mb-3 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10">
              <span className="text-[10px] font-medium text-blue-100">Welcome back!</span>
            </div>

            <div className="mb-2">
              <span className="text-2xl font-black bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent tracking-tight">
                DevBlog
              </span>
            </div>

            <h2 className="text-2xl font-bold leading-snug">
              Your Journey
              <br />
              <span className="text-blue-200">Starts Here</span>
            </h2>

            <p className="text-sm text-blue-100 leading-5 mt-2 max-w-[200px]">
              Learn, grow, and connect with a community of passionate developers.
            </p>
            
            <div className="mt-3 w-12 h-0.5 bg-gradient-to-r from-blue-300 to-transparent rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-7/12 flex flex-col justify-center p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-blue-300/5 rounded-full blur-2xl"></div>

        <div className="max-w-sm mx-auto w-full relative z-10 bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-xl">
          {/* Header */}
          <div className="mb-7">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Sign in to access your learning dashboard
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Email Address
              </label>
              <div className="relative flex items-center border border-gray-200 bg-white/80 backdrop-blur-sm rounded-xl px-4 focus-within:border-blue-500 focus-within:shadow-lg focus-within:shadow-blue-500/10 transition-all duration-300">
                <Mail size={16} className="text-gray-400 flex-shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full py-3 px-3 outline-none bg-transparent text-sm placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Password
                </label>
                <button className="text-[10px] text-blue-600 hover:text-blue-700 font-medium hover:underline transition">
                  Forgot?
                </button>
              </div>
              <div className="relative flex items-center border border-gray-200 bg-white/80 backdrop-blur-sm rounded-xl px-4 focus-within:border-blue-500 focus-within:shadow-lg focus-within:shadow-blue-500/10 transition-all duration-300">
                <Lock size={16} className="text-gray-400 flex-shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full py-3 px-3 outline-none bg-transparent text-sm placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-blue-600 transition-colors flex-shrink-0"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-blue-600 rounded border-gray-300 cursor-pointer"
                />
                <span className="group-hover:text-slate-800 transition-colors">Keep me signed in</span>
              </label>
            </div>

            {/* Login Button */}
            <button 
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 text-white font-semibold py-3.5 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5 disabled:opacity-70" 
              type="submit"
              disabled={loading}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="relative flex items-center justify-center gap-2 text-sm">
                {loading ? "Signing in..." : "Sign In"}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <span className="mx-4 text-[10px] font-medium text-gray-400 uppercase tracking-wider">
              Or continue with
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleGoogleLogin}
              className="group relative flex items-center justify-center gap-3 border border-gray-200 bg-white/50 backdrop-blur-sm rounded-xl py-3 hover:border-blue-400 hover:bg-blue-50/50 hover:shadow-md transition-all duration-300"
            >
              <FcGoogle size={20} />
              <span className="text-xs font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
                Google
              </span>
            </button>

            <button
              onClick={handleGithubLogin}
              className="group relative flex items-center justify-center gap-3 border border-gray-200 bg-white/50 backdrop-blur-sm rounded-xl py-3 hover:border-blue-400 hover:bg-blue-50/50 hover:shadow-md transition-all duration-300"
            >
              <FaGithub size={20} className="text-slate-800" />
              <span className="text-xs font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
                GitHub
              </span>
            </button>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              New to DevBlog?
              <Link
                to="/register"
                className="ml-2 text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-all duration-300"
              >
                Register →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;