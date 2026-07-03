import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import Container from "./Container";
import Logo from "../common/Logo";
import Button from "../common/Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <Container>
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link to="/" onClick={() => setIsOpen(false)}>
            <Logo />
          </Link>

          {/* Desktop Navigation */}
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

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Login
              </Button>
            </Link>

            <Link to="/register">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Register
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 py-5" : "max-h-0"
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
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;