// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes, FaEgg } from "react-icons/fa";
import { useCart } from "../contexts/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { getCartCount } = useCart();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
            : "bg-white shadow-soft py-3"
        }`}
      >
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo - Better aligned */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
              {/* Egg Icon - Visible on mobile */}
              <div className="bg-primary/10 p-1.5 sm:p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                <FaEgg className="text-primary text-lg sm:text-xl" />
              </div>

              {/* Brand Name */}
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-gray-800 leading-tight">
                  Village Knock
                </span>
                <span className="text-[10px] sm:text-xs text-gray-500 hidden xs:block">
                  Fresh Village Eggs
                </span>
              </div>
            </Link>

            {/* Desktop Menu - Centered */}
            <div className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2 space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive(link.path)
                      ? "text-primary bg-primary/10"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Right Section - Cart & Mobile Button */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Cart - Better positioned */}
              <Link
                to="/cart"
                className="relative p-2 hover:bg-gray-50 rounded-full transition-colors"
              >
                <FaShoppingCart className="text-xl sm:text-2xl text-gray-700" />
                {getCartCount() > 0 && (
                  <>
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                      {getCartCount()}
                    </span>
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500/30 rounded-full animate-ping"></span>
                  </>
                )}
              </Link>
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <FaTimes className="text-xl text-gray-700" />
                ) : (
                  <FaBars className="text-xl text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Full Screen Overlay */}
        <div
          className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out md:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ top: "64px" }} // Below navbar
        >
          <div className="h-full overflow-y-auto pb-20">
            <div className="container-custom px-6 py-8">
              {/* Mobile Menu Header */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800">Menu</h3>
                <p className="text-sm text-gray-500">Navigate to pages</p>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center justify-between p-4 rounded-xl font-medium transition-all ${
                      isActive(link.path)
                        ? "bg-primary/10 text-primary border-l-4 border-primary"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive(link.path) && (
                      <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              {/* Mobile Cart Summary */}
              <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-600">Cart Items:</span>
                  <span className="font-bold text-primary text-xl">
                    {getCartCount()}
                  </span>
                </div>
                <Link
                  to="/cart"
                  className="block w-full bg-primary text-white text-center py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                >
                  View Cart
                </Link>
              </div>

              {/* Mobile Contact Info */}
              <div className="mt-8 space-y-3 text-sm text-gray-500">
                <p className="flex items-center gap-2">
                  <span className="text-primary">📞</span>
                  +91 76708 88165
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-primary">✉️</span>
                  villageknocks@gmail.com
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-primary">📍</span>
                  Moula Ali, Hyderabad
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
