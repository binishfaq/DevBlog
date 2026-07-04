import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const links = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { id: "posts", label: "My Posts", icon: FileText, path: "/dashboard/posts" },
    { id: "settings", label: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  return (
    <div className={`${isOpen ? "w-64" : "w-20"} bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300 flex flex-col`}>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map((link) => (
          <Link
            key={link.id}
            to={link.path}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
              location.pathname === link.path
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
            }`}
          >
            <link.icon size={20} />
            {isOpen && <span className="text-sm font-medium">{link.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200">
          <LogOut size={20} />
          {isOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;