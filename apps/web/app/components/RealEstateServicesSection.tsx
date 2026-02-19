"use client";

import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import { Box, Container, Paper, Typography } from "@mui/material";
import SectionTitle from "./SectionTitle";

const serviceItems = [
  {
    title: "Buy",
    description:
      "Discover curated homes in top neighborhoods with transparent pricing and expert guidance.",
    icon: HomeWorkRoundedIcon,
  },
  {
    title: "Sell",
    description:
      "Get strategic positioning, market-driven valuation, and a smooth end-to-end selling process.",
    icon: CurrencyExchangeRoundedIcon,
  },
  {
    title: "Rent",
    description:
      "Explore quality rentals for every lifestyle, from city apartments to spacious family homes.",
    icon: KeyRoundedIcon,
  },
];

export default function RealEstateServicesSection() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ textAlign: "center", mb: { xs: 1.5, md: 2.5 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            "& .MuiTypography-root": { mb: 0.75 },
          }}
        >
          <SectionTitle text="For All Your Luxury Real Estate Needs" />
        </Box>
        <Typography
          sx={{
            fontSize: { xs: 14, md: 20 },
            color: "text.secondary",
            mx: "auto",
          }}
        >
          From buying your dream home to selling or renting with confidence, we
          provide trusted support at every step.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
          gap: { xs: 2, md: 2.5 },
        }}
      >
        {serviceItems.map((item) => {
          const Icon = item.icon;
          return (
            <Paper
              key={item.title}
              elevation={0}
              sx={{
                p: { xs: 2.2, md: 2.8 },
                borderRadius: 3,
                boxShadow: "0 12px 30px rgba(15, 23, 42, 0.041)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(247,241,236,0.98) 100%)",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  bgcolor: "rgba(183,142,121,0.16)",
                  color: "primary.dark",
                  mb: 1.6,
                  mx: "auto",
                }}
              >
                <Icon sx={{ fontSize: 28 }} />
              </Box>

              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "text.primary",
                  mb: 0.6,
                }}
              >
                {item.title}
              </Typography>
              <Typography
                sx={{ fontSize: 16, color: "text.secondary", lineHeight: 1.6 }}
              >
                {item.description}
              </Typography>
            </Paper>
          );
        })}
      </Box>
    </Container>
  );
}
