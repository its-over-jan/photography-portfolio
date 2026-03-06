import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { siteUrl } from "@/lib/config";

// Cormorant Garamond – headings & logo (self-hosted via next/font/google)
const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
});

// Satoshi – body & navigation (self-hosted via next/font/local)
const satoshi = localFont({
  src: "../public/fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
  // Variable font: Achsenbereich für weight (300–700)
  weight: "300 700",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jan Overhaus – Photography",
    template: "%s | Jan Overhaus",
  },
  description:
    "Analog and digital photography — Landscape, Street und Architecture.",
  openGraph: {
    title: "Jan Overhaus – Photography",
    description:
      "Analog and digital photography — Landscape, Street und Architecture.",
    url: siteUrl,
    siteName: "Jan Overhaus",
    type: "website",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jan Overhaus – Photography",
    description:
      "Analog and digital photography — Landscape, Street und Architecture.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${cormorantGaramond.variable} ${satoshi.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
