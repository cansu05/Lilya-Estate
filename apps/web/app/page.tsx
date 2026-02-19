import { Box, Container } from "@mui/material";
import type { Metadata } from "next";
import { Suspense } from "react";
import FeaturedListingsSection from "./components/FeaturedListingsSection";
import FeaturedListingsSectionServer from "./components/FeaturedListingsSectionServer";
import FiltersPanel from "./components/FiltersPanel";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import PropertyTypeTiles from "./components/PropertyTypeTiles";
import RealEstateServicesSection from "./components/RealEstateServicesSection";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover refined living with curated properties, map-based search, and trusted real estate guidance.",
};

export default async function Home() {
  return (
    <Box>
      <Navbar />
      <Hero
        imageSrc="/assets/estate-hero.jpg"
        height={{ xs: 420, md: 800 }}
        alt="Estate Hero"
      />
      <Box sx={{ position: "relative", zIndex: 2, mt: { xs: -8, md: -12 } }}>
        <FiltersPanel />
      </Box>

      <Box
        sx={{
          mt: { xs: 4, md: 6 },
          display: "grid",
          gap: { xs: 4, md: 12 },
          pb: { xs: 4, md: 6 },
        }}
      >
        <PropertyTypeTiles />

        <Suspense
          fallback={
            <Container maxWidth="xl">
              <FeaturedListingsSection listings={[]} isLoading />
            </Container>
          }
        >
          <FeaturedListingsSectionServer />
        </Suspense>
        <RealEstateServicesSection />
      </Box>
    </Box>
  );
}
