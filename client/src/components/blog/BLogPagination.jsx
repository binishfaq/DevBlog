import { ChevronLeft, ChevronRight } from "lucide-react";

const BlogPagination = ({ currentPage, totalPages, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-3 mt-12">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="p-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition bg-white/80 backdrop-blur-sm"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex gap-1.5">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-10 h-10 rounded-xl text-sm font-medium transition ${
              currentPage === i + 1
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                : "bg-white/80 backdrop-blur-sm text-slate-600 hover:bg-slate-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="p-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition bg-white/80 backdrop-blur-sm"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default BlogPagination;