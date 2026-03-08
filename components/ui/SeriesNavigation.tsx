import Link from "next/link";
import type { Series } from "@/types";
import type { Dictionary, Locale } from "@/lib/i18n";

interface SeriesNavigationProps {
  prev: Series | null;
  next: Series | null;
  locale: Locale;
  dict: Dictionary["seriesNav"];
}

export default function SeriesNavigation({
  prev,
  next,
  locale,
  dict,
}: SeriesNavigationProps) {
  return (
    <nav
      className="page-padding py-10 border-t border-primary/10 flex justify-between items-start gap-8"
      aria-label={dict.ariaLabel}
    >
      {/* Previous */}
      {prev ? (
        <Link
          href={`/${locale}/series/${prev.slug}`}
          className="group flex flex-col gap-1.5 max-w-[45%]"
        >
          <span className="text-xs uppercase tracking-[0.15em] text-primary/40">
            {dict.previous}
          </span>
          <span className="text-h2 uppercase">{prev.title}</span>
        </Link>
      ) : (
        <div />
      )}

      {/* Next */}
      {next ? (
        <Link
          href={`/${locale}/series/${next.slug}`}
          className="group flex flex-col gap-1.5 text-right max-w-[45%] ml-auto"
        >
          <span className="text-xs uppercase tracking-[0.15em] text-primary/40">
            {dict.next}
          </span>
          <span className="text-h2 uppercase">{next.title}</span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
