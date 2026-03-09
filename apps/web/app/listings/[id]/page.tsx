import { getListingById } from "@/api/listings";
import { ApiError } from "@/api/types";
import { Box, Container, Divider, Paper } from "@mui/material";
import { notFound } from "next/navigation";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";
import Gallery from "./_components/Gallery";
import ListingDetailHeader from "./_components/ListingDetailHeader";
import ListingDetailsStats from "./_components/ListingDetailsStats";

type ListingDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const { id } = await params;
  let listing;

  try {
    listing = await getListingById(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  return (
    <Box component="main">
      <Navbar />
      <Hero
        imageSrc="/assets/estate-hero.jpg"
        height={{ xs: 240, md: 320 }}
        alt={listing.title}
        overlayOpacity={0.62}
        quality={68}
        contentOffsetY="8%"
        title={listing.title}
        subtitle={listing.location}
      />

      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
        <Gallery images={listing.images} title={listing.title} />

        <Paper
          elevation={0}
          sx={{
            mt: 2.5,
            p: { xs: 2, md: 3 },
            borderRadius: 3,
            border: "1px solid rgba(15,23,42,0.08)",
          }}
        >
          <ListingDetailHeader
            price={listing.price}
            location={listing.location}
            listingType={listing.listing_type}
          />

          <Divider sx={{ my: 2 }} />
          <ListingDetailsStats listing={listing} />
        </Paper>
      </Container>
    </Box>
  );
}
