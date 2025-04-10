import { useTranslation } from "react-i18next";
import "./App.css";
import CustomAppBar from "./components/AppBar";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./assets/theme.ts"; // il tuo file con i temi
import { useState, useMemo } from "react";
interface AppPropos {
  handleLanguageChange: (lng: string) => void;
}
function App({ handleLanguageChange }: AppPropos) {
  const { t } = useTranslation("common");
  const [mode, setMode] = useState<"light" | "dark">("light");

  const theme = useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  const handleThemeChange = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Reset MUI */}
        <CustomAppBar
          handleThemeChange={handleThemeChange}
          handleLanguageChange={handleLanguageChange}
        ></CustomAppBar>
      </ThemeProvider>
    </>
  );
}

export default App;
