import { Box, Typography } from "@mui/material";
import Image from "next/image";

type HeroProps = {
  imageSrc: string;
  height: object;
  alt?: string;
  overlayOpacity?: number;
  title?: string;
  subtitle?: string;
  contentOffsetY?: string;
  priority?: boolean;
  quality?: number;
};

export default function Hero({
  imageSrc,
  height,
  alt = "Hero",
  overlayOpacity = 0.35,
  title = "Discover Refined Living with Lilya Estate",
  subtitle = "Explore handpicked homes designed for modern life, timeless comfort, and lasting value.",
  contentOffsetY = "0%",
  priority = false,
  quality = 72,
}: HeroProps) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height,
      }}
    >
      <Image
        src={imageSrc}
        alt={alt}
        fill
        priority={priority}
        quality={quality}
        style={{ objectFit: "cover" }}
        sizes="100vw"
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, rgba(0,0,0,${
            overlayOpacity + 0.05
          }) 0%, rgba(0,0,0,${overlayOpacity + 0.15}) 100%)`,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, calc(-50% + ${contentOffsetY}))`,
          width: "100%",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "#fff",
          px: { xs: 2, md: 3 },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: 26, sm: 30, md: 58 },
            fontWeight: 700,
            lineHeight: { xs: 1.2, md: 1.1 },
            letterSpacing: { xs: 0.3, md: 1.2 },
            maxWidth: { xs: 320, sm: 520, md: 900 },
            textShadow: "0 3px 10px rgba(0,0,0,0.45)",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            mt: { xs: 1.25, md: 2 },
            maxWidth: { xs: 320, sm: 500, md: 640 },
            fontSize: { xs: 16, sm: 15, md: 24 },
            letterSpacing: { xs: 0.15, md: 0.6 },
            color: "rgba(255,255,255,0.94)",
            textShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}
