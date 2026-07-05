import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Calendar, User, Clock, Heart, Eye, Share2, MessageCircle, 
  ArrowLeft, ThumbsUp, Send, Loader2, Trash2 
} from "lucide-react";
import Container from "../components/layout/Container";
import api from "../api/axios";

const BlogDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [deletingComment, setDeletingComment] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get current user
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      
      // Try by slug first
      try {
        const response = await api.get(`/posts/slug/${id}`);
        setPost(response.data.post);
        setComments(response.data.post.comments || []);
        setLikeCount(response.data.post.likes || 0);
        setLoading(false);
        return;
      } catch (slugError) {
        console.log("Not found by slug, trying by ID...");
      }

      // Try by ID
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data.post);
        setComments(response.data.post.comments || []);
        setLikeCount(response.data.post.likes || 0);
      } catch (idError) {
        console.error("Post not found:", idError);
        setPost(null);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      setPost(null);
    } finally {
      setLoading(false);
    }
  };

 // ===== LIKE HANDLER =====
const handleLike = async () => {
  if (!post) return;
  
  if (!user) {
    alert("Please login to like posts");
    return;
  }

  try {
    // ✅ Updated endpoint
    const response = await api.post(`/likes/${post._id}/toggle`);
    setLiked(response.data.liked);
    setLikeCount(response.data.likes);
  } catch (error) {
    console.error("Error liking post:", error);
    if (error.response?.status === 401) {
      alert("Please login to like posts");
    }
  }
};

// ===== COMMENT HANDLER =====
const handleComment = async (e) => {
  e.preventDefault();
  if (!comment.trim() || !post) return;

  if (!user) {
    alert("Please login to comment");
    return;
  }

  try {
    setSubmitting(true);
    // ✅ Updated endpoint
    const response = await api.post(`/comments/${post._id}`, { text: comment });
    setComments(response.data.comments);
    setComment("");
  } catch (error) {
    console.error("Error adding comment:", error);
    if (error.response?.status === 401) {
      alert("Please login to comment");
    } else {
      alert("Failed to add comment");
    }
  } finally {
    setSubmitting(false);
  }
};

// ===== DELETE COMMENT =====
const handleDeleteComment = async (commentId) => {
  if (!window.confirm("Delete this comment?")) return;
  
  try {
    setDeletingComment(commentId);
    // ✅ Updated endpoint
    await api.delete(`/comments/${commentId}`);
    setComments(comments.filter(c => c._id !== commentId));
  } catch (error) {
    console.error("Error deleting comment:", error);
    alert("Failed to delete comment");
  } finally {
    setDeletingComment(null);
  }
};

  // ===== SHARE HANDLER =====
  const handleShare = () => {
    if (!post) return;
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Helper functions
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getReadTime = (content) => {
    if (!content) return "1 min read";
    const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length || 0;
    const minutes = Math.ceil(wordCount / 200);
    return minutes < 1 ? "1 min read" : `${minutes} min read`;
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-slate-50 py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2 mb-8"></div>
              <div className="h-96 bg-slate-200 rounded mb-8"></div>
              <div className="space-y-3">
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="min-h-screen bg-slate-50 py-12">
        <Container>
          <div className="max-w-4xl mx-auto text-center py-16 bg-white rounded-2xl shadow-sm">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-slate-800">Post not found</h2>
            <p className="text-slate-500 mt-2">The blog post you're looking for doesn't exist.</p>
            <Link to="/blogs" className="inline-block mt-6 text-blue-600 hover:underline font-medium">
              ← Back to Blogs
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition mb-6"
          >
            <ArrowLeft size={18} />
            Back to Blogs
          </Link>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="rounded-2xl overflow-hidden mb-8 shadow-lg">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-[400px] object-cover"
              />
            </div>
          )}

          {/* Category Badge */}
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              {post.category}
            </span>
            <span className="text-sm text-slate-400">•</span>
            <span className="text-sm text-slate-500 flex items-center gap-1">
              <Clock size={14} />
              {getReadTime(post.content)}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {post.title}
          </h1>

          {/* Author & Meta */}
          <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-slate-200 mb-8">
            <div className="flex items-center gap-3">
              {post.author?.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={post.author.fullName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  {getInitials(post.author?.username || post.author?.fullName)}
                </div>
              )}
              <div>
                <p className="font-medium text-slate-800">
                  {post.author?.fullName || post.author?.username || "Anonymous"}
                </p>
                <p className="text-sm text-slate-500 flex items-center gap-1">
                  <Calendar size={14} />
                  {formatDate(post.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              {/* Like Button */}
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
                  liked 
                    ? "bg-red-50 text-red-600" 
                    : "bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600"
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? "fill-red-600" : ""}`} />
                <span className="font-semibold">{likeCount}</span>
              </button>
              
              {/* Share Button */}
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-full hover:bg-blue-50 hover:text-blue-600 transition"
              >
                <Share2 size={18} />
                Share
              </button>
              
              {/* Views */}
              <div className="flex items-center gap-1 text-sm text-slate-500">
                <Eye size={16} />
                {post.views || 0} views
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-slate-800 prose-p:text-slate-600 prose-a:text-blue-600 prose-strong:text-slate-800 prose-code:text-blue-600 prose-pre:bg-slate-800 prose-pre:text-slate-200"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-slate-200">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Comments Section */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <MessageCircle size={24} />
              Comments ({comments.length})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleComment} className="mb-8">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={user ? "Write a comment..." : "Please login to comment"}
                  disabled={!user}
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled={!user || !comment.trim() || submitting}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  Post
                </button>
              </div>
              {!user && (
                <p className="text-sm text-slate-500 mt-2">
                  <Link to="/login" className="text-blue-600 hover:underline">Login</Link> to comment
                </p>
              )}
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-slate-500 text-center py-8">No comments yet. Be the first!</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment._id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                    <div className="flex items-start gap-3">
                      {comment.user?.avatar ? (
                        <img
                          src={comment.user.avatar}
                          alt={comment.user.fullName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                          {getInitials(comment.user?.username || comment.user?.fullName)}
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-slate-800">
                              {comment.user?.fullName || comment.user?.username || "Anonymous"}
                            </p>
                            <span className="text-xs text-slate-400">
                              {formatDate(comment.createdAt)}
                            </span>
                          </div>
                          {(user?._id === comment.user?._id || user?._id === post.author?._id) && (
                            <button
                              onClick={() => handleDeleteComment(comment._id)}
                              disabled={deletingComment === comment._id}
                              className="text-slate-400 hover:text-red-600 transition disabled:opacity-50"
                            >
                              {deletingComment === comment._id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          )}
                        </div>
                        <p className="text-slate-600 mt-1">{comment.text}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BlogDetails;