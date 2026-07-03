import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CategoryCard = ({ icon: Icon, title, count, color }) => {
  return (
    <Link
      to={`/category/${title.toLowerCase()}`}
      className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
    >
      <div
        className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center text-white`}
      >
        <Icon size={30} />
      </div>

      <h3 className="mt-5 text-xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-slate-500">
        {count} Articles
      </p>

      <div className="mt-6 flex items-center text-blue-600 font-semibold">
        Explore
        <ArrowRight
          size={18}
          className="ml-2 group-hover:translate-x-1 transition"
        />
      </div>
    </Link>
  );
};

export default CategoryCard;