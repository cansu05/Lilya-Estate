import { Box, Container, Skeleton } from "@mui/material";
import FeaturedListingCardSkeleton from "./components/FeaturedListingCardSkeleton";

export default function Loading() {
  return (
    <Box>
      <Box
        sx={{
          height: { xs: 72, md: 88 },
          px: { xs: 2, md: 4 },
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid rgba(15,23,42,0.08)",
        }}
      >
        <Skeleton variant="text" width={180} height={36} />
      </Box>

      <Skeleton variant="rectangular" width="100%" height={520} />

      <Box sx={{ position: "relative", zIndex: 2, mt: { xs: -8, md: -12 } }}>
        <Container maxWidth="xl" sx={{ py: { xs: 1.5, md: 3 } }}>
          <Box
            sx={{
              p: { xs: 1.5, md: 3 },
              borderRadius: { xs: 2, md: 3 },
              bgcolor: "rgba(255, 255, 255, 0.92)",
              boxShadow: "0 12px 30px rgba(15, 23, 42, 0.041)",
              display: "grid",
              gap: { xs: 1.25, md: 2 },
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "repeat(2, minmax(0, 1fr))",
                lg: "repeat(4, minmax(0, 1fr)) auto auto",
              },
            }}
          >
            <Skeleton variant="rounded" height={56} />
            <Skeleton variant="rounded" height={56} />
            <Skeleton variant="rounded" height={56} />
            <Skeleton variant="rounded" height={56} />
            <Skeleton variant="rounded" height={56} />
            <Skeleton variant="rounded" height={56} />
          </Box>
        </Container>
      </Box>

      <Box
        sx={{
          mt: { xs: 4, md: 6 },
          display: "grid",
          gap: { xs: 4, md: 6 },
          pb: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="xl">
          <Skeleton
            variant="text"
            width={320}
            height={52}
            sx={{ mx: "auto", mb: { xs: 1.5, md: 2.5 } }}
          />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, minmax(0, 1fr))",
                lg: "repeat(3, minmax(0, 1fr))",
              },
              gap: 4,
            }}
          >
            {Array.from({ length: 3 }).map((_, index) => (
              <FeaturedListingCardSkeleton key={index} />
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
