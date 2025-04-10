import "./App.css";
import CustomAppBar from "./components/AppBar";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { lightTheme, darkTheme } from "./assets/theme.ts"; // il tuo file con i temi
import { useState, useMemo } from "react";
import PeopleTable from "./components/PeopleTable.tsx";
interface AppPropos {
  handleLanguageChange: (lng: string) => void;
}
function App({ handleLanguageChange }: AppPropos) {
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
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <PeopleTable />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
