import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import { Box, Card, Link as MuiLink, Typography } from "@mui/material";
import Link from "next/link";

type ListingCardProps = {
  id: number;
  title: string;
  price: string;
};

export default function ListingCard({ id, title, price }: ListingCardProps) {
  return (
    <Card
      component="article"
      variant="outlined"
      sx={{ borderRadius: 2, p: 2, borderColor: "divider" }}
    >
      <Typography sx={{ fontSize: 18, fontWeight: 700, color: "text.primary" }}>
        {title}
      </Typography>
      <Typography sx={{ mt: 1, color: "text.secondary" }}>
        ${Number(price).toLocaleString("en-US")}
      </Typography>
      <Box sx={{ mt: 1.5 }}>
        <MuiLink
          component={Link}
          href={`/listings/${id}`}
          underline="none"
          sx={{
            fontSize: 14,
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          View Details <NorthEastRoundedIcon sx={{ fontSize: 16 }} />
        </MuiLink>
      </Box>
    </Card>
  );
}
