import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navigation from "@/components/navigation/Navigation";
import SeriesHeader from "@/components/ui/SeriesHeader";
import SeriesNavigation from "@/components/ui/SeriesNavigation";
import Gallery from "@/components/gallery/Gallery";
import Footer from "@/components/ui/Footer";
import { getSeriesBySlug, getAllSlugs, series } from "@/lib/series";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/config";

interface Props {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllSlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const s = getSeriesBySlug(slug);
  if (!s) return {};
  const dict = getDictionary(locale);
  const seriesDict = dict.series[slug as keyof typeof dict.series];
  if (!seriesDict) return {};

  return {
    title: seriesDict.title,
    description: seriesDict.description,
    alternates: {
      canonical: `${siteUrl}/${locale}/series/${slug}`,
      languages: {
        en: `${siteUrl}/en/series/${slug}`,
        de: `${siteUrl}/de/series/${slug}`,
        "x-default": `${siteUrl}/en/series/${slug}`,
      },
    },
    openGraph: {
      title: `${seriesDict.title} | Jan Overhaus`,
      description: seriesDict.description,
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
  const { locale, slug } = await params;
  const s = getSeriesBySlug(slug);
  if (!s) notFound();

  const dict = getDictionary(locale);
  const seriesDict = dict.series[slug as keyof typeof dict.series];
  const localizedS = { ...s, ...seriesDict };

  const currentIndex = series.findIndex((x) => x.slug === s.slug);
  const prevRaw = currentIndex > 0 ? series[currentIndex - 1] : null;
  const nextRaw =
    currentIndex < series.length - 1 ? series[currentIndex + 1] : null;

  const localizedPrev = prevRaw
    ? { ...prevRaw, ...dict.series[prevRaw.slug as keyof typeof dict.series] }
    : null;
  const localizedNext = nextRaw
    ? { ...nextRaw, ...dict.series[nextRaw.slug as keyof typeof dict.series] }
    : null;

  return (
    <>
      <Navigation locale={locale} dict={dict} />

      <main>
        <SeriesHeader series={localizedS} />
        <Gallery photos={s.photos} seriesTitle={localizedS.title} dict={dict.lightbox} />
        <SeriesNavigation
          prev={localizedPrev}
          next={localizedNext}
          locale={locale}
          dict={dict.seriesNav}
        />
      </main>

      <Footer />
    </>
  );
}
