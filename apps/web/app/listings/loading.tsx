import { Box, Container, Skeleton } from "@mui/material";

export default function ListingsLoading() {
  return (
    <Container maxWidth="xl" sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 2, md: 3 } }}>
      <Skeleton variant="rounded" height={120} />
      <Skeleton variant="text" width={180} height={40} sx={{ mt: 2 }} />
      <Box
        sx={{
          mt: 2,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          },
          gap: 3,
        }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} variant="rounded" height={520} />
        ))}
      </Box>
    </Container>
  );
}
