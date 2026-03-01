/**
 * Site-wide configuration.
 * Set SITE_URL in your Vercel environment variables (or .env.local) before deployment.
 * Example: SITE_URL=https://janoverhaus.de
 */
export const siteUrl =
  process.env.SITE_URL?.replace(/\/$/, "") ?? "https://janoverhaus.com";

export const siteConfig = {
  name: "Jan Overhaus",
  description: "Photography by Jan Overhaus — Street, Architecture, Landscape.",
  url: siteUrl,
};
