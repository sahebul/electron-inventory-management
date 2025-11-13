import React, { useMemo, useState, createContext, useContext, useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import LoginPage from "./pages/LoginPage";
import ProductListPage from "./pages/ProductListPage";
import AddProduct from "./pages/AddProduct"
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { AppRoutes } from "./routes";
import { DialogProvider } from "./hooks/useDialogs";

export const ThemeContext = createContext();
export const AuthContext = createContext();
function App() {
  const [mode, setMode] = useState("light");

  const [isAuthenticated, setIsAuthenticated] = useState(()=>{
    const stored=localStorage.getItem("isAuthenticated");
    return stored ? JSON.parse(stored):false;
  });

  useEffect(()=>{
      localStorage.setItem("isAuthenticated",JSON.stringify(isAuthenticated));
  },[isAuthenticated])
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          // primary: {
          //   main: mode === "light" ? "#1976d2" : "#90caf9",
          // },
          // secondary: {
          //   main: mode === "light" ? "#9c27b0" : "#ce93d8",
          // },
          ...(mode === "light"
            ? {
                // 🌞 Light theme colors
                background: { default: "#f9f9f9", paper: "#fff" },
                text: { primary: "#222", secondary: "#555" },
              }
            : {
                // 🌙 Dark theme colors
                background: { default: "#121212", paper: "#1e1e1e" },
                text: { primary: "#fff", secondary: "#aaa" },
              }),
        },
      }),
    [mode]
  );
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <ThemeContext.Provider value={{ mode, setMode }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
          <DialogProvider >
              <AppRoutes />
          </DialogProvider>
           
            {/* <Routes>
            
              <Route element={<GuestRoute />}>
                <Route path="/" element={<LoginPage />} />
              </Route>
            
              <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/products" element={<ProductListPage />}  />
                  <Route path="/add-products" element={<AddProduct />}  />

                    <Route path="/business" element={<BusinessListPage />}  />
                     <Route path="/add-business" element={<AddBusinessPage />}  />
                </Route>
              </Route>
         
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes> */}
          </BrowserRouter>
        </ThemeProvider>
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
