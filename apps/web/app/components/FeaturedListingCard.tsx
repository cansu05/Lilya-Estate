import type { ListingItemDto } from "@/api/listings";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

type FeaturedListingCardProps = {
  listing: ListingItemDto;
  href?: string;
  priority?: boolean;
};

function hasValidImageUrl(coverPhotoUrl?: string | null): coverPhotoUrl is string {
  if (!coverPhotoUrl) return false;
  if (coverPhotoUrl.includes("images.example.com")) return false;
  return true;
}

export default function FeaturedListingCard({
  listing,
  href,
  priority = false,
}: FeaturedListingCardProps) {
  const {
    title,
    price,
    cover_photo_url,
    location,
    room_type,
    net_area,
    listing_type,
  } = listing;
  const parsedBeds =
    room_type === "studio" ? 1 : Number(String(room_type ?? "").split("+")[0]);
  const beds = Number.isFinite(parsedBeds) && parsedBeds > 0 ? parsedBeds : 2;
  const bathrooms = Math.max(1, beds - 1);
  const listingTypeLabel =
    listing_type === "for_rent"
      ? "FOR RENT"
      : listing_type === "for_sale"
        ? "FOR SALE"
        : "LISTING";

  return (
    <Card
      sx={{
        bgcolor: "#fff",
        borderRadius: 4,
        border: "1px solid #ececec",
        p: 0,
        position: "relative",
        boxShadow: "0 12px 30px rgba(15, 23, 42, 0.041)",
        overflow: "hidden",
      }}
    >
      <Box sx={{ borderRadius: 0, overflow: "hidden" }}>
        {hasValidImageUrl(cover_photo_url) ? (
          <Image
            src={cover_photo_url}
            alt={title}
            width={700}
            height={500}
            quality={68}
            priority={priority}
            sizes="(max-width: 900px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              width: "100%",
              height: 350,
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <Box
            sx={{
              height: 350,
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
        <Box
          sx={{
            position: "absolute",
            top: 20,
            right: 12,
            bgcolor: "rgba(15,23,42,0.78)",
            color: "#fff",
            px: 1.2,
            py: 0.5,
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          {listingTypeLabel}
        </Box>
      </Box>

      <Box sx={{ px: 3, py: 2 }}>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: 20,
            lineHeight: 1.3,
            color: "text.primary",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            mt: 0.8,
            color: "text.secondary",
            fontWeight: 500,
            fontSize: 14,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            pr: 7,
          }}
        >
          {location}
        </Typography>
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 800,
            lineHeight: 1,
            color: "text.primary",
            mt: 1.1,
          }}
        >
          ${Number(price).toLocaleString("en-US")}
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 0.7,
          borderTop: "1px solid #efefef",
          px: 3,
          pr: 10,
          py: 3,
          display: "flex",
          gap: 1.8,
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: "text.secondary",
          }}
        >
          <BedOutlinedIcon sx={{ fontSize: 18 }} />
          <Typography
            sx={{ fontSize: 14, color: "text.secondary", fontWeight: 600 }}
          >
            {beds} Beds
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: "text.secondary",
          }}
        >
          <BathtubOutlinedIcon sx={{ fontSize: 18 }} />
          <Typography
            sx={{ fontSize: 14, color: "text.secondary", fontWeight: 600 }}
          >
            {bathrooms} Bathrooms
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: "text.secondary",
          }}
        >
          <SquareFootOutlinedIcon sx={{ fontSize: 18 }} />
          <Typography
            sx={{ fontSize: 14, color: "text.secondary", fontWeight: 600 }}
          >
            {net_area} m²
          </Typography>
        </Box>
      </Box>

      <Link
        aria-label="Open listing"
        href={href ?? `/listings/${listing.id}`}
        style={{
          position: "absolute",
          right: 14,
          bottom: 14,
          width: 52,
          height: 52,
          borderRadius: "50%",
          backgroundColor: "#9aa99e",
          color: "#fff",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.171)",
          display: "grid",
          placeItems: "center",
          textDecoration: "none",
        }}
      >
        <NorthEastRoundedIcon />
      </Link>
    </Card>
  );
}
