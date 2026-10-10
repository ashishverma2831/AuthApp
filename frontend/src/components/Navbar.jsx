import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Features", href: "/features" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu on Escape, and when the screen grows to desktop size
  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => e.matches && setOpen(false);

    window.addEventListener("keydown", onKeyDown);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        {/* Left: logo (flex-1 keeps the center links truly centered) */}
        <div className="flex flex-1 items-center">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
              L
            </span>
            <span className="text-lg font-semibold text-slate-900">Logo</span>
          </NavLink>
        </div>

        {/* Center: links (desktop) */}
        <ul className="hidden items-center gap-6 md:flex lg:gap-10">
          {links.map((link) => (
            <li key={link.href}>
              <NavLink
                to={link.href}
                className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right: auth actions (desktop) */}
        <div className="hidden flex-1 items-center justify-end gap-3 md:flex">
          <NavLink
            to="/login"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:text-indigo-600"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Register
          </NavLink>
        </div>

        {/* Hamburger (mobile) */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 md:hidden"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu: slides open/closed. `inert` keeps hidden links out of tab order. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-slate-200 px-4 pb-5 pt-2 sm:px-6">
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.href}>
                  <NavLink
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-100"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-slate-300 px-4 py-3 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-indigo-600 px-4 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700"
              >
                Register
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
