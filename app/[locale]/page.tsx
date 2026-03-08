import Navigation from "@/components/navigation/Navigation";
import SeriesCard from "@/components/ui/SeriesCard";
import Footer from "@/components/ui/Footer";
import { series } from "@/lib/series";
import { getDictionary, type Locale } from "@/lib/i18n";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const localizedSeries = series.map((s) => ({
    ...s,
    ...dict.series[s.slug as keyof typeof dict.series],
  }));

  return (
    <>
      <Navigation locale={locale} dict={dict} />

      <main className="pt-10">
        <section
          aria-label={dict.home.seriesLabel}
          className="flex flex-col gap-10"
        >
          {localizedSeries.map((s, i) => (
            <SeriesCard key={s.slug} series={s} priority={i < 2} locale={locale} />
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}
