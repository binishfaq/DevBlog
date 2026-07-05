import { Link } from "react-router-dom";
import { Home, Search, ArrowLeft, FileQuestion, LogIn, UserPlus } from "lucide-react";
import Container from "../components/layout/Container";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center py-12">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number */}
          <div className="relative mb-8">
            <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              404
            </div>
            <div className="absolute -top-4 -right-4 md:-top-8 md:-right-8 animate-bounce">
              <FileQuestion className="w-12 h-12 md:w-16 md:h-16 text-yellow-400" />
            </div>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-blue-600" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Oops! Page Not Found
          </h1>

          {/* Description */}
          <p className="text-lg text-slate-600 max-w-md mx-auto mb-8">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-slate-700 rounded-xl font-medium transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition shadow-lg hover:shadow-xl"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition shadow-lg hover:shadow-xl"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>

            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition shadow-lg hover:shadow-xl"
            >
              <UserPlus className="w-4 h-4" />
              Register
            </Link>
          </div>

          {/* Footer Note */}
          <p className="mt-8 text-sm text-slate-400">
            If you think this is a mistake, please{' '}
            <a
              href="mailto:zainbinishfaq@gmail.com"
              className="text-blue-600 hover:underline"
            >
              contact us
            </a>
            .
          </p>
        </div>
      </Container>
    </div>
  );
};

export default NotFound;