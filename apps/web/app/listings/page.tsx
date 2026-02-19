import { getListings } from "@/api/listings";
import { Box, Container, Typography } from "@mui/material";
import type { Metadata } from "next";
import { parseListingsFilters } from "@repo/shared";
import FeaturedListingCard from "../components/FeaturedListingCard";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Filters from "./_components/Filters";
import ListingsPagination from "./_components/ListingsPagination";

type ListingsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = {
  title: "All Listings",
  description:
    "Browse all available properties with city, district, neighborhood, price, and type filters.",
};

export default async function ListingsPage({
  searchParams,
}: ListingsPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const sanitizedInput = Object.fromEntries(
    Object.entries(resolvedSearchParams).filter(
      ([, value]) => typeof value === "string",
    ),
  );
  const filtersKey = JSON.stringify(sanitizedInput);
  const parsedFilters = parseListingsFilters(sanitizedInput);
  const filters = parsedFilters.success ? parsedFilters.data : undefined;

  let response = {
    page: filters?.page ?? 1,
    limit: filters?.limit ?? 9,
    total: 0,
    totalPages: 1,
    items: [] as Awaited<ReturnType<typeof getListings>>["items"],
  };
  let hasFetchError = false;
  const listingsResult = await Promise.allSettled([
    getListings({
      page: filters?.page ?? 1,
      limit: filters?.limit ?? 9,
      cityId: filters?.cityId,
      districtId: filters?.districtId,
      neighborhoodId: filters?.neighborhoodId,
      minPrice: filters?.minPrice,
      maxPrice: filters?.maxPrice,
      listingType: filters?.listingType,
      propertyType: filters?.propertyType,
      roomType: filters?.roomType,
    }),
  ]);

  if (listingsResult[0].status === "fulfilled") {
    response = listingsResult[0].value;
  } else {
    hasFetchError = true;
    console.error("Listings fetch failed on server:", listingsResult[0].reason);
  }

  return (
    <Box>
      <Navbar />
      <Hero
        imageSrc="/assets/estate-hero.jpg"
        height={{ xs: 240, md: 320 }}
        alt="All properties hero"
        overlayOpacity={0.45}
        contentOffsetY="8%"
        title="All Properties"
        subtitle="Browse our curated portfolio and find the right place for your lifestyle."
      />
      <Container
        maxWidth="xl"
        sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 1, md: 1.5 } }}
      >
        <Filters key={filtersKey} />
        {hasFetchError ? (
          <Box
            sx={{
              mt: { xs: 2, md: 3 },
              borderRadius: 2,
              border: "1px solid rgba(183,142,121,0.35)",
              bgcolor: "rgba(183,142,121,0.12)",
              px: 2,
              py: 1.4,
            }}
          >
            <Typography sx={{ color: "primary.dark", fontWeight: 700 }}>
              Listings could not be loaded right now. Please try again.
            </Typography>
          </Box>
        ) : null}

        <Typography
          component="div"
          aria-live="polite"
          sx={{
            mt: { xs: 2, md: 3 },
            mb: { xs: 1, md: 1.5 },
            color: "text.secondary",
            fontWeight: 600,
          }}
        >
          {response.items.length} result{response.items.length === 1 ? "" : "s"}{" "}
          found
        </Typography>

        {!hasFetchError && response.items.length === 0 ? (
          <Box
            sx={{
              borderRadius: 2.5,
              border: "1px solid rgba(145,159,144,0.35)",
              bgcolor: "rgba(145,159,144,0.14)",
              px: { xs: 2, md: 2.5 },
              py: { xs: 1.4, md: 1.6 },
            }}
          >
            <Typography sx={{ color: "secondary.dark", fontWeight: 700 }}>
              No listings found for the selected filters.
            </Typography>
            <Typography sx={{ color: "text.secondary", mt: 0.4, fontSize: 14 }}>
              Try widening location or price range to see more options.
            </Typography>
          </Box>
        ) : null}

        <Box
          component="section"
          sx={{
            mt: { xs: 2, md: 3 },
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(3, minmax(0, 1fr))",
            },
            gap: 3,
          }}
        >
          {response.items.map((listing) => (
            <FeaturedListingCard key={listing.id} listing={listing} />
          ))}
        </Box>

        {!hasFetchError && response.items.length > 0 ? (
          <Box
            sx={{
              mt: { xs: 2.5, md: 3 },
              py: { xs: 1.5, md: 2.2 },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ListingsPagination
              page={response.page}
              totalPages={response.totalPages}
              searchParams={resolvedSearchParams}
            />
          </Box>
        ) : null}
      </Container>
    </Box>
  );
}
