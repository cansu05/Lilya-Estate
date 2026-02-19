import { Typography } from "@mui/material";

type SectionTitleProps = {
  text: string;
};

export default function SectionTitle({ text }: SectionTitleProps) {
  return (
    <Typography
      sx={{
        fontSize: { xs: 22, md: 30 },
        fontWeight: 700,
        color: "text.primary",
        letterSpacing: 1,
        lineHeight: 1.2,
        mb: { xs: 1.5, md: 2.5 },
        textAlign: "center",
      }}
    >
      {text}
    </Typography>
  );
}
