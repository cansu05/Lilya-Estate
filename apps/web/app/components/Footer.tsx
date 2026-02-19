"use client";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  Box,
  Container,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "All Listings", href: "/listings" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: { xs: 6, md: 8 },
        py: { xs: 4, md: 6 },
        bgcolor: "primary.dark",
        color: "#fff",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1.3fr 1fr 1fr",
            },
            gap: { xs: 3, md: 4 },
            alignItems: "start",
          }}
        >
          <Box>
            <Box sx={{ width: 220 }}>
              <Image
                src="/assets/lilya-logo.png"
                alt="Lilya Estate"
                width={220}
                height={56}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </Box>
            <Typography
              sx={{
                mt: 1.2,
                maxWidth: 420,
                color: "rgba(255,255,255,0.86)",
                lineHeight: 1.7,
              }}
            >
              Premium real estate experience for buying, selling, and renting
              exceptional properties across Turkey.
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ fontSize: 17, fontWeight: 700, mb: 1.2 }}>
              Quick Links
            </Typography>
            <Stack spacing={0.8}>
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  component={NextLink}
                  href={item.href}
                  underline="none"
                  sx={{
                    color: "rgba(255,255,255,0.88)",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography sx={{ fontSize: 17, fontWeight: 700, mb: 1.2 }}>
              Contact
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.88)" }}>
              +90 (555) 000 00 00
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.88)", mt: 0.6 }}>
              hello@lilyaestate.com
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.88)", mt: 0.6 }}>
              Istanbul, Turkey
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 1.6 }}>
              <IconButton
                aria-label="Instagram"
                sx={{
                  color: "#fff",
                  bgcolor: "rgba(255,255,255,0.16)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.26)" },
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                aria-label="Facebook"
                sx={{
                  color: "#fff",
                  bgcolor: "rgba(255,255,255,0.16)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.26)" },
                }}
              >
                <FacebookRoundedIcon />
              </IconButton>
              <IconButton
                aria-label="LinkedIn"
                sx={{
                  color: "#fff",
                  bgcolor: "rgba(255,255,255,0.16)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.26)" },
                }}
              >
                <LinkedInIcon />
              </IconButton>
            </Stack>
          </Box>
        </Box>

        <Box
          sx={{
            mt: { xs: 3, md: 4 },
            pt: { xs: 2, md: 2.5 },
            borderTop: "1px solid rgba(255,255,255,0.22)",
            display: "flex",
            justifyContent: "space-between",
            gap: 1.5,
            flexWrap: "wrap",
          }}
        >
          <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>
            © 2026 LILYA Estate. All rights reserved.
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>
            Crafted for premium living.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
