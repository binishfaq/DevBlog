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
  Bookmark,
  Eye,
  TrendingUp,
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
  const user = JSON.parse(localStorage.getItem("user")) || { fullName: "User" };

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await getMyPosts();
      const posts = data.posts || [];

      // Calculate stats
      const totalPosts = posts.length;
      const totalLikes = posts.reduce((acc, p) => acc + (p.likes || 0), 0);
      const totalComments = posts.reduce((acc, p) => acc + (p.comments?.length || 0), 0);
      const totalViews = posts.reduce((acc, p) => acc + (p.views || 0), 0);
      const published = posts.filter(p => p.status === "published").length;
      const drafts = posts.filter(p => p.status === "draft").length;

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

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={loading ? "..." : stat.value}
                icon={stat.icon}
                color={stat.color}
                subtitle={stat.subtitle}
              />
            ))}
          </div>

          {/* Recent Posts */}
          <RecentPosts />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;