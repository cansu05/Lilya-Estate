import { getListings, type ListingItemDto } from "@/api/listings";
import { Container } from "@mui/material";
import FeaturedListingsSection from "./FeaturedListingsSection";

export default async function FeaturedListingsSectionServer() {
  let listings: ListingItemDto[] = [];

  try {
    const response = await getListings({ page: 1, limit: 5 });
    listings = response.items;
  } catch (error) {
    console.error("Failed to fetch featured listings on server:", error);
  }

  return (
    <Container maxWidth="xl">
      <FeaturedListingsSection listings={listings} />
    </Container>
  );
}
