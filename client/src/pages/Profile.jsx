import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  User, Mail, Pen, Save, Camera, Calendar, FileText, Heart, Eye, 
  ArrowLeft, Edit3, BookOpen, X, Loader2
} from "lucide-react";
import Container from "../components/layout/Container";
import { getMyPosts } from "../services/post.service";
import api from "../api/axios";

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    bio: "",
    avatar: "",
  });
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");
      
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // ✅ Get user profile
      const userRes = await api.get("/auth/me");
      const userData = userRes.data;
      setUser(userData);
      setFormData({
        fullName: userData.fullName || "",
        username: userData.username || "",
        email: userData.email || "",
        bio: userData.bio || "",
        avatar: userData.avatar || "",
      });

      // ✅ Get user posts
      try {
        const postsData = await getMyPosts();
        setPosts(postsData || []);
      } catch (postError) {
        console.error("Error fetching posts:", postError);
        setPosts([]);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError(error.response?.data?.message || "Failed to load profile");
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("Image size should be less than 2MB");
      return;
    }

    try {
      setUploading(true);
      setError("");
      
      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64String = reader.result;
          
          // ✅ Update avatar using the update endpoint
          const response = await api.put("/auth/update", { 
            avatar: base64String 
          });
          
          const updatedUser = response.data;
          setUser(updatedUser);
          setFormData({ ...formData, avatar: updatedUser.avatar });
          
          // Update localStorage
          const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
          localStorage.setItem("user", JSON.stringify({
            ...storedUser,
            avatar: updatedUser.avatar
          }));

          alert("Avatar updated successfully!");
        } catch (error) {
          console.error("Error uploading avatar:", error);
          setError(error.response?.data?.message || "Failed to upload avatar");
        } finally {
          setUploading(false);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error reading file:", error);
      setError("Failed to read image file");
      setUploading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      setError("");
      
      const response = await api.put("/auth/update", formData);
      const updatedUser = response.data;
      
      setUser(updatedUser);
      setEditing(false);
      
      // Update localStorage
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem("user", JSON.stringify({
        ...storedUser,
        ...updatedUser
      }));
      
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.response?.data?.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return "N/A";
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  const getLikesCount = (post) => {
    if (Array.isArray(post.likes)) return post.likes.length;
    return post.likes || 0;
  };

  const getCommentsCount = (post) => {
    if (Array.isArray(post.comments)) return post.comments.length;
    return post.comments || 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-slate-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  const publishedPosts = posts.filter(p => p.status === "published" || p.status === "Published");

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition mb-6"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl">
              {error}
              <button 
                onClick={() => setError("")}
                className="ml-4 text-red-400 hover:text-red-600"
              >
                <X className="w-4 h-4 inline" />
              </button>
            </div>
          )}

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Top Section with Avatar and Info */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Avatar - Left Side with Upload */}
                <div className="relative flex-shrink-0 group">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg overflow-hidden">
                    {formData.avatar ? (
                      <img 
                        src={formData.avatar} 
                        alt="Avatar" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getInitials(user?.fullName || user?.username)
                    )}
                  </div>
                  
                  {/* Upload Button Overlay */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-md hover:shadow-lg disabled:opacity-50"
                  >
                    {uploading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                  </button>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>

                {/* Info - Right Side */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                      {user?.fullName || user?.username}
                    </h1>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      {user?.role || "Member"}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      @{user?.username}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {user?.email}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Calendar className="w-3 h-3" />
                      Joined {formatDate(user?.createdAt)}
                    </span>
                  </div>

                  {user?.bio && (
                    <p className="text-slate-600 text-sm mt-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      {user.bio}
                    </p>
                  )}

                  <button
                    onClick={() => setEditing(!editing)}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition shadow-md hover:shadow-lg"
                  >
                    <Edit3 className="w-4 h-4" />
                    {editing ? "Cancel" : "Edit Profile"}
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
                <div>
                  <p className="text-2xl font-bold text-slate-800">{posts.length}</p>
                  <p className="text-xs text-slate-500">Total Posts</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">
                    {posts.reduce((acc, p) => acc + getLikesCount(p), 0)}
                  </p>
                  <p className="text-xs text-slate-500">Likes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">
                    {posts.reduce((acc, p) => acc + (p.views || 0), 0)}
                  </p>
                  <p className="text-xs text-slate-500">Views</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">
                    {publishedPosts.length}
                  </p>
                  <p className="text-xs text-slate-500">Published</p>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          {editing && (
            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Edit Profile</h2>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={updating}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition disabled:opacity-50 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {updating ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="px-6 py-2.5 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Published Posts */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              My Posts ({publishedPosts.length})
            </h2>

            {publishedPosts.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
                <p className="text-slate-500">No published posts yet.</p>
                <Link
                  to="/dashboard/posts/new"
                  className="inline-block mt-4 text-blue-600 font-medium hover:underline"
                >
                  Write your first post →
                </Link>
              </div>
            ) : (
              <div className="grid gap-3">
                {publishedPosts.map((post) => (
                  <div
                    key={post._id}
                    className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800 hover:text-blue-600 transition">
                          <Link to={`/blogs/${post.slug || post._id}`}>
                            {post.title}
                          </Link>
                        </h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                          <span className="text-xs">{post.category || "General"}</span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4 text-red-400" />
                            {getLikesCount(post)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4 text-blue-400" />
                            {post.views || 0}
                          </span>
                        </div>
                      </div>
                      <Link
                        to={`/dashboard/posts/edit/${post._id}`}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Edit →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Profile;