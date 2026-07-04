import { Link } from "react-router-dom";
import { Code2, Database, Globe, Server, Layout, Braces, Shield, Rocket } from "lucide-react";

const Categories = ({ categories = [] }) => {
  // Fallback categories if API returns empty
  const defaultCategories = [
    { name: "MERN Stack", icon: Code2, color: "from-blue-500 to-blue-600" },
    { name: "React", icon: Layout, color: "from-cyan-500 to-cyan-600" },
    { name: "Node.js", icon: Server, color: "from-green-500 to-green-600" },
    { name: "JavaScript", icon: Braces, color: "from-yellow-500 to-yellow-600" },
    { name: "DevOps", icon: Rocket, color: "from-purple-500 to-purple-600" },
    { name: "Database", icon: Database, color: "from-red-500 to-red-600" },
    { name: "UI/UX", icon: Globe, color: "from-pink-500 to-pink-600" },
    { name: "Security", icon: Shield, color: "from-indigo-500 to-indigo-600" },
  ];

  const displayCategories = categories.length > 0 
    ? categories.map(name => ({
        name,
        icon: defaultCategories.find(c => c.name === name)?.icon || Code2,
        color: defaultCategories.find(c => c.name === name)?.color || "from-gray-500 to-gray-600"
      }))
    : defaultCategories;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold">
            Categories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
            Explore by <span className="text-purple-600">Topics</span>
          </h2>
          <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
            Find articles on your favorite technology topics
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayCategories.slice(0, 8).map((category) => (
            <Link
              key={category.name}
              to={`/blogs?category=${category.name}`}
              className="group relative overflow-hidden rounded-2xl p-6 bg-white border border-slate-100 hover:border-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className="relative">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color} bg-opacity-10`}>
                  <category.icon className={`w-6 h-6 text-${category.color.split('-')[1]}-600`} />
                </div>
                <h3 className="font-semibold text-slate-800 mt-3 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-slate-500 mt-1">View Articles</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;