"use client";

import type { ListingPhotoDto } from "@/api/listings";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Box, IconButton, Typography } from "@mui/material";
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
    <Box
      component="section"
      sx={{
        display: "grid",
        gap: 1,
        gridTemplateColumns: {
          xs: "1fr",
          md: hasSideImages ? "1.45fr 1fr" : "1fr",
        },
        maxWidth: 1200,
        mx: "auto",
      }}
    >
      <Box
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          height: { xs: 200, md: 700 },
          maxHeight: { xs: 220, md: 800 },
          position: "relative",
        }}
      >
        {activeImage ? (
          <Image
            src={activeImage.url}
            alt={title}
            width={1400}
            height={900}
            sizes="(max-width: 900px) 100vw, 70vw"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            priority
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
              bgcolor: "rgba(15,23,42,0.06)",
            }}
          >
            <Typography sx={{ color: "text.secondary", fontWeight: 600 }}>
              No image
            </Typography>
          </Box>
        )}

        {hasSideImages && (
          <>
            <IconButton
              onClick={handlePrev}
              aria-label="Previous image"
              sx={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(15,23,42,0.44)",
                color: "#fff",
                "&:hover": { bgcolor: "rgba(15,23,42,0.64)" },
              }}
            >
              <ChevronLeftRoundedIcon />
            </IconButton>
            <IconButton
              onClick={handleNext}
              aria-label="Next image"
              sx={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(15,23,42,0.44)",
                color: "#fff",
                "&:hover": { bgcolor: "rgba(15,23,42,0.64)" },
              }}
            >
              <ChevronRightRoundedIcon />
            </IconButton>
          </>
        )}
      </Box>

      {hasSideImages && (
        <Box
          sx={{
            display: "grid",
            gap: 1,
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0,1fr))",
              md: "repeat(2, minmax(0,1fr))",
            },
            gridTemplateRows: { md: "repeat(2, minmax(0,1fr))" },
            gridAutoRows: { xs: 92 },
            height: { md: 700 },
            maxHeight: { md: 800 },
          }}
        >
          {sideImages.map((image) => (
            <Box
              key={image.id}
              onClick={() => {
                const index = sortedImages.findIndex(
                  (item) => item.id === image.id,
                );
                if (index >= 0) setActiveIndex(index);
              }}
              sx={{
                borderRadius: 2.2,
                overflow: "hidden",
                cursor: "pointer",
                opacity: 0.95,
                transition: "opacity 0.2s ease",
                "&:hover": { opacity: 1 },
              }}
            >
              <Image
                src={image.url}
                alt={title}
                width={800}
                height={500}
                sizes="(max-width: 900px) 50vw, 15vw"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
