import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">

      <img
        src={blog.image}
        alt={blog.title}
        className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="p-6">

        <span className="inline-block rounded-full bg-blue-100 text-blue-600 px-3 py-1 text-xs font-semibold">
          {blog.category}
        </span>

        <h3 className="mt-4 text-xl font-bold text-slate-900 line-clamp-2">
          {blog.title}
        </h3>

        <p className="mt-3 text-slate-600 line-clamp-3">
          {blog.description}
        </p>

        <div className="mt-6 flex items-center justify-between">

          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Clock size={16} />
            {blog.readTime}
          </div>

          <Link
            to={`/blogs/${blog.slug}`}
            className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
          >
            Read More
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>

    </div>
  );
};

export default BlogCard;