import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import type { Metadata } from "next";
import Link from "next/link";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import SectionTitle from "../components/SectionTitle";

const contactCards = [
  {
    title: "Phone",
    value: "+90 (555) 000 00 00",
    hint: "Mon - Sat, 09:00 - 19:00",
    icon: LocalPhoneRoundedIcon,
    href: "tel:+905550000000",
  },
  {
    title: "Email",
    value: "hello@lilyaestate.com",
    hint: "We reply within 24 hours",
    icon: EmailRoundedIcon,
    href: "mailto:hello@lilyaestate.com",
  },
  {
    title: "Office",
    value: "Nisantasi, Istanbul",
    hint: "By appointment only",
    icon: PlaceRoundedIcon,
    href: "https://maps.google.com",
  },
];

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Lilya Estate for buying, selling, and renting support. Reach us by phone, email, or office appointment.",
};

export default function ContactPage() {
  return (
    <Box>
      <Navbar />
      <Hero
        imageSrc="/assets/estate-hero.jpg"
        height={{ xs: 240, md: 340 }}
        alt="Contact Lilya Estate"
        overlayOpacity={0.5}
        contentOffsetY="8%"
        title="Contact Lilya Estate"
        subtitle="Tell us what you are looking for. Our advisors will get back quickly with relevant options."
      />

      <Container maxWidth="xl" sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 2, md: 3 } }}>
        <SectionTitle text="Let's Talk About Your Next Move" />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
            gap: { xs: 1.6, md: 2.2 },
          }}
        >
          {contactCards.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.title} href={item.href} style={{ textDecoration: "none" }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2, md: 2.4 },
                    borderRadius: 2.8,
                    border: "1px solid rgba(15,23,42,0.08)",
                    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.041)",
                    display: "grid",
                    gap: 0.6,
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      bgcolor: "rgba(183,142,121,0.18)",
                      color: "primary.dark",
                    }}
                  >
                    <Icon sx={{ fontSize: 22 }} />
                  </Box>
                  <Typography sx={{ fontSize: 14, color: "text.secondary", fontWeight: 700 }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ fontSize: 20, color: "text.primary", fontWeight: 800 }}>
                    {item.value}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>{item.hint}</Typography>
                </Paper>
              </Link>
            );
          })}
        </Box>

        <Box
          sx={{
            mt: { xs: 3, md: 4 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.2fr 0.8fr" },
            gap: { xs: 2, md: 2.5 },
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
            <Typography sx={{ fontSize: { xs: 24, md: 30 }, fontWeight: 800, mb: 1.2 }}>
              Send Us A Message
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 2 }}>
              Share your budget, preferred neighborhoods, and timeline. We will
              prepare a tailored shortlist for you.
            </Typography>

            <Box
              component="form"
              action="mailto:hello@lilyaestate.com"
              method="post"
              encType="text/plain"
              sx={{
                display: "grid",
                gap: 1.3,
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              }}
            >
              <TextField label="Full Name" name="name" required />
              <TextField label="Phone" name="phone" required />
              <TextField label="Email" name="email" type="email" required />
              <TextField label="Interested In" name="interest" placeholder="Buy / Sell / Rent" />
              <Box sx={{ gridColumn: { xs: "1 / -1", md: "1 / -1" } }}>
                <TextField
                  label="Message"
                  name="message"
                  multiline
                  minRows={4}
                  fullWidth
                  required
                />
              </Box>
              <Box sx={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-start" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ minHeight: 48, px: 3.2, fontWeight: 700 }}
                >
                  Send Message
                </Button>
              </Box>
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.2, md: 3 },
              borderRadius: 3,
              border: "1px solid rgba(15,23,42,0.08)",
              boxShadow: "0 12px 30px rgba(15, 23, 42, 0.041)",
              display: "grid",
              alignContent: "start",
              gap: 1.1,
            }}
          >
            <Typography sx={{ fontSize: 24, fontWeight: 800 }}>
              Visit Our Office
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Tesvikiye Cd. No:24, Nisantasi
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>Istanbul, Turkiye</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.3 }}>
              <AccessTimeRoundedIcon sx={{ color: "secondary.dark", fontSize: 20 }} />
              <Typography sx={{ color: "text.secondary" }}>Mon - Sat: 09:00 - 19:00</Typography>
            </Box>

            <Box
              sx={{
                mt: 1,
                borderRadius: 2.4,
                border: "1px dashed rgba(15,23,42,0.2)",
                minHeight: 180,
                display: "grid",
                placeItems: "center",
                bgcolor: "rgba(145,159,144,0.08)",
                textAlign: "center",
                px: 2,
              }}
            >
              <Box>
                <Typography sx={{ fontWeight: 800, color: "text.primary" }}>
                  Location Preview
                </Typography>
                <Typography sx={{ color: "text.secondary", mt: 0.4 }}>
                  Open in maps for directions
                </Typography>
              </Box>
            </Box>

            <Link href="https://maps.google.com" style={{ textDecoration: "none" }}>
              <Button
                component="span"
                variant="outlined"
                color="primary"
                sx={{ mt: 0.6, minHeight: 46, fontWeight: 700 }}
                fullWidth
              >
                Open In Maps
              </Button>
            </Link>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
