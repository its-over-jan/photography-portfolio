import Navigation from "@/components/navigation/Navigation";
import SeriesCard from "@/components/ui/SeriesCard";
import Footer from "@/components/ui/Footer";
import { series } from "@/lib/series";

export default function HomePage() {
  return (
    <>
      <Navigation />

      <main className="pt-10">
        <section
          aria-label="Photography series"
          className="flex flex-col gap-10"
        >
          {series.map((s, i) => (
            <SeriesCard key={s.slug} series={s} priority={i < 2} />
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}
