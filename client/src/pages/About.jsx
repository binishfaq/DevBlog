import { Link } from "react-router-dom";
import {
  Users,
  BookOpen,
  Code2,
  Rocket,
  Award,
  Heart,
  Coffee,
  Mail,
  ArrowRight,
  Sparkles,
  Star,
  Zap,
  Globe,
  Shield,
  Clock,
  CheckCircle,
} from "lucide-react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import Container from "../components/layout/Container";

const About = () => {
  const stats = [
    { value: "10k+", label: "Active Users", icon: Users, color: "from-blue-500 to-blue-600" },
    { value: "200+", label: "Articles", icon: BookOpen, color: "from-purple-500 to-purple-600" },
    { value: "50+", label: "Tutorials", icon: Code2, color: "from-green-500 to-green-600" },
    { value: "5k+", label: "Daily Readers", icon: Rocket, color: "from-orange-500 to-orange-600" },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "In-Depth Tutorials",
      description: "Step-by-step guides covering everything from basics to advanced concepts.",
      color: "blue",
    },
    {
      icon: Code2,
      title: "Real Projects",
      description: "Build production-ready applications with practical, hands-on experience.",
      color: "purple",
    },
    {
      icon: Users,
      title: "Active Community",
      description: "Connect with thousands of developers and grow together.",
      color: "green",
    },
    {
      icon: Rocket,
      title: "Modern Tech Stack",
      description: "Stay updated with the latest in web development and programming.",
      color: "orange",
    },
    {
      icon: Shield,
      title: "Best Practices",
      description: "Learn industry-standard coding practices and architectural concepts.",
      color: "red",
    },
    {
      icon: Award,
      title: "Career Growth",
      description: "Gain skills that will help you advance in your career.",
      color: "indigo",
    },
  ];

  const team = [
    {
      name: "John Doe",
      role: "Founder & Lead Developer",
      bio: "Passionate about building tools that help developers learn and grow.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      social: { github: "#", twitter: "#", linkedin: "#" },
    },
    {
      name: "Jane Smith",
      role: "Content Creator",
      bio: "Loves breaking down complex topics into simple, digestible content.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      social: { github: "#", twitter: "#", linkedin: "#" },
    },
    {
      name: "Mike Johnson",
      role: "Community Manager",
      bio: "Dedicated to building a supportive and engaging developer community.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      social: { github: "#", twitter: "#", linkedin: "#" },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100/10 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        </div>

        <Container>
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-100/50 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-600">About Us</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Empowering Developers
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                to Build the Future
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mt-6 max-w-2xl mx-auto leading-relaxed">
              DevBlog is a platform dedicated to helping developers learn, grow, and share
              their knowledge through practical tutorials and real-world projects.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition shadow-lg hover:shadow-xl"
              >
                Explore Blogs
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-white transition"
              >
                Join Community
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm border-t border-b border-slate-100/50">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className={`w-7 h-7 text-${stat.color.split('-')[1]}-500`} />
                </div>
                <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
                <p className="text-slate-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-1.5 mb-4">
                <Star className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-600">Our Mission</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Making Quality Education
                <br />
                <span className="text-blue-600">Accessible to Everyone</span>
              </h2>
              <p className="text-slate-600 text-lg mt-4 leading-relaxed">
                We believe that anyone can become a developer. Our mission is to provide
                high-quality, practical content that helps you build real skills and
                advance your career.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Practical tutorials</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Real-world projects</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Community support</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                <h3 className="text-4xl font-bold">200+</h3>
                <p className="text-blue-100 mt-1">Articles Published</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                <h3 className="text-4xl font-bold">50+</h3>
                <p className="text-purple-100 mt-1">Tutorials</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
                <h3 className="text-4xl font-bold">10k+</h3>
                <p className="text-green-100 mt-1">Active Users</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
                <h3 className="text-4xl font-bold">5k+</h3>
                <p className="text-orange-100 mt-1">Daily Readers</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-1.5 mb-4">
              <Zap className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-600">Why Choose DevBlog</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Everything You Need to <span className="text-blue-600">Succeed</span>
            </h2>
            <p className="text-slate-600 mt-4 text-lg">
              We provide all the resources you need to become a better developer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-${feature.color}-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">{feature.title}</h3>
                <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-50 rounded-full px-4 py-1.5 mb-4">
              <Users className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-600">Our Team</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Meet the <span className="text-purple-600">Creators</span>
            </h2>
            <p className="text-slate-600 mt-4 text-lg">
              A passionate team dedicated to helping developers succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-blue-100"
                />
                <h3 className="text-xl font-semibold text-slate-800 mt-4">
                  {member.name}
                </h3>
                <p className="text-sm text-blue-600 font-medium">{member.role}</p>
                <p className="text-slate-500 text-sm mt-2">{member.bio}</p>
                <div className="flex justify-center gap-3 mt-4">
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <FaGithub className="w-4 h-4" />
                  </a>
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <FaTwitter className="w-4 h-4" />
                  </a>
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <FaLinkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Start Your Journey?
            </h2>
            <p className="text-blue-100 mt-4 text-lg">
              Join thousands of developers already learning and growing with DevBlog.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition shadow-lg"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transition"
              >
                Explore Content
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default About;