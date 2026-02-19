import { Box, Chip, Stack, Typography } from "@mui/material";

type ListingDetailHeaderProps = {
  price: string;
  location: string;
  listingType?: string | null;
};

function formatListingType(value?: string | null) {
  if (value === "for_sale") return "For Sale";
  if (value === "for_rent") return "For Rent";
  return "Listing";
}

export default function ListingDetailHeader({
  price,
  location,
  listingType,
}: ListingDetailHeaderProps) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", md: "center" }}
      spacing={1.2}
    >
      <Box>
        <Typography sx={{ fontSize: { xs: 24, md: 34 }, fontWeight: 800 }}>
          ${Number(price).toLocaleString("en-US")}
        </Typography>
        <Typography sx={{ mt: 0.4, color: "text.secondary", fontSize: 15 }}>
          {location}
        </Typography>
      </Box>
      <Chip
        label={formatListingType(listingType)}
        sx={{
          bgcolor: "rgba(183,142,121,0.18)",
          color: "primary.dark",
          fontWeight: 700,
        }}
      />
    </Stack>
  );
}
