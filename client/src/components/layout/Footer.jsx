import { Link } from "react-router-dom";
import Container from "./Container";

const Footer = () => {
  return (
    <footer className="border-t bg-white py-12 mt-16">
      <Container>
        <div className="grid md:grid-cols-4 gap-8 pb-8 border-b border-gray-100">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DevBlog
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Learn • Build • Share
            </p>
            <p className="text-sm text-slate-600 mt-4 max-w-xs">
              Practical tutorials, real-world projects, and modern web development articles.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/blogs" className="text-slate-600 hover:text-blue-600 transition">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-600 hover:text-blue-600 transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-blue-600 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-600 hover:text-blue-600 transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/blogs?category=mern" className="text-slate-600 hover:text-blue-600 transition">
                  MERN Stack
                </Link>
              </li>
              <li>
                <Link to="/blogs?category=react" className="text-slate-600 hover:text-blue-600 transition">
                  React
                </Link>
              </li>
              <li>
                <Link to="/blogs?category=devops" className="text-slate-600 hover:text-blue-600 transition">
                  DevOps
                </Link>
              </li>
              <li>
                <Link to="/blogs?category=javascript" className="text-slate-600 hover:text-blue-600 transition">
                  JavaScript
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Stay Updated</h3>
            <p className="text-sm text-slate-600 mb-3">
              Get the latest articles straight to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 transition"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} DevBlog. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-blue-600 transition"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-blue-600 transition"
            >
              Twitter
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-blue-600 transition"
            >
              YouTube
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-blue-600 transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;