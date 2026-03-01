"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { series } from "@/lib/series";

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    ...series.map((s) => ({ href: `/serien/${s.slug}`, label: s.title })),
    { href: "/about", label: "About" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="w-full">
      <nav
        className="page-padding flex items-end justify-between py-6"
        aria-label="Main navigation"
      >
        {/* Logo – Cormorant Garamond, ALL CAPS, spaced */}
        <Link
          href="/"
          className="font-heading text-5xl uppercase tracking-[0.2em] transition-opacity"
        >
          Jan Overhaus
        </Link>

        {/* Desktop Nav – normal case, Satoshi, small */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-base tracking-wide transition-opacity ${
                  isActive(link.href) ? "opacity-100" : "opacity-70"
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
          aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={menuOpen}
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
        <div className="md:hidden page-padding pb-8 border-t border-primary/10">
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
