import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Clock, TrendingUp } from "lucide-react";
import Button from "../common/Button";
import Container from "../layout/Container";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-16 bg-gradient-to-b from-slate-50 via-white to-white">
      <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-blue-100 blur-3xl opacity-20"></div>
      <div className="absolute -bottom-20 right-0 w-80 h-80 rounded-full bg-purple-100 blur-3xl opacity-20"></div>

      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Welcome to Our Blog
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-slate-900">
            Discover
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Amazing Stories
            </span>
          </h1>

          <p className="mt-4 text-lg text-slate-600 leading-7 max-w-2xl mx-auto">
            Read the best articles on web development, programming, 
            and technology. Written by developers, for developers.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/blogs">
              <Button className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center">
                Explore Blogs
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link to="/about">
              <Button
                variant="outline"
                className="px-6 py-2.5 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300"
              >
                About Us
              </Button>
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-slate-600">200+ Articles</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-slate-600">Weekly Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-slate-600">10k+ Readers</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;