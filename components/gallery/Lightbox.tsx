"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import type { Photo } from "@/types";

interface LightboxProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  photos,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const photo = photos[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  // Keyboard navigation
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    },
    [onClose, onPrev, onNext, hasPrev, hasNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    // Lock scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <div
      className="fixed inset-0 z-50 bg-background flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo lightbox"
    >
      {/* Close button */}
      <button
        className="absolute top-5 right-6 text-primary/40 hover:text-primary transition-colors text-sm uppercase tracking-widest"
        onClick={onClose}
        aria-label="Close"
      >
        Close
      </button>

      {/* Counter */}
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-primary/40 text-xs tracking-widest uppercase">
        {currentIndex + 1} / {photos.length}
      </p>

      {/* Prev */}
      {hasPrev && (
        <button
          className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary transition-colors px-3 py-6 text-xs tracking-widest uppercase"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous photo"
        >
          ←
        </button>
      )}

      {/* Next */}
      {hasNext && (
        <button
          className="absolute right-5 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary transition-colors px-3 py-6 text-xs tracking-widest uppercase"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next photo"
        >
          →
        </button>
      )}

      {/* Image – stopPropagation so clicking the image doesn't close */}
      <div
        className="relative max-h-[90vh] max-w-[90vw] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="max-h-[90vh] max-w-[90vw] w-auto h-auto object-contain"
          sizes="90vw"
          priority
        />
      </div>
    </div>
  );
}
