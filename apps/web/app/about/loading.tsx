import { Box, Container, Skeleton } from "@mui/material";

export default function AboutLoading() {
  return (
    <Container maxWidth="xl" sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 2, md: 3 } }}>
      <Skeleton variant="text" width={320} height={56} sx={{ mx: "auto" }} />
      <Box
        sx={{
          mt: 2,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1.15fr 0.85fr" },
          gap: 2,
        }}
      >
        <Skeleton variant="rounded" height={280} />
        <Skeleton variant="rounded" height={280} />
      </Box>
      <Box sx={{ mt: 2, display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 2 }}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} variant="rounded" height={220} />
        ))}
      </Box>
    </Container>
  );
}
