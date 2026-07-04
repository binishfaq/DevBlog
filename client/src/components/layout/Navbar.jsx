import { Link, NavLink } from "react-router-dom";
import { Menu, X, LayoutDashboard, User, LogOut, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

import Container from "./Container";
import Logo from "../common/Logo";
import Button from "../common/Button";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setShowProfile(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" },
    { name: "About", path: "/about" },
  ];

  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <Container>
        <div className="flex h-20 items-center justify-between">

          <Link to="/" onClick={() => setIsOpen(false)}>
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative text-[16px] font-medium transition-all duration-300
                  ${
                    isActive
                      ? "text-blue-600 after:w-full"
                      : "text-gray-700 hover:text-blue-600 after:w-0 hover:after:w-full"
                  }
                  after:absolute after:left-0 after:-bottom-2 after:h-[2px]
                  after:bg-blue-600 after:transition-all after:duration-300`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Button>
                </Link>

                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowProfile(!showProfile)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold overflow-hidden">
                      {user?.avatar ? (
                        <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        getInitials(user?.fullName || user?.username)
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700 hidden lg:block">
                      {user?.fullName || user?.username}
                    </span>
                    <ChevronDown size={16} className={`text-gray-600 transition-transform duration-200 ${showProfile ? 'rotate-180' : ''}`} />
                  </button>

                  {showProfile && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                        onClick={() => setShowProfile(false)}
                      >
                        <User size={16} /> Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition w-full"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-[500px] py-5" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-base font-medium transition
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2">
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Button>
                </Link>
                <Link to="/profile" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <User size={18} />
                    Profile
                  </Button>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="mt-4 flex flex-col gap-3">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;