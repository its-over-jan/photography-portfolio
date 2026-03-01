export type SeriesSlug = "street" | "architecture" | "landscape";

export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Series {
  slug: SeriesSlug;
  title: string;
  subtitle: string;
  description: string;
  heroImage: Photo;
  photos: Photo[];
}
