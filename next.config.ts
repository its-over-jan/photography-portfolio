import type { NextConfig } from "next";

const securityHeaders = [
  // Verhindert MIME-Type-Sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Verhindert Clickjacking (kein Einbetten in iframes)
  { key: "X-Frame-Options", value: "DENY" },
  // Kontrolliert Referrer-Informationen
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Erzwingt HTTPS für 1 Jahr (inkl. Subdomains)
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  // Deaktiviert veraltete Browser-Features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // Content Security Policy – nur eigene Ressourcen, keine externen Abhängigkeiten
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'", // Next.js benötigt inline scripts
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self'",
      "img-src 'self' data: blob:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    // Enable WebP/AVIF conversion for local images
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
