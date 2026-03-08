import Link from "next/link";
import { series } from "@/lib/series";
import type { Dictionary, Locale } from "@/lib/i18n";
import NavigationClient from "./NavigationClient";

interface NavigationProps {
  locale: Locale;
  dict: Dictionary;
  /** href of the currently active page – used to highlight the active nav link */
  activeHref?: string;
}

export default function Navigation({
  locale,
  dict,
  activeHref = "",
}: NavigationProps) {
  const navLinks = [
    ...series.map((s) => ({
      href: `/${locale}/series/${s.slug}`,
      label: dict.series[s.slug as keyof typeof dict.series].title,
    })),
    { href: `/${locale}/about`, label: dict.nav.about },
  ];

  return (
    <NavigationClient
      logoHref={`/${locale}`}
      links={navLinks}
      activeHref={activeHref}
      dict={dict.nav}
    >
      {/* Desktop nav – rendered server-side, no JS bundle cost, no hydration */}
      <ul className="hidden md:flex items-center gap-8" role="list">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`text-nav tracking-wide transition-opacity ${
                activeHref === link.href ? "opacity-100" : "opacity-50"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </NavigationClient>
  );
}
