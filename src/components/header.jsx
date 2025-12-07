import { useState, useEffect } from "react";
import { BsCart4, BsSun, BsMoon } from "react-icons/bs";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import UserData from "./userData";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }
    return false;
  });

  // Toggle theme and store in localStorage
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <header className="h-[80px] w-full flex items-center bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg relative transition-colors duration-300">
      {/* Logo/Brand */}
      <div className="ml-4 lg:ml-8">
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400"
        >
          BrandName
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <RxHamburgerMenu
        className="lg:hidden text-3xl text-accent mx-4 ml-auto cursor-pointer hover:scale-110 transition-transform duration-200"
        onClick={() => setIsOpen(true)}
      />

      {/* Desktop Navigation */}
      <div className="hidden lg:flex flex-1 items-center justify-center h-full">
        <div className="flex w-[600px] h-full items-center justify-evenly">
          <Link
            to="/"
            className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/products"
            className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 relative group"
          >
            Products
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/contact"
            className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 relative group"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/reviews"
            className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 relative group"
          >
            Reviews
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>
      </div>

      {/* Right Side Actions (Desktop) */}
      <div className="hidden lg:flex items-center space-x-6 mr-8">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <BsSun className="text-yellow-500 text-xl" />
          ) : (
            <BsMoon className="text-gray-700 text-xl" />
          )}
        </button>

        {/* User Data */}
        <div className="relative">
          <UserData />
        </div>

        {/* Cart with Badge */}
        <Link to="/cart" className="relative">
          <BsCart4 className="text-2xl text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>
        </Link>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed lg:hidden z-[9999] top-0 left-0 w-full h-screen">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute top-0 left-0 w-4/5 max-w-sm h-full bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300">
            <div className="p-6">
              {/* Menu Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Menu
                </h2>
                <RxCross1
                  className="text-3xl text-gray-600 dark:text-gray-300 cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => setIsOpen(false)}
                />
              </div>

              {/* Navigation Links */}
              <nav className="space-y-4">
                <Link
                  to="/"
                  className="flex items-center p-3 text-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg transition-colors duration-200 group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Home
                </Link>
                <Link
                  to="/products"
                  className="flex items-center p-3 text-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg transition-colors duration-200 group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Products
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center p-3 text-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg transition-colors duration-200 group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Contact Us
                </Link>
                <Link
                  to="/reviews"
                  className="flex items-center p-3 text-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg transition-colors duration-200 group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Reviews
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center p-3 text-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg transition-colors duration-200 group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Cart
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    3
                  </span>
                </Link>
              </nav>

              {/* Theme Toggle and User Data in Mobile Menu */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-600 dark:text-gray-400">
                    Theme
                  </span>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    {isDarkMode ? (
                      <BsSun className="text-yellow-500 text-xl" />
                    ) : (
                      <BsMoon className="text-gray-700 text-xl" />
                    )}
                  </button>
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <UserData />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
