import React, { useState,useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Slide,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, Login } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
const LoginPage = () => {

  const {setIsAuthenticated}=useContext(AuthContext)
  const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState({ open: false, type: "success", message: "" });

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });


  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);

    let is_success=false;
    if (formData.username === "admin" && formData.password === "1234") {
      setIsAuthenticated(true);
      is_success=true;
      setAlert({
        open: true,
        type: "success",
        message: "Login successful! Redirecting...",
      });
    } else {
      setAlert({
        open: true,
        type: "error",
        message: "Invalid credentials. Please try again.",
      });
    }

    // Auto-close after 3 seconds
    setTimeout(() => {
      setAlert({ ...alert, open: false });
      if(is_success){
         navigate('/products');
      }
    }, 3000);

  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
     {/* Custom Alert on top-right corner */}
      <Slide direction="left" in={alert.open} mountOnEnter unmountOnExit>
        <Alert
          severity={alert.type}
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            minWidth: 280,
            boxShadow: 3,
            borderRadius: 2,
            fontSize: "0.95rem",
          }}
        >
          {alert.message}
        </Alert>
      </Slide>

      <Card
        sx={{
          width: "100%",
          maxWidth: 400,
          boxShadow: 6,
          borderRadius: 3,
          backdropFilter: "blur(8px)",
          bgcolor: "rgba(255,255,255,0.9)",
        }}
      >
        <CardContent>
            
          <Typography
            variant="h5"
            align="center"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#333" }}
          >
            Welcome Back 👋
          </Typography>
          <Typography variant="body2" align="center" sx={{ mb: 3, color: "#555" }}>
            Login to your account
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              startIcon={<Login />}
              sx={{
                mt: 3,
                py: 1.2,
                background: "linear-gradient(45deg, #6a11cb, #2575fc)",
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "16px",
                ":hover": {
                  background: "linear-gradient(45deg, #5a0ecb, #1d65fc)",
                },
              }}
            >
              Login
            </Button>
          </form>

          <Typography variant="body2" align="center" sx={{ mt: 3, color: "#666" }}>
            Don’t have an account?{" "}
            <Box
              component="span"
              sx={{
                color: "#1976d2",
                fontWeight: "bold",
                cursor: "pointer",
                ":hover": { textDecoration: "underline" },
              }}
            >
              Sign Up
            </Box>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
