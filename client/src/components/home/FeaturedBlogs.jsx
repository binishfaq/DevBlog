import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User, Clock, Eye, Heart } from "lucide-react";

const FeaturedBlogs = ({ blogs = [], loading = false }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getReadTime = (content) => {
    if (!content) return "1 min read";
    const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length || 0;
    const minutes = Math.ceil(wordCount / 200);
    return minutes < 1 ? "1 min read" : `${minutes} min read`;
  };

  if (loading) {
    return (
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-slate-200 rounded mx-auto animate-pulse"></div>
            <div className="h-6 w-64 bg-slate-200 rounded mx-auto mt-2 animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                <div className="h-48 bg-slate-200"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                  <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
            Featured Articles
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
            Latest Articles & Tutorials
          </h2>
          <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
            Explore practical tutorials, real-world MERN projects, DevOps guides, and modern web development tips.
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
            <p className="text-slate-500">No articles published yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <Link
                key={blog._id}
                to={`/blogs/${blog.slug || blog._id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 hover:-translate-y-1"
              >
                {blog.featuredImage && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      {blog.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-2 line-clamp-2">
                    {blog.content?.replace(/<[^>]*>/g, "").substring(0, 120)}...
                  </p>
                  <div className="flex items-center gap-3 mt-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {blog.author?.username || "Anonymous"}
                    </span>
                    <span>•</span>
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {getReadTime(blog.content)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-red-400" />
                      {blog.likes || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-blue-400" />
                      {blog.views || 0}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
          >
            View All Blogs
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;