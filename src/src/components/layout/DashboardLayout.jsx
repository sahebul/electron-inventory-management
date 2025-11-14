import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Typography,
  IconButton,
  Toolbar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  List,
  Drawer,
  ListItemText,
} from "@mui/material";
import React, { useContext, useState } from "react";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ArrowBack } from "@mui/icons-material";

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ThemeContext, AuthContext } from "../../App";

const drawerWidth = 220;
const DashboardLayout = () => {
  const { mode, setMode } = useContext(ThemeContext);
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  console.log("location name", location);
  const canGoBack = false;//location.pathname !== "/products";

  const handleButtonClick = (event, itemText) => {
    alert(`You clicked: ${itemText}`);
  };
  
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: open ? `${drawerWidth}px 1fr` : "0 1fr",
        gridTemplateRows: "64px 1fr", // Header + Content
        width: "100vw",
        height: "100vh",
        overflow: "hidden", // Prevent scrollbar
        bgcolor: "background.default",
      }}
    >
      <CssBaseline />
      {/* ===== AppBar (Header) ===== */}

      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "background.default",
          //   background: "linear-gradient(45deg, #1976d2, #2196f3)",
        }}
      >
        <Toolbar>
          {/* Menu Button (toggles sidebar) */}
          {canGoBack ? (
            <IconButton
              color="text.primary"
              onClick={() => navigate(-1)}
              sx={{ mr: 2 }}
            >
              <ArrowBack />
            </IconButton>
          ) : (
            <IconButton
              color="text.primary"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* App Name */}
          <Typography variant="h6" sx={{ flexGrow: 1, color: "text.primary" }}>
            Dashboard
          </Typography>

          {/* Logout Button (right side) */}
          <Button
            variant="outlined"
            onClick={() => {
              setIsAuthenticated(false);
              navigate("/");
            }}
            x={{
              color: "text.primary",
              borderColor: "text.primary",
              "&:hover": {
                borderColor: "primary.main",
                backgroundColor: "action.hover",
              },
            }}
          >
            Logout
          </Button>

          <IconButton
            color="text.primary"
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
          >
            {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "background.default",
            borderRight: "1px solid primary.main",
          },
        }}
      >
        <Toolbar />
        <List>
          {[
            { text: "Home", icon: <HomeIcon />,path:"/" },
            { text: "Dashboard", icon: <DashboardIcon />,path:"/products"  },
            { text: "Business", icon: <DashboardIcon />,path:"/business"  },
            { text: "Users", icon: <DashboardIcon />,path:"/users"  },
            { text: "Settings", icon: <SettingsIcon />,path:"/add-products"  }
          ].map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={(event) => navigate(item.path)}>
                <ListItemIcon sx={{ color: "#1976d2" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {/* ===== Main Content Area ===== */}
      <Box
        component="main"
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          mt: 8,
          overflowY: "auto", // allow vertical scroll if needed
          overflowX: "hidden", // hide horizontal scroll
          minHeight: "calc(100vh - 64px)",
          width: "100%", // fills second column
          boxSizing: "border-box",

          transition: "margin 0.3s",
          //   bgcolor: "#c05273ff",
        }}
      >
        {/* All child routes render here */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
