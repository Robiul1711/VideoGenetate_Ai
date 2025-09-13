import CommonButton from "@/components/common/CommonButton";
import { LogoIcon } from "@/components/common/Icons";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import UserDropdown from "../UserDropdown";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ track current route
  const { user, logout } = useAuth();

  const tabs = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Pricing", path: "/pricing" },
  ];

  // ✅ Update active tab when route changes
  useEffect(() => {
    const currentTab = tabs.findIndex((tab) => tab.path === location.pathname);
    if (currentTab !== -1) {
      setActiveTab(currentTab + 1);
    }
  }, [location.pathname]);

  // Handle scroll background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    if (!mobileMenuOpen) {
      setMobileMenuOpen(true);
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
      setTimeout(() => setMobileMenuOpen(false), 300);
    }
  };

  // Handle tab click
  const handleMenuClick = (tabIndex, path) => {
    setActiveTab(tabIndex);
    setIsAnimating(false);
    setTimeout(() => setMobileMenuOpen(false), 300);
    navigate(path);
  };

  const tabWidth = 100;
  const indicatorPosition = (activeTab - 1) * (tabWidth + 1);

  return (
    <nav
      className={`sticky w-full top-0 z-50 transition-all duration-500 backdrop-blur-sm ${
        scrolled ? "bg-white/10 shadow-md" : ""
      }`}
    >
      <div className="flex items-center justify-between section-padding-x py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl sm:text-2xl text-Primary font-bold"
          onClick={() => setActiveTab(1)}
        >
          <LogoIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          Clipo.ai
        </Link>

        {/* Desktop Tabs */}
        <div className="hidden md:flex items-center justify-center">
          <ul className="relative flex bg-[#1E1E23] rounded-full p-1">
            {/* Moving Indicator */}
            <div
              className="absolute h-[85%] w-[110px] bg-[#737e8865] flex items-center justify-center rounded-full transition-all duration-500 ease-in-out"
              style={{ left: `${indicatorPosition}px` }}
            ></div>

            {/* Tab Items */}
            {tabs.map((tab, index) => {
              const tabIndex = index + 1;
              return (
                <li
                  key={tab.label}
                  onClick={() => handleMenuClick(tabIndex, tab.path)}
                  className={`relative z-10 px-6 py-3 cursor-pointer rounded-full font-semibold transition duration-300 ${
                    activeTab === tabIndex ? "text-Primary" : "text-[#cac4c4]"
                  }`}
                >
                  {tab.label}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Sign In / User */}
        <div className="hidden md:block">
          {user ? (
            <UserDropdown user={user} onLogout={logout} />
          ) : (
            <CommonButton
              link={"/auth/sign-in"}
              variant="secondary"
              className="rounded-full"
            >
              Sign In
            </CommonButton>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-2xl text-Primary z-50"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 max-w-sm z-50 md:hidden transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 bg-black/90 backdrop-blur-md rounded-r-2xl">
          <div className="flex items-center gap-2 text-xl sm:text-2xl text-Primary font-bold">
            <LogoIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
            Clipo.ai
          </div>

          <ul className="flex flex-col gap-1 mt-5">
            {tabs.map((tab, index) => {
              const tabIndex = index + 1;
              return (
                <li
                  key={tab.label}
                  onClick={() => handleMenuClick(tabIndex, tab.path)}
                  className={`px-4 py-3 cursor-pointer rounded-lg font-semibold text-lg transition ease-in-out duration-300 ${
                    activeTab === tabIndex ? "text-Primary" : "text-white"
                  }`}
                >
                  {tab.label}
                </li>
              );
            })}
            <li className="mt-4">
              <CommonButton
                link={"/auth/sign-in"}
                variant="secondary"
                className="rounded-full w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </CommonButton>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
