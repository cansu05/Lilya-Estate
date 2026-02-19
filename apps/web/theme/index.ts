import { createTheme } from "@mui/material/styles";
import { palette } from "./colors/palette";

export const appTheme = createTheme({
  palette,
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "var(--font-geist-sans), sans-serif",
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: palette.text.secondary,
          "&.Mui-focused": {
            color: palette.text.secondary,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#D0D5DD",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#D0D5DD",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#D0D5DD",
            borderWidth: 1,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
          "&:active": {
            boxShadow: "none",
          },
          "&.Mui-focusVisible": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: "100%",
        },
        body: {
          minHeight: "100dvh",
          margin: 0,
          backgroundColor: palette.background.default,
        },
      },
    },
  },
});
