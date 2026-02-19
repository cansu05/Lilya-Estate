"use client";

import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import CottageRoundedIcon from "@mui/icons-material/CottageRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LandscapeRoundedIcon from "@mui/icons-material/LandscapeRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import { Box, Container, Link, Typography } from "@mui/material";
import { propertyTypeOptions } from "@repo/shared";
import NextLink from "next/link";
import SectionTitle from "./SectionTitle";

const iconByType: Record<string, typeof HomeRoundedIcon> = {
  apartment: ApartmentRoundedIcon,
  house: HomeRoundedIcon,
  villa: CottageRoundedIcon,
  land: LandscapeRoundedIcon,
  office: BusinessRoundedIcon,
  shop: StorefrontRoundedIcon,
};

export default function PropertyTypeTiles() {
  return (
    <Container maxWidth="xl">
      <SectionTitle text="Are You Looking For" />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            sm: "repeat(3, minmax(0, 1fr))",
            md: "repeat(6, minmax(0, 1fr))",
          },
          gap: { xs: 1, md: 1.5 },
        }}
      >
        {propertyTypeOptions.map((option) => {
          const Icon = iconByType[option.value] ?? HomeRoundedIcon;

          return (
            <Link
              key={option.value}
              component={NextLink}
              href={`/listings?propertyType=${option.value}`}
              underline="none"
              color="inherit"
              sx={{ display: "block" }}
            >
              <Box
                sx={{
                  borderRadius: 2.5,
                  border: "1px solid rgba(183,142,121,0.2)",
                  bgcolor: "background.paper",
                  p: { xs: 1.2, md: 1.6 },
                  minHeight: { xs: 100, md: 120 },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.041)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 24px rgba(15,23,42,0.09)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: { xs: 38, md: 46 },
                    height: { xs: 38, md: 46 },
                    borderRadius: "50%",
                    bgcolor: "rgba(183,142,121,0.12)",
                    color: "primary.dark",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Icon sx={{ fontSize: { xs: 21, md: 24 } }} />
                </Box>

                <Typography
                  sx={{
                    fontSize: { xs: 13, md: 14 },
                    fontWeight: 700,
                    color: "text.primary",
                    textAlign: "center",
                  }}
                >
                  {option.label}
                </Typography>
              </Box>
            </Link>
          );
        })}
      </Box>
    </Container>
  );
}
