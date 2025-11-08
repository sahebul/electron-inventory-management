import {
  Slide,
  Alert,
} from "@mui/material";
import { useEffect } from "react";
function CustomAlert({ alert, onClose }) {

  useEffect(() => {
    if (alert.open) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // 3 seconds

      // Cleanup function to clear timeout
      return () => clearTimeout(timer);
    }
  }, [alert.open, onClose]);

 return(
  <Slide direction="left" in={alert.open} mountOnEnter unmountOnExit>
          <Alert
            severity={alert.type}
            sx={{
              position: "absolute",
              top: 100,
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
 )
}

export default CustomAlert;
