import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

// Cormorant Garamond – headings & logo (self-hosted via next/font)
const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jan Overhaus – Photography",
    template: "%s | Jan Overhaus",
  },
  description:
    "Analog and digital photography — Landscape, Street und Architecture.",
  openGraph: {
    title: "Jan Overhaus – Photography",
    description: "Analog and digital photography — Landscape, Street und Architecture.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={cormorantGaramond.variable}>
      <head>
        {/* Satoshi – body & navigation (Fontshare CDN) */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@1,700,500,400,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
