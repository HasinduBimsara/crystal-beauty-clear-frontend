import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaUser,
  FaCog,
  FaShoppingBag,
  FaHeart,
  FaBell,
  FaChevronDown,
  FaTimes,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export default function UserData() {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(3); // Mock count
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/current`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Clear invalid token
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
        }
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      // Call logout API if available
      if (token) {
        await axios
          .post(
            `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .catch(() => {
            // Ignore errors for logout
          });
      }

      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("userData");

      // Update state
      setUser(null);
      setIsDropdownOpen(false);

      // Show success message
      // You can add a toast notification here

      // Redirect to home
      navigate("/");
      window.location.reload(); // Force refresh to update all components
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("token");
      setUser(null);
      navigate("/");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Mock notifications
  const notifications = [
    {
      id: 1,
      text: "Your order has been shipped",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      text: "New message from support",
      time: "5 hours ago",
      read: false,
    },
    { id: 3, text: "Special offer: 20% off", time: "1 day ago", read: true },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
        <div className="hidden md:block">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center space-x-4">
      {/* Notifications Bell */}
      {user && (
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 group"
            aria-label="Notifications"
          >
            <FaBell className="text-xl text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-gray-800 dark:text-white">
                    Notifications
                  </h3>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer transition-colors ${
                      !notification.read ? "bg-blue-50 dark:bg-blue-900/20" : ""
                    }`}
                  >
                    <p className="text-gray-800 dark:text-white">
                      {notification.text}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {notification.time}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                <Link
                  to="/notifications"
                  className="text-center block text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
                  onClick={() => setShowNotifications(false)}
                >
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* User Profile/Login Section */}
      {user ? (
        <div className="relative" ref={dropdownRef}>
          {/* Profile Button */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
            aria-label="User menu"
            aria-expanded={isDropdownOpen}
          >
            {/* Avatar with Image or Initials */}
            <div className="relative">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg shadow">
                  {getInitials()}
                </div>
              )}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-800"></div>
            </div>

            {/* User Info - Hidden on mobile */}
            <div className="hidden md:block text-left">
              <p className="font-semibold text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {user.name.split(" ")[0]}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.email}
              </p>
            </div>

            <FaChevronDown
              className={`text-gray-500 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
              {/* User Info in Dropdown */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <div className="flex items-center space-x-3">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-800"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-xl">
                      {getInitials()}
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-gray-800 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {user.email}
                    </p>
                    {user.role && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-xs rounded-full">
                        {user.role}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FaUser className="text-gray-500" />
                  <span>My Profile</span>
                </Link>

                {user.role === "admin" && (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <MdDashboard className="text-gray-500" />
                    <span>Dashboard</span>
                  </Link>
                )}

                <Link
                  to="/orders"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FaShoppingBag className="text-gray-500" />
                  <span>My Orders</span>
                  <span className="ml-auto bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs px-2 py-1 rounded-full">
                    3
                  </span>
                </Link>

                <Link
                  to="/wishlist"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FaHeart className="text-gray-500" />
                  <span>Wishlist</span>
                  <span className="ml-auto bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 text-xs px-2 py-1 rounded-full">
                    12
                  </span>
                </Link>

                <Link
                  to="/settings"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FaCog className="text-gray-500" />
                  <span>Settings</span>
                </Link>
              </div>

              {/* Logout Button */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-2">
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoggingOut ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Logging out...</span>
                    </>
                  ) : (
                    <>
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Login/Register Buttons
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/login"
              className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <FaSignInAlt />
              <span className="font-semibold">Login</span>
            </Link>
            <Link
              to="/register"
              className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <FaUserPlus />
              <span className="font-semibold">Register</span>
            </Link>
          </div>

          {/* Mobile View */}
          <div className="md:hidden flex items-center space-x-2">
            <Link
              to="/login"
              className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg"
              aria-label="Login"
            >
              <FaSignInAlt />
            </Link>
          </div>
        </div>
      )}

      {/* Welcome Message for New Users */}
      {!user && (
        <div className="hidden lg:block text-sm text-gray-600 dark:text-gray-400 italic animate-pulse">
          Welcome! Please sign in for personalized experience
        </div>
      )}
    </div>
  );
}
