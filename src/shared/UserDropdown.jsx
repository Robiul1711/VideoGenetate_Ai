import React, { useState, useEffect, useRef } from "react";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const UserDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will need to sign in again to access your dashboard.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        onLogout?.();   // calls logout from AuthProvider
        setIsOpen(false);
        Swal.fire("Logged out!", "You have been logged out successfully.", "success");
      }
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 text-white text-lg"
      >
        {user?.data?.profile_photo_url ? (
          <img
            src={VITE_IMG_URL + user?.data?.profile_photo_url}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <FaUserCircle className="text-3xl text-white bg-Primary rounded-full" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded shadow-lg z-50 text-gray-800">
          <div className="px-4 py-3 border-b">
            <p className="font-semibold">{user?.data?.name || "Username"}</p>
            <p className="text-sm text-gray-500 truncate">{user?.data?.email}</p>
          </div>
          <div className="py-1">
            <Link
              to="/dashboard"
              className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100"
            >
              <MdDashboard className="mr-2" /> Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
