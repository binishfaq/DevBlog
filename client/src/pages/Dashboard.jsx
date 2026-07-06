import { useState, useEffect } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import StatCard from "../components/dashboard/StatCard";
import RecentPosts from "../components/dashboard/RecentPosts";
import { getMyPosts } from "../services/post.service";

import {
  FileText,
  Heart,
  MessageCircle,
  Eye,
} from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalLikes: 0,
    totalComments: 0,
    totalViews: 0,
    published: 0,
    drafts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
const getUser = () => {
  try {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      return parsed;
    }
    return { fullName: "User" };
  } catch (error) {
    console.error("Error parsing user data:", error);
    return { fullName: "User" };
  }
};

const user = getUser();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getMyPosts();

      const posts = response?.posts || response || [];
      
      // Calculate stats
      const totalPosts = posts.length;
      const totalLikes = posts.reduce((acc, p) => acc + (p.likes?.length || p.likes || 0), 0);
      const totalComments = posts.reduce((acc, p) => acc + (p.comments?.length || 0), 0);
      const totalViews = posts.reduce((acc, p) => acc + (p.views || 0), 0);
      const published = posts.filter(p => p.status === "published" || p.status === "Published").length;
      const drafts = posts.filter(p => p.status === "draft" || p.status === "Draft").length;

      setStats({
        totalPosts,
        totalLikes,
        totalComments,
        totalViews,
        published,
        drafts,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      setError(error.response?.data?.message || error.message || "Failed to load dashboard stats");
      // ✅ Set default stats on error
      setStats({
        totalPosts: 0,
        totalLikes: 0,
        totalComments: 0,
        totalViews: 0,
        published: 0,
        drafts: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Posts",
      value: stats.totalPosts,
      icon: FileText,
      color: "#2563EB",
      subtitle: `${stats.published} published, ${stats.drafts} drafts`,
    },
    {
      title: "Total Likes",
      value: stats.totalLikes,
      icon: Heart,
      color: "#EF4444",
    },
    {
      title: "Comments",
      value: stats.totalComments,
      icon: MessageCircle,
      color: "#10B981",
    },
    {
      title: "Total Views",
      value: stats.totalViews,
      icon: Eye,
      color: "#8B5CF6",
    },
  ];

  // ✅ Loading state
  if (loading) {
    return (
      <div className="flex bg-gray-100 min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="p-6 md:p-8">
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-500 mt-4">Loading dashboard...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <div className="flex bg-gray-100 min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="p-6 md:p-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <h3 className="text-red-600 font-semibold text-lg mb-2">Error Loading Dashboard</h3>
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={fetchStats}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-6 md:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Welcome back, {user?.fullName || "User"}
            </h1>
            <p className="text-gray-500 mt-1">
              Here's what's happening with your account today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
                subtitle={stat.subtitle}
              />
            ))}
          </div>

          {/* Recent Posts Section */}
          <div className="mt-8">
            <RecentPosts />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;