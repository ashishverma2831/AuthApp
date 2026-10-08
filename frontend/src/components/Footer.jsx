const columns = [
  {
    title: "Product",
    links: [
      { label: "Services", href: "/services" },
      { label: "Products", href: "/products" },
      { label: "Features", href: "/features" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Login", href: "/login" },
      { label: "Register", href: "/register" },
      { label: "Forgot password", href: "/forgot-password" },
    ],
  },
];

const socials = [
  { label: "Twitter", href: "https://twitter.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50 text-left">
      <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-12 sm:px-6 lg:px-8">
        {/*
          One grid for everything:
          - mobile:  brand on its own row, then link columns two per row
          - sm:      brand on its own row, then three link columns
          - lg:      brand (2 cols) + three link columns on a single row
        */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <a href="/" className="inline-flex items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
                L
              </span>
              <span className="text-lg font-semibold text-slate-900">Logo</span>
            </a>
            <p className="mt-4 max-w-sm text-sm text-slate-600">
              Everything your team needs to plan, launch, and grow in one place.
            </p>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-500 transition hover:text-indigo-600"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-sm font-semibold text-slate-900">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="inline-block text-sm text-slate-600 transition hover:text-indigo-600"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Logo. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="/privacy" className="transition hover:text-indigo-600">
              Privacy Policy
            </a>
            <a href="/terms" className="transition hover:text-indigo-600">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;