import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import type { Metadata } from "next";
import Link from "next/link";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import SectionTitle from "../components/SectionTitle";

const coreValues = [
  {
    title: "Curated Quality",
    description:
      "We present properties that pass strict location, build quality, and value criteria.",
    icon: WorkspacePremiumRoundedIcon,
  },
  {
    title: "Market Clarity",
    description:
      "Clear pricing insights and data-backed comparisons help you make confident decisions.",
    icon: InsightsRoundedIcon,
  },
  {
    title: "Client-First Process",
    description:
      "From first call to closing day, we keep communication fast, transparent, and personal.",
    icon: Groups2RoundedIcon,
  },
];

const stats = [
  { label: "Properties Closed", value: "1,200+" },
  { label: "Active Buyers", value: "3,500+" },
  { label: "Cities Covered", value: "24" },
  { label: "Client Satisfaction", value: "98%" },
];

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Lilya Estate, our values, market approach, and premium real estate advisory services.",
};

export default function AboutPage() {
  return (
    <Box>
      <Navbar />
      <Hero
        imageSrc="/assets/estate-hero.jpg"
        height={{ xs: 240, md: 340 }}
        alt="About Lilya Estate"
        overlayOpacity={0.5}
        contentOffsetY="8%"
        title="About Lilya Estate"
        subtitle="A modern real estate team focused on premium homes, trusted guidance, and long-term value."
      />

      <Container maxWidth="xl" sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 2, md: 3 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.15fr 0.85fr" },
            gap: { xs: 2, md: 3 },
            alignItems: "stretch",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.2, md: 3 },
              borderRadius: 3,
              border: "1px solid rgba(15,23,42,0.08)",
              boxShadow: "0 12px 30px rgba(15, 23, 42, 0.041)",
            }}
          >
            <SectionTitle text="Who We Are" />
            <Typography sx={{ color: "text.secondary", lineHeight: 1.85, fontSize: 16 }}>
              Lilya Estate was built to simplify premium real estate decisions.
              We combine local neighborhood expertise, high-quality marketing, and
              disciplined advisory to help buyers, sellers, and investors move
              with confidence.
            </Typography>
            <Typography
              sx={{ mt: 1.2, color: "text.secondary", lineHeight: 1.85, fontSize: 16 }}
            >
              Our consultants specialize in residential and lifestyle properties,
              focusing on areas where long-term desirability and value retention
              are strongest.
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.2, md: 3 },
              borderRadius: 3,
              border: "1px solid rgba(15,23,42,0.08)",
              boxShadow: "0 12px 30px rgba(15, 23, 42, 0.041)",
              display: "grid",
              gap: 1.2,
              alignContent: "start",
            }}
          >
            <Typography sx={{ fontSize: 22, fontWeight: 800, color: "text.primary" }}>
              Why Clients Choose Us
            </Typography>
            <FeatureItem text="Verified portfolio with clear pricing strategy" />
            <FeatureItem text="Experienced support in buying, selling, and renting" />
            <FeatureItem text="Fast response and transparent communication" />
            <FeatureItem text="Neighborhood-level guidance, not generic listings" />
          </Paper>
        </Box>

        <Box sx={{ mt: { xs: 3, md: 4 } }}>
          <SectionTitle text="Our Core Values" />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
              gap: { xs: 2, md: 2.5 },
            }}
          >
            {coreValues.map((item) => {
              const Icon = item.icon;
              return (
                <Paper
                  key={item.title}
                  elevation={0}
                  sx={{
                    p: { xs: 2.2, md: 2.7 },
                    borderRadius: 3,
                    border: "1px solid rgba(15,23,42,0.08)",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(247,241,236,0.98) 100%)",
                    textAlign: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      bgcolor: "rgba(183,142,121,0.18)",
                      color: "primary.dark",
                      mx: "auto",
                      mb: 1.4,
                    }}
                  >
                    <Icon sx={{ fontSize: 26 }} />
                  </Box>
                  <Typography sx={{ fontSize: 21, fontWeight: 800, mb: 0.7 }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: "text.secondary", lineHeight: 1.7 }}>
                    {item.description}
                  </Typography>
                </Paper>
              );
            })}
          </Box>
        </Box>

        <Box sx={{ mt: { xs: 3, md: 4 } }}>
          <SectionTitle text="By The Numbers" />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: "repeat(4, minmax(0, 1fr))" },
              gap: 1.5,
            }}
          >
            {stats.map((item) => (
              <Paper
                key={item.label}
                elevation={0}
                sx={{
                  p: { xs: 2, md: 2.4 },
                  borderRadius: 2.6,
                  border: "1px solid rgba(145,159,144,0.35)",
                  bgcolor: "rgba(145,159,144,0.12)",
                  textAlign: "center",
                }}
              >
                <Typography sx={{ fontSize: { xs: 24, md: 30 }, fontWeight: 800 }}>
                  {item.value}
                </Typography>
                <Typography sx={{ color: "text.secondary", fontWeight: 600, mt: 0.3 }}>
                  {item.label}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>

        <Paper
          elevation={0}
          sx={{
            mt: { xs: 3, md: 4 },
            p: { xs: 2.4, md: 3 },
            borderRadius: 3,
            border: "1px solid rgba(15,23,42,0.08)",
            boxShadow: "0 12px 30px rgba(15, 23, 42, 0.041)",
            display: "grid",
            gap: 1.1,
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontSize: { xs: 26, md: 34 }, fontWeight: 800 }}>
            Ready To Find Your Next Property?
          </Typography>
          <Typography sx={{ color: "text.secondary", maxWidth: 760, mx: "auto" }}>
            Explore our current listings or speak with our team for a tailored
            recommendation based on your goals and budget.
          </Typography>
          <Box sx={{ mt: 1, display: "flex", justifyContent: "center", gap: 1.1, flexWrap: "wrap" }}>
            <Link href="/listings" style={{ textDecoration: "none" }}>
              <Button
                component="span"
                variant="contained"
                color="primary"
                sx={{ minHeight: 48, px: 3.2, fontWeight: 700 }}
                startIcon={<HomeWorkRoundedIcon />}
              >
                Browse Listings
              </Button>
            </Link>
            <Link href="/contact" style={{ textDecoration: "none" }}>
              <Button
                component="span"
                variant="outlined"
                color="primary"
                sx={{ minHeight: 48, px: 3.2, fontWeight: 700 }}
                startIcon={<PlaceRoundedIcon />}
              >
                Contact Us
              </Button>
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <CheckCircleOutlineRoundedIcon sx={{ color: "secondary.dark", fontSize: 20 }} />
      <Typography sx={{ color: "text.secondary" }}>{text}</Typography>
    </Box>
  );
}
