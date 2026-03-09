"use client";

import type { ListingPhotoDto } from "@/api/listings";
import Image from "next/image";
import { useMemo, useState } from "react";

type GalleryProps = {
  images: ListingPhotoDto[];
  title: string;
};

function isValidImageUrl(url?: string | null): url is string {
  if (!url) return false;
  if (url.includes("images.example.com")) return false;
  return true;
}

export default function Gallery({ images, title }: GalleryProps) {
  const sortedImages = useMemo(
    () =>
      [...images]
        .filter((image) => isValidImageUrl(image.url))
        .sort(
          (a, b) => Number(Boolean(b.is_cover)) - Number(Boolean(a.is_cover)),
        ),
    [images],
  );
  const hasImages = sortedImages.length > 0;
  const hasSideImages = sortedImages.length > 1;
  const [activeIndex, setActiveIndex] = useState(0);
  const safeActiveIndex = hasImages ? activeIndex % sortedImages.length : 0;

  const activeImage = hasImages ? sortedImages[safeActiveIndex] : undefined;

  const handlePrev = () => {
    if (!hasImages) return;
    setActiveIndex(
      (prev) => (prev - 1 + sortedImages.length) % sortedImages.length,
    );
  };

  const handleNext = () => {
    if (!hasImages) return;
    setActiveIndex((prev) => (prev + 1) % sortedImages.length);
  };

  const sideImages = hasSideImages
    ? Array.from(
        { length: Math.min(4, sortedImages.length - 1) },
        (_, i) => sortedImages[(safeActiveIndex + i + 1) % sortedImages.length],
      )
    : [];

  return (
    <section
      style={{
        display: "grid",
        gap: 8,
        gridTemplateColumns: "1fr",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          borderRadius: 24,
          overflow: "hidden",
          height: "clamp(220px, 56vw, 560px)",
          maxHeight: 700,
          position: "relative",
        }}
      >
        {activeImage ? (
          <Image
            src={activeImage.url}
            alt={title}
            width={1400}
            height={900}
            quality={64}
            sizes="(max-width: 900px) 100vw, 68vw"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
              background: "rgba(15,23,42,0.06)",
            }}
          >
            <p style={{ color: "#5b6673", fontWeight: 600 }}>
              No image
            </p>
          </div>
        )}

        {hasSideImages && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(15,23,42,0.44)",
                color: "#fff",
                border: "none",
                borderRadius: 999,
                width: 40,
                height: 40,
                fontSize: 24,
                lineHeight: "40px",
                cursor: "pointer",
              }}
            >
              ‹
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(15,23,42,0.44)",
                color: "#fff",
                border: "none",
                borderRadius: 999,
                width: 40,
                height: 40,
                fontSize: 24,
                lineHeight: "40px",
                cursor: "pointer",
              }}
            >
              ›
            </button>
          </>
        )}
      </div>

      {hasSideImages && (
        <div
          style={{
            display: "grid",
            gap: 8,
            gridAutoFlow: "column",
            gridAutoColumns: "minmax(110px, 180px)",
            overflowX: "auto",
            paddingBottom: 4,
          }}
        >
          {sideImages.map((image) => (
            <button
              type="button"
              key={image.id}
              onClick={() => {
                const index = sortedImages.findIndex(
                  (item) => item.id === image.id,
                );
                if (index >= 0) setActiveIndex(index);
              }}
              style={{
                borderRadius: 18,
                overflow: "hidden",
                cursor: "pointer",
                opacity: 0.95,
                transition: "opacity 0.2s ease",
                border: "none",
                padding: 0,
                background: "transparent",
              }}
            >
              <Image
                src={image.url}
                alt={title}
                width={800}
                height={500}
                quality={56}
                sizes="(max-width: 900px) 50vw, 15vw"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
