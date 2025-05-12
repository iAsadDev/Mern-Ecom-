import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCog, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import logo from "../../src/assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const getCartFromStorage = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      updateCartCount(cart);
    };

    getCartFromStorage();
    const interval = setInterval(getCartFromStorage, 1000);
    return () => clearInterval(interval);
  }, []);
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const updateCartCount = (cart) => {
    const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    setCartItemCount(count);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsCategoriesOpen(false);
  };

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setIsCategoriesOpen(false);
  };

  const productCategories = [
    { name: "Kitchen Accessories", path: "/categories/kitchenaccessories" },
  ];

  const navLinkClass = (path) =>
    `transition-colors px-2 py-1 duration-300 rounded-md ${
      location.pathname === path
        ? "text-teal-600 font-semibold"
        : "text-black hover:text-teal-600"
    }`;

  return (
    <nav className="bg-white text-black shadow-md sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Hamburger Icon */}
          <div
            className={`md:hidden flex flex-col justify-center space-y-1.5 cursor-pointer z-50 ${
              isMenuOpen ? "fixed left-4 top-4" : ""
            }`}
            onClick={toggleMenu}
          >
            <div className={`w-7 h-0.5 bg-black transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <div className={`w-7 h-0.5 bg-black transition-all ${isMenuOpen ? "opacity-0" : ""}`} />
            <div className={`w-7 h-0.5 bg-black transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>

          {/* Logo */}
          <Link to="/" onClick={closeMobileMenu} className="flex items-center">
            <img src={logo} alt="Logo" className="h-16 w-auto drop-shadow-sm" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={navLinkClass("/")}>Home</Link>
            <Link to="/shop" className={navLinkClass("/shop")}>Shop</Link>

            <div className="relative group">
              <button onClick={toggleCategories} className="flex items-center hover:text-teal-600">
                Categories
                <FaChevronDown className={`ml-1 transition-transform ${isCategoriesOpen ? "rotate-180 text-teal-600" : "text-black"}`} />
              </button>
              <div className={`absolute mt-2 left-0 w-48 bg-white/80 backdrop-blur-md rounded-md shadow-md transition-all ${
                isCategoriesOpen ? "block" : "hidden"
              }`}>
                {productCategories.map((category) => (
                  <Link
                    key={category.path}
                    to={category.path}
                    onClick={closeMobileMenu}
                    className="block px-4 py-2 text-black hover:text-teal-600"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/blog" className={navLinkClass("/blog")}>Blog</Link>
            <Link to="/about" className={navLinkClass("/about")}>About</Link>
            <Link to="/privacyPolicy" className={navLinkClass("/privacyPolicy")}>Privacy</Link>
            <Link to="/contact" className={navLinkClass("/contact")}>Contact</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <FaShoppingCart className="text-xl text-black" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link to="/admin">
              <FaUserCog className="text-xl text-black" />
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 bg-white/90 backdrop-blur-lg z-40 transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col space-y-6 p-8 pt-24 text-lg text-black">
            <Link to="/" onClick={closeMobileMenu} className={navLinkClass("/")}>Home</Link>
            <Link to="/shop" onClick={closeMobileMenu} className={navLinkClass("/shop")}>Shop</Link>

            <button onClick={toggleCategories} className="flex items-center">
              Categories
              <FaChevronDown className={`ml-2 transition-transform ${isCategoriesOpen ? "rotate-180 text-teal-600" : ""}`} />
            </button>
            <div className={`${isCategoriesOpen ? "max-h-40" : "max-h-0"} transition-all overflow-hidden`}>
              {productCategories.map((category) => (
                <Link
                  key={category.path}
                  to={category.path}
                  onClick={closeMobileMenu}
                  className="block pl-4 py-2 hover:text-teal-600"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <Link to="/blog" onClick={closeMobileMenu} className={navLinkClass("/blog")}>Blog</Link>
            <Link to="/about" onClick={closeMobileMenu} className={navLinkClass("/about")}>About</Link>
            <Link to="/privacyPolicy" onClick={closeMobileMenu} className={navLinkClass("/privacyPolicy")}>Privacy</Link>
            <Link to="/contact" onClick={closeMobileMenu} className={navLinkClass("/contact")}>Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
