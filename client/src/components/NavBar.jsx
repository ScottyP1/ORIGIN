import { Link, NavLink, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import UserSettingsMenu from "./UserSettingsMenu";
import Logo from "./Logo";

import { RiDashboardFill } from "react-icons/ri";
import { TbAlertHexagonFilled } from "react-icons/tb";
import { FaDashcube } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: <FaDashcube size={50} /> },
  { to: "/repos", label: "Repos", icon: <RiDashboardFill size={50} /> },
  { to: "/alerts", label: "Alerts", icon: <TbAlertHexagonFilled size={50} /> },
];

const Navbar = () => {
  const { user, loading, logout } = useContext(AuthContext);
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 font-[Mokoto]">
      <div className="relative max-w-[1280px] mx-auto px-4 md:px-12 py-3">
        <div className="sm:hidden grid grid-cols-[44px_1fr_44px] items-center gap-2">
          {/*Hamburger */}
          <button
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen(true)}
            className="h-11 w-11 flex items-center justify-center text-white/90 rounded-md bg-white/10 hover:bg-white/15 active:scale-95 transition"
          >
            <RxHamburgerMenu size={22} />
          </button>

          {/* Logo  */}
          <div className="justify-self-center">
            <Logo />
          </div>

          {/* Right: Avatar or Login */}
          <div className="justify-self-end">
            {user ? (
              user.github_connected ? (
                <UserSettingsMenu user={user} logout={logout} />
              ) : (
                <a
                  className="absolute top-15 right-0 text-base text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md transition"
                  href="https://github.com/login/oauth/authorize?client_id=Ov23lieEn97vtUEbV4YA&redirect_uri=http://localhost:5173/github-callback&scope=user"
                >
                  Connect Github
                </a>
              )
            ) : (
              pathname === "/" && (
                <Link
                  to="/login"
                  className="absolute top-5 right-0 cursor-target inline-flex items-center gap-6 text-white text-lg bg-gradient-to-br from-[#511f87] via-[#302b63] to-[#0b0b65] py-3 px-6 md:px-20 rounded-full hover:from-[#602194] hover:via-[#473f87] hover:to-[#0e0e6e] transition-all duration-300"
                >
                  Login / Register
                </Link>
              )
            )}
          </div>
        </div>

        <div className="hidden sm:flex">
          <Logo />
        </div>

        {/* DESKTOP */}
        <div className="hidden sm:block ">
          {user ? (
            user.github_connected ? (
              <UserSettingsMenu user={user} logout={logout} />
            ) : (
              <a
                className="absolute top-15 right-0 text-base text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md transition"
                href="https://github.com/login/oauth/authorize?client_id=Ov23lieEn97vtUEbV4YA&redirect_uri=http://localhost:5173/github-callback&scope=user"
              >
                Connect Github
              </a>
            )
          ) : (
            pathname === "/" && (
              <Link
                to="/login"
                className="absolute top-5 right-0 cursor-target inline-flex items-center gap-6 text-white text-lg bg-gradient-to-br from-[#511f87] via-[#302b63] to-[#0b0b65] py-3 px-6 md:px-20 rounded-full hover:from-[#602194] hover:via-[#473f87] hover:to-[#0e0e6e] transition-all duration-300"
              >
                Login / Register
              </Link>
            )
          )}
        </div>

        {/* DESKTOP SIDEBAR */}
        {user && <SideBar />}
      </div>

      {/* MOBILE SLIDE-IN MENU */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
};

const MobileMenu = ({ open, onClose }) => {
  return (
    <div
      id="mobile-menu"
      aria-hidden={!open}
      className={`sm:hidden fixed inset-0 z-40 ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      onClick={onClose}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Panel */}
      <div
        className={`relative h-full w-72 max-w-[85%] bg-black/90 border-r border-white/10 p-4 pt-5 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <span className="text-white/90 text-lg">Menu</span>
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center text-white/90 rounded-md hover:bg-white/10"
          >
            <IoClose size={22} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/80 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <span>{l.icon}</span>
              <span>{l.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

const SideBar = () => {
  return (
    <nav className="hidden sm:flex flex-col gap-32 mt-20 group w-[200px] fixed top-30 left-10 2xl:top-50">
      {navLinks.map((l) => (
        <SidebarLink key={l.to} to={l.to} label={l.label} icon={l.icon} />
      ))}
    </nav>
  );
};

const SidebarLink = ({ to, label, icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-4 py-2 px-4 rounded-lg transition-all duration-300`
    }
  >
    {({ isActive }) => (
      <>
        <span
          className={`text-xl transition-colors duration-300 hover:text-white ${
            isActive ? "text-purple-400" : "text-gray-400"
          }`}
        >
          {icon}
        </span>
        <span className="w-0 overflow-hidden group-hover:w-auto transition-all duration-300 whitespace-nowrap text-white">
          {label}
        </span>
      </>
    )}
  </NavLink>
);

export default Navbar;
