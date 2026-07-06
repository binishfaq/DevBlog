// src/pages/Home.jsx
import { useState, useEffect } from "react";
import Hero from "../components/home/Hero";
import FeaturedBlogs from "../components/home/FeaturedBlogs";
import Categories from "../components/home/Categories";
import WhyChoose from "../components/home/WhyChoose";
import NewsLetter from "../components/home/NewsLetter";
import { getPosts, getCategories } from "../services/post.service";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch both posts and categories
        const [postsData, categoriesData] = await Promise.all([
          getPosts(),
          getCategories().catch(() => []) // Don't fail if categories fail
        ]);
        
        
        setBlogs(postsData || []);
        setCategories(categoriesData || []);
      } catch (error) {
        setError(error.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-500">Error loading data: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Categories Section */}
      <Categories categories={categories} loading={loading} />

      {/* Featured Blogs Section */}
      <FeaturedBlogs blogs={blogs} loading={loading} />

      {/* Why Choose Section */}
      <WhyChoose />

      {/* Newsletter Section */}
      <NewsLetter />
    </div>
  );
};

export default Home;