"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { series } from "@/lib/series";
import type { Dictionary, Locale } from "@/lib/i18n";

interface NavigationProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Navigation({ locale, dict }: NavigationProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    ...series.map((s) => ({
      href: `/${locale}/series/${s.slug}`,
      label: dict.series[s.slug as keyof typeof dict.series].title,
    })),
    { href: `/${locale}/about`, label: dict.nav.about },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="w-full">
      <nav
        className="page-padding flex items-end justify-between py-6"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="text-h1 uppercase tracking-[0.2em]"
        >
          Jan Overhaus
        </Link>

        {/* Desktop Nav – normal case, Satoshi, small */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-nav tracking-wide transition-opacity ${
                  isActive(link.href) ? "opacity-100" : "opacity-50"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden page-padding pb-8 border-t border-primary/10"
        >
          <ul className="flex flex-col gap-6 pt-6" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm tracking-wide block transition-opacity hover:opacity-60 ${
                    isActive(link.href) ? "opacity-100" : "opacity-70"
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
