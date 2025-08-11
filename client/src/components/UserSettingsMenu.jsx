import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut, FiMoon, FiSun, FiSettings, FiGithub } from "react-icons/fi";

const UserSettingsMenu = ({ user, logout }) => {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });
  const navigate = useNavigate();
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    function onDocClick(e) {
      if (!open) return;
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    function onEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <div className="cursor-target absolute top-2 right-2 md:top-15 md:right-0 ">
      {/* Trigger */}
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3 text-white md:bg-gradient-to-br from-[#511f87] via-[#302b63] to-[#0b0b65] py-2.5 px-4 md:px-6 rounded-full hover:from-[#602194] hover:via-[#473f87] hover:to-[#0e0e6e] transition-all duration-200 shadow-lg"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {user?.avatar_url ? (
          <img
            src={user.avatar_url}
            alt={`${user?.username || "User"} avatar`}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-xs">
            {user?.email?.[0]?.toUpperCase() || "?"}
          </div>
        )}
        <span className="hidden md:block font-semibold tracking-[1.5px]">
          @{user?.username || "user"}
        </span>
      </button>

      {/* Menu */}
      {open && (
        <div
          ref={menuRef}
          role="menu"
          className="absolute right-0 mt-3 w-72 rounded-2xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-md bg-black/60 animate-[fadeIn_.12s_ease-out]"
        >
          {/* Header */}
          <div className="px-4 py-3 bg-white/5">
            <p className="text-sm text-white/70">Signed in as</p>
            <p className="text-white font-semibold truncate">
              {user?.email || "unknown"}
            </p>
          </div>

          {/* Items */}
          <div className="py-2">
            <MenuItem
              to="/account"
              icon={<FiSettings />}
              label="Account settings"
              description="Profile, email & password"
              onClick={() => setOpen(false)}
            />

            <MenuItem
              asButton
              icon={dark ? <FiSun /> : <FiMoon />}
              label={dark ? "Light mode" : "Dark mode"}
              description={dark ? "Switch to Dark" : "Switch to Light"}
              onClick={() => setDark((v) => !v)}
            />
            <MenuItem
              to={user.github_url}
              icon={<FiGithub />}
              label="GitHub"
              description={
                user?.github_connected ? "Connected" : "Not connected"
              }
            />

            <Divider />

            <MenuItem
              asButton
              icon={<FiLogOut />}
              label="Log out"
              danger
              onClick={() => {
                setOpen(false);
                logout();
                navigate("/");
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

function MenuItem({
  to,
  asButton = false,
  icon,
  label,
  description,
  danger = false,
  onClick,
}) {
  const base =
    "w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-white/10 transition-colors";
  const text = danger ? "text-red-300 hover:text-red-200" : "text-white";
  const Comp = asButton ? "button" : Link;

  const props = asButton ? { type: "button", onClick } : { to, onClick };

  return (
    <Comp className={`${base}`} {...props}>
      <span
        className={`mt-0.5 text-xl ${danger ? "text-red-400" : "text-white"}`}
      >
        {icon}
      </span>
      <span className="flex-1">
        <span className={`block font-medium ${text}`}>{label}</span>
        {description && (
          <span className="block text-xs text-white/60">{description}</span>
        )}
      </span>
    </Comp>
  );
}

function Divider() {
  return <div className="my-1 h-px bg-white/10" />;
}

export default UserSettingsMenu;
