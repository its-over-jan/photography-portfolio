import Image from "next/image";
import Link from "next/link";
import type { Series } from "@/types";

interface SeriesCardProps {
  series: Series;
  priority?: boolean;
}

/**
 * SeriesCard – Home Page
 *
 * Entspricht der Figma-Komponente "Series Card".
 * Zeigt Hero-Bild der Serie mit Titel
 * Volle Breite minus page-padding, landscape 16:9.
 */
export default function SeriesCard({
  series: s,
  priority = false,
}: SeriesCardProps) {
  return (
    <Link
      href={`/serien/${s.slug}`}
      className="group block page-padding"
      aria-label={`${s.title} – ${s.subtitle}`}
    >
      {/* Image */}
      <div className="relative w-full aspect-video overflow-hidden bg-primary/5 max-h-150">
        <Image
          src={s.heroImage.src}
          alt={s.heroImage.alt}
          fill
          sizes="(max-width: 768px) calc(100vw - 40px), calc(100vw - 96px)"
          className="object-cover"
          priority={priority}
          placeholder={s.heroImage.blurDataURL ? "blur" : "empty"}
          blurDataURL={s.heroImage.blurDataURL}
        />
      </div>

      {/* Label below image */}
      <div className="flex items-end mt-3">
        <h2 className="text-h2 uppercase">{s.title}</h2>
      </div>
    </Link>
  );
}
