import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";
import { Mail, ArrowRight } from "lucide-react";
import Container from "./Container";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border-t border-white/10">
      <Container>
        <div className="py-16">
          <div className="grid md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
            {/* Brand */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                DevBlog
              </h2>
              <p className="text-sm text-gray-400">
                Learn • Build • Share
              </p>
              <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                Practical tutorials, real-world projects, and modern web development 
                articles to help you become a better developer.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="text-xs text-gray-500">Follow us:</span>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-500 transition-all duration-300 hover:scale-110"
                  aria-label="YouTube"
                >
                  <FaYoutube className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/blogs" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                Categories
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/blogs?category=mern" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                    MERN Stack
                  </Link>
                </li>
                <li>
                  <Link to="/blogs?category=react" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                    React
                  </Link>
                </li>
                <li>
                  <Link to="/blogs?category=devops" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                    DevOps
                  </Link>
                </li>
                <li>
                  <Link to="/blogs?category=javascript" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                    JavaScript
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                Stay Updated
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Get the latest articles straight to your inbox.
              </p>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-white/10 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder:text-gray-500 text-white transition-all duration-300"
                  />
                </div>
                <button className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25 flex items-center gap-1 group">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <p className="text-xs text-gray-500">
                No spam, unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6">
            <p className="text-sm text-gray-500">
              © {currentYear} DevBlog. All rights reserved.
            </p>

            <div className="flex items-center gap-6 text-xs text-gray-500">
              <Link to="/privacy" className="hover:text-gray-300 transition-colors">
                Privacy
              </Link>
              <span className="text-gray-700">•</span>
              <Link to="/terms" className="hover:text-gray-300 transition-colors">
                Terms
              </Link>
              <span className="text-gray-700">•</span>
              <Link to="/sitemap" className="hover:text-gray-300 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;