"use client";

import type { ListingItemDto } from "@/api/listings";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import FeaturedListingCard from "./FeaturedListingCard";
import FeaturedListingCardSkeleton from "./FeaturedListingCardSkeleton";
import SectionTitle from "./SectionTitle";

type FeaturedListingsSectionProps = {
  listings: ListingItemDto[];
  isLoading?: boolean;
};

export default function FeaturedListingsSection({
  listings,
  isLoading = false,
}: FeaturedListingsSectionProps) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const cardsPerPage = isLgUp ? 3 : isMdUp ? 2 : 1;

  const [startIndex, setStartIndex] = useState(0);

  const maxStartIndex = Math.max(listings.length - cardsPerPage, 0);
  const safeStartIndex = Math.min(startIndex, maxStartIndex);
  const visibleListings = listings.slice(
    safeStartIndex,
    safeStartIndex + cardsPerPage,
  );
  const skeletonCount = Math.max(cardsPerPage, 1);

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, maxStartIndex));
  };

  const handleBack = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <Box>
      <SectionTitle text="Exclusive Residences" />

      {isLoading ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(3, minmax(0, 1fr))",
            },
            gap: 4,
            pb: 0,
          }}
        >
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <FeaturedListingCardSkeleton key={index} />
          ))}
        </Box>
      ) : listings.length === 0 ? (
        <Typography sx={{ color: "text.secondary", pb: 0 }}>
          No featured listings found.
        </Typography>
      ) : (
        <>
          <Box sx={{ position: "relative", pb: 0 }}>
            {listings.length > cardsPerPage ? (
              <>
                <IconButton
                  onClick={handleBack}
                  disabled={safeStartIndex === 0}
                  sx={{
                    position: "absolute",
                    left: { xs: -6, md: -18 },
                    top: "42%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    color: "#fff",
                    bgcolor: "rgba(0,0,0,0.35)",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.5)" },
                    "&.Mui-disabled": { color: "rgba(255,255,255,0.4)" },
                  }}
                >
                  <KeyboardArrowLeft />
                </IconButton>
                <IconButton
                  onClick={handleNext}
                  disabled={safeStartIndex >= maxStartIndex}
                  sx={{
                    position: "absolute",
                    right: { xs: -6, md: -18 },
                    top: "42%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    color: "#fff",
                    bgcolor: "rgba(0,0,0,0.35)",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.5)" },
                    "&.Mui-disabled": { color: "rgba(255,255,255,0.4)" },
                  }}
                >
                  <KeyboardArrowRight />
                </IconButton>
              </>
            ) : null}

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "repeat(2, minmax(0, 1fr))",
                  lg: "repeat(3, minmax(0, 1fr))",
                },
                gap: 4,
                pb: 0,
              }}
            >
              {visibleListings.map((listing) => (
                <FeaturedListingCard key={listing.id} listing={listing} />
              ))}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
