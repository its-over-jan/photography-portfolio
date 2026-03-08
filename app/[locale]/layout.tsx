import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import { siteUrl } from "@/lib/config";
import { getDictionary, locales, type Locale } from "@/lib/i18n";

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
});

const satoshi = localFont({
  src: "../../public/fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
  weight: "300 700",
});

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const ogLocale = locale === "de" ? "de_DE" : "en_US";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dict.metadata.title,
      template: "%s | Jan Overhaus",
    },
    description: dict.metadata.description,
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      url: siteUrl,
      siteName: "Jan Overhaus",
      type: "website",
      locale: ogLocale,
      images: [
        {
          url: "/images/street/street-06.jpg",
          width: 2000,
          height: 1333,
          alt: "Jan Overhaus Photography – Hamburg docks bridge with lone figure",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.title,
      description: dict.metadata.description,
    },
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <html
      lang={locale}
      className={`${cormorantGaramond.variable} ${satoshi.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
