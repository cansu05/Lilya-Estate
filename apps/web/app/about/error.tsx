"use client";

import { Box, Button, Typography } from "@mui/material";

type AboutErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AboutError({ error, reset }: AboutErrorProps) {
  return (
    <Box sx={{ minHeight: "40vh", display: "grid", placeItems: "center", px: 2 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ fontWeight: 800, fontSize: 22 }}>
          About page failed to load
        </Typography>
        <Typography sx={{ mt: 0.6, color: "text.secondary" }}>
          {error.message || "Please try again."}
        </Typography>
        <Button sx={{ mt: 1.4 }} variant="contained" onClick={reset}>
          Retry
        </Button>
      </Box>
    </Box>
  );
}
