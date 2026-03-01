import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navigation from "@/components/navigation/Navigation";
import SeriesHeader from "@/components/ui/SeriesHeader";
import SeriesNavigation from "@/components/ui/SeriesNavigation";
import Gallery from "@/components/gallery/Gallery";
import Footer from "@/components/ui/Footer";
import { getSeriesBySlug, getAllSlugs, series } from "@/lib/series";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getSeriesBySlug(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.description,
    openGraph: {
      title: `${s.title} | Jan Overhaus`,
      description: s.description,
      images: [
        {
          url: s.heroImage.src,
          width: 2000,
          height: 1333,
          alt: s.heroImage.alt,
        },
      ],
    },
  };
}

export default async function SeriesPage({ params }: Props) {
  const { slug } = await params;
  const s = getSeriesBySlug(slug);
  if (!s) notFound();

  const currentIndex = series.findIndex((x) => x.slug === s.slug);
  const prev = currentIndex > 0 ? series[currentIndex - 1] : null;
  const next =
    currentIndex < series.length - 1 ? series[currentIndex + 1] : null;

  return (
    <>
      <Navigation />

      <main>
        {/* Title */}
        <SeriesHeader series={s} />

        {/* Gallery with built-in Lightbox */}
        <Gallery photos={s.photos} seriesTitle={s.title} />

        <SeriesNavigation prev={prev} next={next} />
      </main>

      <Footer />
    </>
  );
}
