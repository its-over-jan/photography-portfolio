import type { Series } from "@/types";

interface SeriesHeaderProps {
  series: Series;
}

export default function SeriesHeader({ series: s }: SeriesHeaderProps) {
  return (
    <div className="page-padding mt-10 pb-6 md:pb-10">
      <h1 className="text-h1 text-foreground">{s.title}</h1>
      <p className="text-h2 text-foreground/70 mt-1">{s.subtitle}</p>
    </div>
  );
}
