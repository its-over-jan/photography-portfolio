import type { Series } from "@/types";

interface SeriesHeaderProps {
  series: Series;
}

export default function SeriesHeader({ series: s }: SeriesHeaderProps) {
  return (
    <div className="page-padding mt-40 pb-6 md:pb-10">
      <h1 className="text-h2 text-foreground text-center uppercase">
        {s.title}
      </h1>
    </div>
  );
}
