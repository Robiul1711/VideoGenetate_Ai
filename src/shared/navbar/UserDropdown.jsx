import React, { useState, useEffect, useRef } from "react";
import { FaSignOutAlt, FaCog, FaUserCircle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const UserDropdown = ({ user, onLogout, onSettings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 text-white text-lg"
      >
        <FaUserCircle className="text-3xl text-white bg-Primary rounded-full" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded shadow-lg z-50 text-gray-800">
          <div className="px-4 py-3 border-b">
            <p className="font-semibold">{user?.name || "Username"}</p>
            <p className="text-sm text-gray-500 truncate">{user?.email}</p>
          </div>
          <div className="py-1">
            <button
              onClick={() => {
                onSettings?.();
                setIsOpen(false);
              }}
              className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100"
            >
              <MdDashboard className="mr-2" /> Dashboard
            </button>
           
            <button
              onClick={() => {
                onLogout?.();
                setIsOpen(false);
              }}
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