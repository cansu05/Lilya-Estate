import { Box, Card, Skeleton } from "@mui/material";

export default function FeaturedListingCardSkeleton() {
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
      <Skeleton variant="rectangular" width="100%" height={350} />
      <Box sx={{ px: 3, py: 2 }}>
        <Skeleton variant="text" width="80%" height={38} />
        <Skeleton variant="text" width="60%" height={24} />
        <Skeleton variant="text" width="40%" height={40} sx={{ mt: 0.5 }} />
      </Box>
      <Box
        sx={{
          mt: 0.7,
          borderTop: "1px solid #efefef",
          px: 3,
          py: 3,
          display: "flex",
          gap: 1.2,
          flexWrap: "wrap",
        }}
      >
        <Skeleton variant="rounded" width={84} height={24} />
        <Skeleton variant="rounded" width={110} height={24} />
        <Skeleton variant="rounded" width={92} height={24} />
      </Box>
    </Card>
  );
}
