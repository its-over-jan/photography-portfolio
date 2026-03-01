import type { Series } from "@/types";

/**
 * Static series configuration.
 * Photos are stored in public/images/{slug}/ and optimized via next/image.
 * Hero images are hand-picked from the Figma Hi-Fi design selection.
 */
export const series: Series[] = [
  {
    slug: "street",
    title: "Street",
    subtitle: "Urban Stories",
    description:
      "Cities breathe differently when you slow down. Street photography is the practice of patience — waiting for the moment when light, geometry, and human presence align into something worth keeping.",
    heroImage: {
      src: "/images/street/street-01.jpg",
      alt: "Berlin U-Bahn bridge with lone figure",
      width: 2000,
      height: 1333,
    },
    photos: Array.from({ length: 21 }, (_, i) => ({
      src: `/images/street/street-${String(i + 1).padStart(2, "0")}.jpg`,
      alt: `Street photograph ${i + 1}`,
      width: 2000,
      height: 1333,
    })),
  },
  {
    slug: "architecture",
    title: "Architecture",
    subtitle: "Form & Space",
    description:
      "Buildings are frozen ideas. Architecture photography is about finding the intentions hidden in concrete, glass, and steel — the way a facade catches morning light, the geometry of a stairwell, the humanity inside imposing structures.",
    heroImage: {
      src: "/images/architecture/architecture-12.jpg",
      alt: "Berlin government building with distinctive round window",
      width: 2000,
      height: 1333,
    },
    photos: Array.from({ length: 15 }, (_, i) => ({
      src: `/images/architecture/architecture-${String(i + 1).padStart(2, "0")}.jpg`,
      alt: `Architecture photograph ${i + 1}`,
      width: 2000,
      height: 1333,
    })),
  },
  {
    slug: "landscape",
    title: "Landscape",
    subtitle: "Nature & Light",
    description:
      "Where land meets sky — quiet moments captured in changing light. These images explore the tension between stillness and motion, between the analog grain of film and the clarity of digital.",
    heroImage: {
      src: "/images/landscape/landscape-13.jpg",
      alt: "Analog sea photograph with dramatic sky",
      width: 2000,
      height: 1333,
    },
    photos: Array.from({ length: 15 }, (_, i) => ({
      src: `/images/landscape/landscape-${String(i + 1).padStart(2, "0")}.jpg`,
      alt: `Landscape photograph ${i + 1}`,
      width: 2000,
      height: 1333,
    })),
  },
];

export function getSeriesBySlug(slug: string): Series | undefined {
  return series.find((s) => s.slug === slug);
}

export function getAllSlugs(): string[] {
  return series.map((s) => s.slug);
}
