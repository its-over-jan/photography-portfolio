import Link from "next/link";
import type { Series } from "@/types";

interface SeriesNavigationProps {
  prev: Series | null;
  next: Series | null;
}

/**
 * SeriesNavigation – Serien-Seite
 *
 * Entspricht der Figma-Komponente "Series Navigation".
 * Zeigt vorherige und nächste Serie als anklickbare Blöcke.
 * Boolean-Props: prev/next können null sein (erste/letzte Serie).
 */
export default function SeriesNavigation({
  prev,
  next,
}: SeriesNavigationProps) {
  return (
    <nav
      className="page-padding py-10 border-t border-primary/10 flex justify-between items-start gap-8"
      aria-label="Serien-Navigation"
    >
      {/* Previous */}
      {prev ? (
        <Link
          href={`/series/${prev.slug}`}
          className="group flex flex-col gap-1.5 max-w-[45%]"
        >
          <span className="text-xs uppercase tracking-[0.15em] text-primary/40">
            ← Previous
          </span>
          <span className="text-h2 uppercase">{prev.title}</span>
        </Link>
      ) : (
        <div />
      )}

      {/* Next */}
      {next ? (
        <Link
          href={`/series/${next.slug}`}
          className="group flex flex-col gap-1.5 text-right max-w-[45%] ml-auto"
        >
          <span className="text-xs uppercase tracking-[0.15em] text-primary/40">
            Next →
          </span>
          <span className="text-h2 uppercase">{next.title}</span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
