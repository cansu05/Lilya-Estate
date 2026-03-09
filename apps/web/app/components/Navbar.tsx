"use client";

import MenuIcon from "@mui/icons-material/Menu";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/listings", label: "All Listings" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <AppBar position="absolute" elevation={0} color="transparent" sx={{ top: 0 }}>
      <Toolbar
        sx={{
          px: { xs: 1.5, md: 8 },
          py: { xs: 1.5, md: 2 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr auto", md: "1fr auto 1fr" },
          alignItems: "center",
          gap: { xs: 1, md: 2 },
        }}
      >
        <Box sx={{ justifySelf: "start" }}>
          <Link component={NextLink} href="/" underline="none" color="inherit">
            <Image
              src="/assets/lilya-logo.png"
              alt="Lilya Logo"
              width={200}
              height={40}
              priority
              style={{ width: "clamp(120px, 32vw, 200px)", height: "auto" }}
            />
          </Link>
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifySelf: "center",
            alignSelf: "center",
            gap: 5,
            "& a": {
              color: "#fff",
              textTransform: "uppercase",
              fontWeight: 600,
              letterSpacing: 0.6,
              fontSize: 18,
              textShadow: "0 2px 8px rgba(0,0,0,0.45)",
              transition: "letter-spacing 0.2s ease",
              "&:hover": {
                letterSpacing: 1.5,
              },
            },
          }}
        >
          {navLinks.map((item) => (
            <Link
              key={item.href}
              component={NextLink}
              href={item.href}
              underline="none"
            >
              {item.label}
            </Link>
          ))}
        </Box>

        <Box
          sx={{
            justifySelf: "end",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <IconButton
            sx={{
              width: { xs: 40, md: 50 },
              height: { xs: 40, md: 50 },
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.35)",
              backdropFilter: "blur(3px)",
              transition: "background-color 0.3s ease",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.34)" },
            }}
            aria-label="Phone"
          >
            <PhoneInTalkOutlinedIcon sx={{ fontSize: { xs: 22, md: 28 } }} />
          </IconButton>

          <IconButton
            sx={{
              display: { xs: "inline-flex", md: "none" },
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.35)",
              backdropFilter: "blur(3px)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.34)" },
            }}
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: 260, sm: 320 },
            pt: 2,
          },
        }}
      >
        <List sx={{ pt: 1 }}>
          {navLinks.map((item) => (
            <ListItemButton
              key={item.href}
              component={NextLink}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              sx={{ justifyContent: "center", py: 2 }}
            >
              <ListItemText
                primary={item.label}
                sx={{ textAlign: "center" }}
                primaryTypographyProps={{
                  fontSize: 16,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}
