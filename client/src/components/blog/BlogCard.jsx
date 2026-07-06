import { Link } from "react-router-dom";
import { Calendar, Clock, Heart, Eye, MessageCircle, ArrowRight, User, Mail, Award, FileText } from "lucide-react";

const BlogCard = ({ blog }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "N/A";
    }
  };

  const getReadTime = (content) => {
    if (!content) return "1 min read";
    try {
      const text = content.replace(/<[^>]*>/g, "").trim();
      const wordCount = text ? text.split(/\s+/).length : 0;
      const minutes = Math.ceil(wordCount / 200);
      return minutes < 1 ? "1 min read" : `${minutes} min read`;
    } catch (error) {
      return "1 min read";
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  const getCategoryColor = (category) => {
    const colors = {
      "MERN Stack": "bg-blue-100 text-blue-700",
      React: "bg-cyan-100 text-cyan-700",
      "Node.js": "bg-green-100 text-green-700",
      JavaScript: "bg-yellow-100 text-yellow-700",
      TypeScript: "bg-indigo-100 text-indigo-700",
      DevOps: "bg-purple-100 text-purple-700",
      Database: "bg-red-100 text-red-700",
      "UI/UX": "bg-pink-100 text-pink-700",
      Career: "bg-orange-100 text-orange-700",
      Technology: "bg-teal-100 text-teal-700",
      General: "bg-gray-100 text-gray-700",
      Other: "bg-gray-100 text-gray-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  // ✅ Get the image URL (fallback to placeholder)
  const getImageUrl = () => {
    return blog.image || blog.featuredImage || null;
  };

  // ✅ Get author name - checks multiple possible locations
  const getAuthorName = () => {
    // Check createdBy (populated from backend)
    if (blog.createdBy && typeof blog.createdBy === 'object') {
      if (blog.createdBy.fullName) return blog.createdBy.fullName;
      if (blog.createdBy.username) return blog.createdBy.username;
    }
    
    // Check author object
    if (blog.author && typeof blog.author === 'object') {
      if (blog.author.fullName) return blog.author.fullName;
      if (blog.author.username) return blog.author.username;
      if (blog.author.name) return blog.author.name;
    }
    
    // Check if author is a string
    if (typeof blog.author === 'string') return blog.author;
    
    return "User"; // Fallback
  };

  // ✅ Get author avatar
  const getAuthorAvatar = () => {
    if (blog.createdBy && typeof blog.createdBy === 'object') {
      return blog.createdBy.avatar || null;
    }
    if (blog.author && typeof blog.author === 'object') {
      return blog.author.avatar || null;
    }
    return null;
  };

  // ✅ Get author bio
  const getAuthorBio = () => {
    if (blog.createdBy && typeof blog.createdBy === 'object') {
      return blog.createdBy.bio || null;
    }
    if (blog.author && typeof blog.author === 'object') {
      return blog.author.bio || null;
    }
    return null;
  };

  // ✅ Get likes count (handles both array and number)
  const getLikesCount = () => {
    if (Array.isArray(blog.likes)) return blog.likes.length;
    return blog.likes || 0;
  };

  // ✅ Get comments count
  const getCommentsCount = () => {
    if (Array.isArray(blog.comments)) return blog.comments.length;
    return blog.comments || 0;
  };

  // ✅ Get category
  const getCategory = () => {
    return blog.category || "General";
  };

  const authorName = getAuthorName();
  const authorAvatar = getAuthorAvatar();
  const authorBio = getAuthorBio();
  const imageUrl = getImageUrl();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100/50 transition-all duration-300 hover:-translate-y-1">
      
      {/* ===== AUTHOR SECTION - TOP ===== */}
      <div className="px-5 pt-5 pb-3 border-b border-slate-100/50">
        <div className="flex items-start gap-3">
          {/* Author Avatar */}
          <div className="flex-shrink-0">
            {authorAvatar ? (
              <img
                src={authorAvatar}
                alt={authorName}
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-100 shadow-sm"
                onError={(e) => {
                  e.target.src = "";
                }}
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-base font-bold shadow-sm">
                {getInitials(authorName)}
              </div>
            )}
          </div>
          
          {/* Author Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center flex-wrap gap-1.5">
              <span className="text-sm font-semibold text-slate-800 truncate">
                {authorName}
              </span>
            </div>
            
            {authorBio && (
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {authorBio}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ===== FEATURED IMAGE ===== */}
      {imageUrl && (
        <div className="relative h-52 overflow-hidden bg-slate-100">
          <img
            src={imageUrl}
            alt={blog.title || "Blog post"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/800x400?text=No+Image";
            }}
          />
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(getCategory())}`}>
              {getCategory()}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs text-white/90 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
              <Clock className="w-3 h-3" />
              {getReadTime(blog.content)}
            </span>
          </div>
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs text-white/90 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
              <Heart className="w-3 h-3 text-red-400" />
              {getLikesCount()}
            </span>
            <span className="flex items-center gap-1 text-xs text-white/90 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
              <Eye className="w-3 h-3 text-blue-400" />
              {blog.views || 0}
            </span>
          </div>
        </div>
      )}

      {/* ===== CONTENT ===== */}
      <div className="p-5">
        {!imageUrl && (
          <span className={`inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(getCategory())}`}>
            {getCategory()}
          </span>
        )}

        <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
          <Link to={`/blogs/${blog.slug || blog._id}`}>
            {blog.title || "Untitled"}
          </Link>
        </h3>

        <p className="mt-2 text-slate-600 text-sm line-clamp-2">
          {blog.content?.replace(/<[^>]*>/g, "").substring(0, 150) || "No content available"}...
        </p>

        {/* ===== FOOTER ===== */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-400" /> {getLikesCount()}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4 text-blue-400" /> {getCommentsCount()}
            </span>
          </div>
          <Link
            to={`/blogs/${blog.slug || blog._id}`}
            className="text-blue-600 font-medium text-sm group-hover:translate-x-1 transition inline-flex items-center gap-1 hover:text-blue-700"
          >
            Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ===== TAGS ===== */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2 flex-wrap">
            {blog.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                #{tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className="text-xs text-slate-400">+{blog.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;