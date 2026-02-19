"use client";

import { Box, Button, Typography } from "@mui/material";

type ListingsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ListingsError({ error, reset }: ListingsErrorProps) {
  return (
    <Box
      sx={{
        minHeight: "50vh",
        display: "grid",
        placeItems: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          borderRadius: 2.5,
          border: "1px solid rgba(183,142,121,0.35)",
          bgcolor: "rgba(183,142,121,0.12)",
          px: { xs: 2, md: 3 },
          py: { xs: 2, md: 2.5 },
          maxWidth: 560,
        }}
      >
        <Typography sx={{ fontWeight: 800, fontSize: 20, color: "text.primary" }}>
          Listings could not be loaded
        </Typography>
        <Typography sx={{ mt: 0.7, color: "text.secondary" }}>
          {error.message || "An unexpected error occurred."}
        </Typography>
        <Button sx={{ mt: 1.6 }} variant="contained" onClick={reset}>
          Try Again
        </Button>
      </Box>
    </Box>
  );
}
