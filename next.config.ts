import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Enable WebP/AVIF conversion for local images
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
