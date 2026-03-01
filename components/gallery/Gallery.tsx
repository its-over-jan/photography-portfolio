"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";
import type { Photo } from "@/types";

interface GalleryProps {
  photos: Photo[];
  seriesTitle: string;
}

export default function Gallery({ photos, seriesTitle }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const open = useCallback((index: number) => setSelectedIndex(index), []);
  const close = useCallback(() => setSelectedIndex(null), []);
  const prev = useCallback(
    () => setSelectedIndex((i) => (i !== null && i > 0 ? i - 1 : i)),
    []
  );
  const next = useCallback(
    () =>
      setSelectedIndex((i) =>
        i !== null && i < photos.length - 1 ? i + 1 : i
      ),
    [photos.length]
  );

  // Two explicit columns: even indices left, odd indices right
  const leftPhotos = photos.filter((_, i) => i % 2 === 0);
  const rightPhotos = photos.filter((_, i) => i % 2 !== 0);

  const renderPhoto = (photo: Photo, originalIndex: number, eagerCount: number, colIndex: number) => (
    <button
      key={photo.src}
      className="block w-full text-left overflow-hidden bg-primary/5 cursor-zoom-in"
      onClick={() => open(originalIndex)}
      aria-label={`Open ${seriesTitle} photo ${originalIndex + 1}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="w-full h-auto block transition-opacity duration-300 hover:opacity-90"
        loading={colIndex < eagerCount ? "eager" : "lazy"}
        placeholder={photo.blurDataURL ? "blur" : "empty"}
        blurDataURL={photo.blurDataURL}
      />
    </button>
  );

  return (
    <>
      <section
        className="page-padding pb-16 flex flex-col lg:flex-row gap-6"
        aria-label={`${seriesTitle} photographs`}
      >
        {/* Left column */}
        <div className="flex flex-col gap-6 lg:flex-1">
          {leftPhotos.map((photo, colIndex) => {
            const originalIndex = colIndex * 2;
            return renderPhoto(photo, originalIndex, 3, colIndex);
          })}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6 lg:flex-1">
          {rightPhotos.map((photo, colIndex) => {
            const originalIndex = colIndex * 2 + 1;
            return renderPhoto(photo, originalIndex, 3, colIndex);
          })}
        </div>
      </section>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <Lightbox
          photos={photos}
          currentIndex={selectedIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}
