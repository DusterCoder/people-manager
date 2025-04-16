// theme.ts
import { createTheme } from "@mui/material/styles";

const sharedThemeOptions = {
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "8px 16px",
        },containedPrimary: {
      backgroundColor: "#1976d2",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#115293", 
      },
    },
    containedSecondary: {
      backgroundColor: "#",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#6d1b7b",
      },
    },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "none",
          fontSize: 14,
        },
        columnHeaders: {
          fontWeight: 600,
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
    background: {
      default: "#f9f9f9",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#555",
    },
  },
  ...sharedThemeOptions,
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#ce93d8",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#cccccc",
    },
  },
  ...sharedThemeOptions,
});
