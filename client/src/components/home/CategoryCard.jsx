import { Link } from "react-router-dom";

const CategoryCard = ({ icon: Icon, title, count, color }) => {
  return (
    <Link
      to={`/category/${title.toLowerCase()}`}
      className="group bg-white rounded-lg border border-slate-200 px-2.5 py-2 shadow-sm hover:shadow-lg transition-shadow duration-300 flex items-center gap-2.5"
    >
      <div className={`w-7 h-7 rounded-lg ${color} flex items-center justify-center text-white flex-shrink-0`}>
        <Icon size={15} />
      </div>
      <span className="text-xs font-medium text-slate-700 truncate">{title}</span>
      <span className="text-[10px] text-slate-400 ml-auto">{count}</span>
    </Link>
  );
};

export default CategoryCard;