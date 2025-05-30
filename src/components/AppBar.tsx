import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { styled, Switch } from "@mui/material";
interface AppBarPropos {
  handleLanguageChange: (lng: string) => void;
  handleThemeChange: (mode: string) => void;
}

function CustomAppBar({
  handleLanguageChange,
  handleThemeChange,
}: AppBarPropos) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [language, setLanguage] = useState("it");

  const [themeSwitch, setThemeSwitch] = useState("light");

  const ThemeUiSwitch = styled(Switch)<{ width?: number; height?: number }>(
    ({ width = 62, height = 34 }) => ({
      width,
      height,
      padding: 7,
      "& .MuiSwitch-switchBase": {
        margin: 1,
        padding: 0,
        transform: "translateX(6px)",
        "&.Mui-checked": {
          color: "#fff",
          transform: "translateX(22px)",
          "& .MuiSwitch-thumb:before": {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
              "#fff"
            )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
          },
          "& + .MuiSwitch-track": {
            opacity: 1,
            backgroundColor: "#aab4be",
          },
        },
      },
      "& .MuiSwitch-thumb": {
        backgroundColor: "#001e3c",
        width: 32,
        height: 32,
        "&::before": {
          content: "''",
          position: "absolute",
          width: "100%",
          height: "100%",
          left: 0,
          top: 0,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
      },
      "& .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
        borderRadius: 20 / 2,
      },
    })
  );
  const LanguageUiSwitch = styled(Switch)<{ width?: number; height?: number }>(
    ({ width = 61, height = 33 }) => ({
      width,
      height,
      padding: 7,
      "& .MuiSwitch-switchBase": {
        transition: "transform 250ms ease-in-out",
        margin: 1,
        padding: 0,
        transform: "translateX(6px)",
        "&.Mui-checked": {
          color: "#fff",
          transform: "translateX(22px)",
          "& .MuiSwitch-thumb:before": {
            backgroundImage: `url("/flags/uk.svg")`,
          },
          backgroundSize: "cover", // o "contain" se vuoi tutta la bandiera visibile
          borderRadius: "50%",
          "& + .MuiSwitch-track": {
            opacity: 1,
            backgroundColor: "#aab4be",
          },
        },
      },
      "& .MuiSwitch-thumb": {
        backgroundColor: "#transparent",
        width: 32,
        height: 32,
        "&::before": {
          content: "''",
          position: "absolute",
          width: "100%",
          height: "100%",
          left: 0,
          top: 0,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url("/flags/italy.svg")`,
          backgroundSize: "cover", // o "contain" se vuoi tutta la bandiera visibile
          borderRadius: "50%",
        },
      },
      "& .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
        borderRadius: 20 / 2,
      },
    })
  );
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={false}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={false}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <AppBar position="sticky">
        <Toolbar>
          <Typography noWrap component="div" sx={{ display: "block" }}>
            People Manager
          </Typography>

          <Box className="align-right" sx={{ display: "flex" }}>
            <ThemeUiSwitch
              checked={themeSwitch === "dark"}
              onChange={(e: React.ChangeEvent) => {
                setThemeSwitch(e.target.checked ? "dark" : "light");
                handleThemeChange(e.target.checked ? "dark" : "light");
              }}
              className="align-right"
            />
            <LanguageUiSwitch
              checked={language === "en"}
              onChange={(event: React.ChangeEvent) => {
                handleLanguageChange(event.target.checked ? "en" : "it");
                setLanguage(event.target.checked ? "en" : "it");
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
export default CustomAppBar;
