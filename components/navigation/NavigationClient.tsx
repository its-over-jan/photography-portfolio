"use client";

import { useState } from "react";
import Link from "next/link";

interface NavLink {
  href: string;
  label: string;
}

interface NavigationClientProps {
  /** Desktop nav links – rendered server-side and passed as children */
  children: React.ReactNode;
  logoHref: string;
  links: NavLink[];
  activeHref: string;
  dict: {
    openMenu: string;
    closeMenu: string;
  };
}

export default function NavigationClient({
  children,
  logoHref,
  links,
  activeHref,
  dict,
}: NavigationClientProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full">
      <nav
        className="page-padding flex items-end justify-between py-6"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href={logoHref} className="text-h1 uppercase tracking-[0.2em]">
          Jan Overhaus
        </Link>

        {/* Desktop Nav – server-rendered, passed as children, no hydration needed */}
        {children}

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? dict.closeMenu : dict.openMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`block w-5 h-px bg-primary transition-transform duration-300 ease-in-out ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-primary transition-opacity duration-300 ease-in-out ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-primary transition-transform duration-300 ease-in-out ${
              menuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu – conditional, below the nav bar */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden page-padding pb-8 border-t border-primary/10"
        >
          <ul className="flex flex-col gap-6 pt-6" role="list">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm tracking-wide block transition-opacity hover:opacity-60 ${
                    activeHref === link.href ? "opacity-100" : "opacity-70"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
