import { useState, useEffect } from "react";
import Hero from "../components/home/Hero";
import FeaturedBlogs from "../components/home/FeaturedBlogs";
import Categories from "../components/home/Categories";
import WhyChoose from "../components/home/WhyChoose";
import NewsLetter from "../components/home/NewsLetter";
import api from "../api/axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      // Fetch blogs
      const blogsRes = await api.get("/posts?limit=6");
      setBlogs(blogsRes.data.posts || []);
      
      // Fetch categories
      const categoriesRes = await api.get("/posts/categories/all");
      setCategories(categoriesRes.data.categories || []);
    } catch (error) {
      console.error("Error fetching home data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Hero />
      <FeaturedBlogs blogs={blogs} loading={loading} />
      <Categories categories={categories} />
      <WhyChoose />
      <NewsLetter />
    </>
  );
};

export default Home;