"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6C63FF",
      light: "#8B85FF",
      dark: "#4A42D4",
    },
    secondary: {
      main: "#FF6584",
      light: "#FF8FA3",
      dark: "#D44A66",
    },
    background: {
      default: "#0A0A0F",
      paper: "#12121A",
    },
    text: {
      primary: "#E8E8ED",
      secondary: "#9494A8",
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.7,
      color: "#9494A8",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "12px 28px",
          fontSize: "1rem",
          transition: "all 0.2s ease",
          "&:focus-visible": {
            outline: "2px solid #6C63FF",
            outlineOffset: "2px",
          },
          "&.MuiButton-containedPrimary": {
            background: "linear-gradient(135deg, #6C63FF 0%, #8B85FF 100%)",
            boxShadow: "0 4px 20px rgba(108, 99, 255, 0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #5A52E0 0%, #6C63FF 100%)",
              boxShadow: "0 6px 28px rgba(108, 99, 255, 0.45)",
              transform: "translateY(-1px)",
            },
            "&:active": {
              transform: "translateY(0)",
              boxShadow: "0 2px 12px rgba(108, 99, 255, 0.3)",
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(18, 18, 26, 0.8)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          borderRadius: 16,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.1)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(108, 99, 255, 0.4)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#6C63FF",
            },
          },
        },
      },
    },
  },
});

export default theme;
