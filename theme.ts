"use client";

import { createTheme } from "@mui/material/styles";

const heading = "var(--font-heading), 'Cormorant Garamond', Georgia, serif";
const body = "var(--font-body), 'Plus Jakarta Sans', -apple-system, sans-serif";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#C9A96E",
      light: "#E8C98A",
      dark: "#A8894E",
    },
    secondary: {
      main: "#E8C98A",
      light: "#F5EDD6",
      dark: "#C9A96E",
    },
    background: {
      default: "#0B0F1A",
      paper: "#141928",
    },
    text: {
      primary: "#F9F6EE",
      secondary: "#B8BEC9",
    },
    error: {
      main: "#D4705A",
    },
  },
  typography: {
    fontFamily: body,
    h1: {
      fontFamily: heading,
      fontSize: "3.5rem",
      fontWeight: 300,
      lineHeight: 1.1,
      letterSpacing: "-0.5px",
      color: "#F9F6EE",
    },
    h2: {
      fontFamily: heading,
      fontSize: "2.75rem",
      fontWeight: 400,
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
      color: "#F9F6EE",
    },
    h3: {
      fontFamily: heading,
      fontSize: "1.5rem",
      fontWeight: 400,
      lineHeight: 1.3,
      color: "#F9F6EE",
    },
    body1: {
      fontFamily: body,
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.7,
      color: "#B8BEC9",
    },
    button: {
      fontFamily: body,
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: "12px 28px",
          fontSize: "1rem",
          transition: "all 0.2s ease",
          "&:focus-visible": {
            outline: "2px solid #C9A96E",
            outlineOffset: "2px",
          },
          "&.MuiButton-containedPrimary": {
            background: "#C9A96E",
            color: "#0B0F1A",
            boxShadow: "0 4px 20px rgba(201, 169, 110, 0.2)",
            "&:hover": {
              background: "#E8C98A",
              boxShadow: "0 6px 28px rgba(201, 169, 110, 0.35)",
              transform: "translateY(-1px)",
            },
            "&:active": {
              transform: "translateY(0)",
              background: "#A8894E",
              boxShadow: "0 2px 12px rgba(201, 169, 110, 0.2)",
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "#141928",
          border: "1px solid rgba(124, 132, 148, 0.15)",
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
              borderColor: "rgba(124, 132, 148, 0.3)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(201, 169, 110, 0.5)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#C9A96E",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#7C8494",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#C9A96E",
          },
        },
      },
    },
  },
});

export default theme;
