import { useState, useEffect } from "react";
import { Sparkles, TrendingUp } from "lucide-react";
import Container from "../components/layout/Container";
import BlogFilters from "../components/blog/BlogFilters";
import BlogGrid from "../components/blog/BlogGrid";
import BlogSkeleton from "../components/blog/BlogSkeleton";
import BlogPagination from "../components/blog/BlogPagination";
import { getPosts, getCategories } from "../services/post.service";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("latest");
  const [viewMode, setViewMode] = useState("grid");

  const postsPerPage = 6;

  useEffect(() => {
    fetchCategories();
    fetchBlogs();
  }, [currentPage, selectedCategory, sortBy]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data || []);
    } catch (error) {
    }
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
    
      const allPosts = await getPosts();

      let filteredPosts = allPosts;
      if (selectedCategory !== "all") {
        filteredPosts = filteredPosts.filter(
          post => post.category === selectedCategory
        );
      }
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredPosts = filteredPosts.filter(
          post => 
            post.title?.toLowerCase().includes(term) ||
            post.content?.toLowerCase().includes(term) ||
            post.category?.toLowerCase().includes(term)
        );
      }
      
      if (sortBy === "latest") {
        filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (sortBy === "oldest") {
        filteredPosts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (sortBy === "popular") {
        filteredPosts.sort((a, b) => (b.views || 0) - (a.views || 0));
      } else if (sortBy === "trending") {
        filteredPosts.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
      }
 
      const startIndex = (currentPage - 1) * postsPerPage;
      const endIndex = startIndex + postsPerPage;
      const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
 
      const total = Math.ceil(filteredPosts.length / postsPerPage);
      
      const formattedPosts = paginatedPosts.map(post => ({
        ...post,
        author: {
          ...post.author,
          avatar: post.author?.avatar || null,
          bio: post.author?.bio || null,
          fullName: post.author?.fullName || post.author?.username || "Anonymous",
        }
      }));
      
      
      setBlogs(formattedPosts);
      setTotalPages(total || 1);
    } catch (error) {
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBlogs();
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    if (window.innerWidth < 768) {
      setShowFilters(false);
    }
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSearchTerm("");
    setSortBy("latest");
    setCurrentPage(1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        fetchBlogs();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50/80 backdrop-blur-sm border border-blue-100/50 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-600">Latest Articles</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            All <span className="text-blue-600">Blogs</span>
          </h1>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            Explore our collection of articles on web development, programming, and technology.
          </p>
        </div>

        {/* Filters */}
        <BlogFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
          viewMode={viewMode}
          setViewMode={setViewMode}
          selectedCategory={selectedCategory}
          categories={categories}
          handleCategoryChange={handleCategoryChange}
          sortBy={sortBy}
          setSortBy={setSortBy}
          clearFilters={clearFilters}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />

        {/* Results Count */}
        {!loading && blogs.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-slate-500">
              Showing <span className="font-medium text-slate-700">{blogs.length}</span> articles
            </p>
            <div className="flex items-center gap-1 text-sm text-slate-400">
              <TrendingUp className="w-4 h-4" />
              <span>Trending topics</span>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        {loading ? (
          <BlogSkeleton count={6} />
        ) : (
          <BlogGrid blogs={blogs} viewMode={viewMode} />
        )}

        {/* Pagination */}
        {!loading && blogs.length > 0 && (
          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </Container>
    </section>
  );
};

export default Blogs;