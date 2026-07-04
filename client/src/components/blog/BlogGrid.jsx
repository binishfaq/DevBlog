import BlogCard from "./BlogCard";

const BlogGrid = ({ blogs, viewMode }) => {
  if (blogs.length === 0) {
    return (
      <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50">
        <div className="text-7xl mb-4">📚</div>
        <h3 className="text-2xl font-semibold text-slate-800">No articles found</h3>
        <p className="text-slate-500 mt-2 max-w-sm mx-auto">
          Check back later for new content
        </p>
      </div>
    );
  }

  return (
    <div className={`grid ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-1"} gap-6`}>
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogGrid;