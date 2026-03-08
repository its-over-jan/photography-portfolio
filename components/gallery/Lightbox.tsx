"use client";

import { useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import type { Photo } from "@/types";
import type { Dictionary } from "@/lib/i18n";

interface LightboxProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  dict: Dictionary["lightbox"];
}

export default function Lightbox({
  photos,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  dict,
}: LightboxProps) {
  const photo = photos[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;
  const touchStartX = useRef<number | null>(null);

  // Keyboard navigation
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    },
    [onClose, onPrev, onNext, hasPrev, hasNext],
  );

  // Swipe navigation – nur Single-Touch, Multi-Touch (Pinch-to-Zoom) wird ignoriert
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      // Multi-Touch-Ende (z.B. zweiter Finger loslassen): abbrechen
      if (e.touches.length > 0) {
        touchStartX.current = null;
        return;
      }
      const delta = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(delta) > 50) {
        if (delta < 0 && hasNext) onNext();
        if (delta > 0 && hasPrev) onPrev();
      }
      touchStartX.current = null;
    },
    [hasPrev, hasNext, onPrev, onNext],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
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
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label={dict.ariaClose}
    >
      {/* Close button */}
      <button
        className="absolute top-5 right-6 text-primary/40 hover:text-primary transition-colors text-sm uppercase tracking-widest z-10"
        onClick={onClose}
        aria-label={dict.ariaClose}
      >
        {dict.close}
      </button>

      {/* Counter */}
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-primary/40 text-xs tracking-widest uppercase z-10">
        {currentIndex + 1} / {photos.length}
      </p>

      {/* Prev – full-height side panel */}
      <button
        className="absolute left-0 top-0 h-full w-20 md:w-32 flex items-center justify-center text-primary/20 hover:text-primary transition-colors z-10 disabled:opacity-0 disabled:pointer-events-none"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        disabled={!hasPrev}
        aria-label={dict.ariaPrev}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Next – full-height side panel */}
      <button
        className="absolute right-0 top-14 bottom-0 w-20 md:w-32 flex items-center justify-center text-primary/20 hover:text-primary transition-colors z-10 disabled:opacity-0 disabled:pointer-events-none"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        disabled={!hasNext}
        aria-label={dict.ariaNext}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

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
