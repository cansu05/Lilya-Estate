"use client";

import { Box, Button, Typography } from "@mui/material";

type ContactErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ContactError({ error, reset }: ContactErrorProps) {
  return (
    <Box sx={{ minHeight: "40vh", display: "grid", placeItems: "center", px: 2 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ fontWeight: 800, fontSize: 22 }}>
          Contact page failed to load
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
