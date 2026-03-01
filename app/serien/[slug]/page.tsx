import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Navigation from "@/components/navigation/Navigation";
import SeriesHeader from "@/components/ui/SeriesHeader";
import SeriesNavigation from "@/components/ui/SeriesNavigation";
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

        {/* Photo Grid – two explicit flex columns */}
        <section
          className="page-padding pb-16 flex flex-col lg:flex-row gap-6"
          aria-label={`${s.title} photographs`}
        >
          {/* Left column: even indices */}
          <div className="flex flex-col gap-6 lg:flex-1">
            {s.photos.filter((_, i) => i % 2 === 0).map((photo, i) => (
              <div key={photo.src} className="overflow-hidden bg-primary/5">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-auto block"
                  loading={i < 3 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>

          {/* Right column: odd indices */}
          <div className="flex flex-col gap-6 lg:flex-1">
            {s.photos.filter((_, i) => i % 2 !== 0).map((photo, i) => (
              <div key={photo.src} className="overflow-hidden bg-primary/5">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-auto block"
                  loading={i < 3 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Prev / Next Navigation */}
        <SeriesNavigation prev={prev} next={next} />
      </main>

      <Footer />
    </>
  );
}
