import { Search, Grid3x3, List, X } from "lucide-react";

const BlogFilters = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
  viewMode,
  setViewMode,
  selectedCategory,
  categories,
  handleCategoryChange,
  sortBy,
  setSortBy,
  clearFilters,
  showFilters,
  setShowFilters,
}) => {
  const getCategoryName = (cat) => {
    if (typeof cat === 'string') return cat;
    if (cat && typeof cat === 'object') return cat.name || cat._id || '';
    return '';
  };

  const validCategories = categories
    .map(getCategoryName)
    .filter(name => name && name.trim() !== '');

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-4 md:p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:bg-white transition"
          />
        </form>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition ${
              viewMode === "grid" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Grid3x3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition ${
              viewMode === "list" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <List className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-slate-100 rounded-xl hover:bg-slate-200 transition"
          >
            Filters
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className={`${showFilters ? "flex" : "hidden md:flex"} flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-100`}>
        <button
          onClick={() => handleCategoryChange("all")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
            selectedCategory === "all"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          All
        </button>
        {validCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {category}
          </button>
        ))}
        
        <div className="ml-auto flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-1.5 bg-slate-100 border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          >
            <option value="latest">Latest</option>
            <option value="popular">Most Popular</option>
            <option value="trending">Trending</option>
            <option value="oldest">Oldest</option>
          </select>

          {(selectedCategory !== "all" || searchTerm || sortBy !== "latest") && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 transition"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogFilters;