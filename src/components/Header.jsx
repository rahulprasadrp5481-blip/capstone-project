import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHeart, FaBars, FaTimes } from "react-icons/fa";
import Logo from "./Logo";

const links = [
  { to: "/", label: "Blogs", end: true },
  { to: "/hotels", label: "Hotels" },
  { to: "/about", label: "About" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const count = useSelector((state) => state.favourites.items.length);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md font-medium transition ${
      isActive ? "bg-white text-teal-700" : "text-white hover:bg-teal-600"
    }`;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-teal-700 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-16">
        <Link to="/" aria-label="TrailNest home">
          <Logo />
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-2">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/favourites"
            className="relative ml-2 text-white text-2xl"
            aria-label="Favourites"
          >
            <FaHeart />
            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full h-5 min-w-5 px-1 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-teal-800 px-4 pb-4 flex flex-col gap-2">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/favourites" className={linkClass} onClick={() => setOpen(false)}>
            Favourites ({count})
          </NavLink>
        </nav>
      )}
    </header>
  );
}