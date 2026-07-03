import { Link } from "react-router-dom";
import Container from "../layout/Container";
import BlogCard from "./BlogCard";

const blogs = [
  {
    id: 1,
    title: "Build a Complete MERN Authentication System",
    description:
      "Learn JWT authentication, protected routes, password hashing and user authorization with React and Node.js.",
    category: "MERN",
    readTime: "8 min read",
    slug: "mern-authentication",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800",
  },

  {
    id: 2,
    title: "Getting Started with Docker for MERN Developers",
    description:
      "Containerize your applications and simplify deployments using Docker and Docker Compose.",
    category: "DevOps",
    readTime: "6 min read",
    slug: "docker-guide",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
  },

  {
    id: 3,
    title: "Modern React Folder Structure in 2026",
    description:
      "Organize large React projects using scalable architecture and reusable components.",
    category: "React",
    readTime: "5 min read",
    slug: "react-folder-structure",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
  },
];

const FeaturedBlogs = () => {
  return (
    <section className="py-24 bg-slate-50">

      <Container>

        <div className="text-center max-w-2xl mx-auto">

          <span className="text-blue-600 font-semibold uppercase tracking-wider">
            Featured Articles
          </span>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Latest Articles & Tutorials
          </h2>

          <p className="mt-4 text-slate-600">
            Explore practical tutorials, real-world MERN projects,
            DevOps guides, and modern web development tips.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-16">

          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
            />
          ))}

        </div>

        <div className="text-center mt-14">

          <Link
            to="/blogs"
            className="inline-flex items-center rounded-xl bg-blue-600 px-8 py-3 text-white font-semibold hover:bg-blue-700 transition"
          >
            View All Blogs
          </Link>

        </div>

      </Container>

    </section>
  );
};

export default FeaturedBlogs;