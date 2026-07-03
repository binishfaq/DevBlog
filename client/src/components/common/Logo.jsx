import { PenSquare } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <PenSquare
        size={32}
        className="text-blue-600"
      />

      <h1 className="text-2xl font-bold text-slate-900">
        DevBlog
      </h1>
    </div>
  );
};

export default Logo;