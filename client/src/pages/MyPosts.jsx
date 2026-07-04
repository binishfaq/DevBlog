import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyPosts, deletePost } from "../services/post.service";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import { Link } from "react-router-dom";
import { Edit, Trash2, Eye, Calendar, Tag, Clock, Plus, FileText, Loader2 } from "lucide-react";

const MyPosts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await getMyPosts();
      // Handle both array and object responses
      setPosts(Array.isArray(data) ? data : data.posts || []);
    } catch (error) {
      console.error("Error loading posts:", error);
      // Show error message to user
      alert("Failed to load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    return status === "published" 
      ? "bg-emerald-100 text-emerald-700 border-emerald-200" 
      : "bg-amber-100 text-amber-700 border-amber-200";
  };

  const getStatusDot = (status) => {
    return status === "published" 
      ? "bg-emerald-500" 
      : "bg-amber-500";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Invalid Date";
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this post?");
    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      await deletePost(id);
      // Refresh posts list
      await loadPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/posts/edit/${id}`);
  };

  // Check if posts is an array
  const postsArray = Array.isArray(posts) ? posts : [];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                My Posts
              </h1>
              <p className="text-slate-500 mt-1 text-sm">
                Manage all your blog posts in one place
              </p>
            </div>
            <Link
              to="/dashboard/posts/new"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              Create New Post
            </Link>
          </div>

          {/* Stats Summary */}
          {!loading && postsArray.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <p className="text-xs text-slate-500 font-medium">Total Posts</p>
                <p className="text-2xl font-bold text-slate-800">{postsArray.length}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <p className="text-xs text-slate-500 font-medium">Published</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {postsArray.filter(p => p.status === "published").length}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <p className="text-xs text-slate-500 font-medium">Drafts</p>
                <p className="text-2xl font-bold text-amber-600">
                  {postsArray.filter(p => p.status === "draft").length}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <p className="text-xs text-slate-500 font-medium">Total Views</p>
                <p className="text-2xl font-bold text-blue-600">
                  {postsArray.reduce((acc, p) => acc + (p.views || 0), 0)}
                </p>
              </div>
            </div>
          )}

          {/* Posts Grid */}
          <div className="grid gap-5">
            {loading ? (
              // Loading Skeletons
              [...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 animate-pulse">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3 flex-1">
                      <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                      <div className="flex items-center gap-3">
                        <div className="h-6 bg-slate-200 rounded-full w-20"></div>
                        <div className="h-4 bg-slate-200 rounded w-24"></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-9 bg-slate-200 rounded-lg w-16"></div>
                      <div className="h-9 bg-slate-200 rounded-lg w-16"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : postsArray.length === 0 ? (
              // Empty State
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-100 p-12 md:p-16 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-2xl mb-4">
                  <FileText className="w-10 h-10 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">No Posts Yet</h2>
                <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                  Start your blogging journey by creating your first post.
                </p>
                <Link
                  to="/dashboard/posts/new"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Plus className="w-4 h-4" />
                  Create Your First Post
                </Link>
              </div>
            ) : (
              // Posts List
              postsArray.map((post) => (
                <div
                  key={post._id || post.id}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      {/* Left Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(post.createdAt)}
                          </span>
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(post.status)}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(post.status)}`}></span>
                            {post.status?.charAt(0).toUpperCase() + post.status?.slice(1) || "Unknown"}
                          </span>
                          {post.category && (
                            <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                              <Tag className="w-3 h-3" />
                              {post.category}
                            </span>
                          )}
                          {post.tags && post.tags.length > 0 && (
                            <span className="flex items-center gap-1 text-xs text-slate-400">
                              <span className="hidden sm:inline">•</span>
                              {post.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="text-slate-400">#{tag}</span>
                              ))}
                              {post.tags.length > 2 && (
                                <span className="text-slate-400">+{post.tags.length - 2}</span>
                              )}
                            </span>
                          )}
                        </div>

                        <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors mt-2 line-clamp-1">
                          {post.title || "Untitled"}
                        </h2>

                        <p className="text-slate-500 text-sm mt-1 line-clamp-2 max-w-2xl">
                          {post.content?.replace(/<[^>]*>/g, "").substring(0, 150) || "No content..."}
                        </p>

                        <div className="flex items-center gap-4 mt-3 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {post.views || 0} views
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {Math.ceil((post.content?.replace(/<[^>]*>/g, "").split(/\s+/).length || 0) / 200)} min read
                          </span>
                        </div>
                      </div>

                      {/* Right Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleEdit(post._id || post.id)}
                          className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(post._id || post.id)}
                          disabled={deletingId === (post._id || post.id)}
                          className="p-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === (post._id || post.id) ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                        {post.status === "published" && (
                          <Link
                            to={`/blogs/${post.slug || post._id || post.id}`}
                            target="_blank"
                            className="p-2.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200"
                            title="View Post"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Progress/Status Bar */}
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span>Last updated: {formatDate(post.updatedAt)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium ${post.status === "published" ? "text-emerald-600" : "text-amber-600"}`}>
                          {post.status === "published" ? "✓ Published" : "⏳ Draft"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPosts;