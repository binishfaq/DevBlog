import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/auth.service";
import { Mail, Lock, User, Eye, EyeOff, UserPlus } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

 const [formData, setFormData] = useState({
  fullName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    setLoading(true);

    const data = await registerUser({
      fullName: formData.fullName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });

    alert(data.message);

    navigate("/login");

  }catch (error) {
  console.log(error);
  console.log(error.response);
  console.log(error.response?.data);

  alert(error.response?.data?.message || "Registration failed");
}finally {
    setLoading(false);
  }
};

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      
      {/* Left Side - Brand */}
      <div className="w-5/12 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Background container with 350x350 */}
        <div className="w-[350px] h-[350px] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white flex flex-col justify-center p-6 relative overflow-hidden rounded-tl-2xl rounded-br-2xl shadow-2xl">
          {/* Decorative */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
          
          {/* Decorative dots pattern */}
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
            {/* Welcome Badge */}
            <div className="mb-3 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10">
              <span className="text-[10px] font-medium text-blue-100">Join us!</span>
            </div>

            {/* Logo */}
            <div className="mb-2">
              <span className="text-2xl font-black bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent tracking-tight">
                DevBlog
              </span>
            </div>

            {/* Tagline */}
            <h2 className="text-2xl font-bold leading-snug">
              Start Your
              <br />
              <span className="text-blue-200">Learning Journey</span>
            </h2>

            <p className="text-sm text-blue-100 leading-5 mt-2 max-w-[200px]">
              Join a community of passionate developers and grow your skills.
            </p>
            
            {/* Decorative line */}
            <div className="mt-3 w-12 h-0.5 bg-gradient-to-r from-blue-300 to-transparent rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-7/12 flex flex-col justify-center p-8 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-blue-300/5 rounded-full blur-2xl"></div>

        <div className="max-w-sm mx-auto w-full relative z-10 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-xl">
          {/* Header */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Create Account
              </h2>
              <span className="text-xl">🚀</span>
            </div>
            <p className="text-slate-500 text-xs mt-1">
              Join DevBlog and start learning today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Full Name */}
<div>
  <label className="text-[10px] font-semibold text-slate-700 block mb-1">
    Full Name
  </label>

  <div className="relative flex items-center border border-gray-200 bg-white/80 backdrop-blur-sm rounded-lg px-3 focus-within:border-blue-500 focus-within:shadow-lg focus-within:shadow-blue-500/10 transition-all duration-300">
    <User size={14} className="text-gray-400 flex-shrink-0" />

    <input
      type="text"
      name="fullName"
      value={formData.fullName}
      placeholder="Zain Bin Ishfaq"
      className="w-full py-2 px-2 outline-none bg-transparent text-xs placeholder:text-gray-400"
      onChange={handleChange}
      required
    />
  </div>
</div>
            {/* Username */}
            <div>
              <label className="text-[10px] font-semibold text-slate-700 block mb-1">
                Username
              </label>
              <div className="relative flex items-center border border-gray-200 bg-white/80 backdrop-blur-sm rounded-lg px-3 focus-within:border-blue-500 focus-within:shadow-lg focus-within:shadow-blue-500/10 transition-all duration-300">
                <User size={14} className="text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  placeholder="johndoe"
                  className="w-full py-2 px-2 outline-none bg-transparent text-xs placeholder:text-gray-400"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-[10px] font-semibold text-slate-700 block mb-1">
                Email Address
              </label>
              <div className="relative flex items-center border border-gray-200 bg-white/80 backdrop-blur-sm rounded-lg px-3 focus-within:border-blue-500 focus-within:shadow-lg focus-within:shadow-blue-500/10 transition-all duration-300">
                <Mail size={14} className="text-gray-400 flex-shrink-0" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="you@example.com"
                  className="w-full py-2 px-2 outline-none bg-transparent text-xs placeholder:text-gray-400"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-[10px] font-semibold text-slate-700 block mb-1">
                Password
              </label>
              <div className="relative flex items-center border border-gray-200 bg-white/80 backdrop-blur-sm rounded-lg px-3 focus-within:border-blue-500 focus-within:shadow-lg focus-within:shadow-blue-500/10 transition-all duration-300">
                <Lock size={14} className="text-gray-400 flex-shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  placeholder="••••••••"
                  className="w-full py-2 px-2 outline-none bg-transparent text-xs placeholder:text-gray-400"
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-blue-600 transition-colors flex-shrink-0"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-[10px] font-semibold text-slate-700 block mb-1">
                Confirm Password
              </label>
              <div className="relative flex items-center border border-gray-200 bg-white/80 backdrop-blur-sm rounded-lg px-3 focus-within:border-blue-500 focus-within:shadow-lg focus-within:shadow-blue-500/10 transition-all duration-300">
                <Lock size={14} className="text-gray-400 flex-shrink-0" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  placeholder="••••••••"
                  className="w-full py-2 px-2 outline-none bg-transparent text-xs placeholder:text-gray-400"
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-400 hover:text-blue-600 transition-colors flex-shrink-0"
                >
                  {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 text-white font-semibold py-2.5 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="relative flex items-center justify-center gap-2 text-xs">
                {loading ? (
                  "Creating Account..."
                ) : (
                  <>
                    Create Account
                    <UserPlus size={14} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <span className="mx-3 text-[9px] font-medium text-gray-400 uppercase tracking-wider">
              Or continue with
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button className="group relative flex items-center justify-center gap-2 border border-gray-200 bg-white/50 backdrop-blur-sm rounded-lg py-2 hover:border-blue-400 hover:bg-blue-50/50 hover:shadow-md transition-all duration-300">
              <FcGoogle size={16} />
              <span className="text-[10px] font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
                Google
              </span>
            </button>

            <button className="group relative flex items-center justify-center gap-2 border border-gray-200 bg-white/50 backdrop-blur-sm rounded-lg py-2 hover:border-blue-400 hover:bg-blue-50/50 hover:shadow-md transition-all duration-300">
              <FaGithub size={16} className="text-slate-800" />
              <span className="text-[10px] font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
                GitHub
              </span>
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-4 text-center">
            <p className="text-[10px] text-slate-500">
              Already have an account?
              <Link
                to="/login"
                className="ml-1.5 text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-all duration-300"
              >
                Sign in →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;