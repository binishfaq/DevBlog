import { Link } from "react-router-dom";
import { Code2, Database, Globe, Server, Layout, Braces, Shield, Rocket } from "lucide-react";

const Categories = ({ categories = [] }) => {
  // Fallback categories if API returns empty
  const defaultCategories = [
  { name: "MERN Stack", icon: Code2, color: "bg-blue-500" },
  { name: "React", icon: Layout, color: "bg-cyan-500" },
  { name: "Node.js", icon: Server, color: "bg-green-500" },
  { name: "JavaScript", icon: Braces, color: "bg-yellow-500" },
  { name: "DevOps", icon: Rocket, color: "bg-purple-500" },
  { name: "Database", icon: Database, color: "bg-red-500" },
  { name: "UI/UX", icon: Globe, color: "bg-pink-500" },
  { name: "Security", icon: Shield, color: "bg-indigo-500" },
];

  // ✅ Handle both string and object category formats
  const getCategoryName = (category) => {
    if (typeof category === 'string') return category;
    if (category && typeof category === 'object') return category.name || category._id || '';
    return '';
  };

  // ✅ Filter out empty categories
  const validCategories = categories.filter(c => {
    const name = getCategoryName(c);
    return name && name.trim() !== '';
  });

  // ✅ Build display categories
  const displayCategories = validCategories.length > 0 
    ? validCategories.map((category) => {
        const name = getCategoryName(category);
        const count = category.count || 0;
        const defaultCat = defaultCategories.find(c => c.name === name);
        return {
          name,
          count,
          icon: defaultCat?.icon || Code2,
          color: defaultCat?.color || "from-gray-500 to-gray-600"
        };
      })
    : defaultCategories;

  // ✅ Limit to 8 categories
  const limitedCategories = displayCategories.slice(0, 8);

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
          {limitedCategories.map((category) => {
            // ✅ Extract color name for text color
            const colorName = category.color.split('-')[1] || 'gray';
            
            return (
              <Link
                key={category.name}
                to={`/blogs?category=${encodeURIComponent(category.name)}`}
                className="group relative overflow-hidden rounded-2xl p-6 bg-white border border-slate-100 hover:border-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color} bg-opacity-10`}>
                    <category.icon className={`w-6 h-6 text-${colorName}-600`} />
                  </div>
                  <h3 className="font-semibold text-slate-800 mt-3 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                    <span>{category.count || 0} articles</span>
                    <span className="text-slate-300">•</span>
                    <span className="group-hover:text-blue-600 transition-colors">View</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;