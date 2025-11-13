import React, { createContext, useContext, useState, useCallback } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  useTheme,
} from "@mui/material";

/**
 * Create a Dialog Context
 */
const DialogContext = createContext(null);

/**
 * Provider component — wraps your App once
 */
export function DialogProvider({ children }) {
  const [dialogState, setDialogState] = useState({
    open: false,
    title: "",
    message: "",
    options: {},
    resolve: null,
  });

  const theme = useTheme();

  const confirm = useCallback((message, options = {}) => {
    return new Promise((resolve) => {
      setDialogState({
        open: true,
        title: options.title || "Confirm",
        message,
        options,
        resolve,
      });
    });
  }, []);

  const handleClose = (result) => {
    setDialogState((prev) => {
      if (prev.resolve) prev.resolve(result);
      return { ...prev, open: false };
    });
  };

  return (
    <DialogContext.Provider value={{ confirm }}>
      {children}

      <Dialog
        maxWidth="xs"
        fullWidth 
        open={dialogState.open}
        onClose={() => handleClose(false)}
        aria-labelledby="confirm-dialog"
        sx={{
            borderRadius:10,
          "& .MuiPaper-root": {
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        <DialogTitle id="confirm-dialog">{dialogState.title??'Alert'}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogState.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>
            {dialogState.options.cancelText || "Cancel"}
          </Button>
          <Button
            variant="contained"
            color={
              dialogState.options.severity === "error" ? "error" : "primary"
            }
            onClick={() => handleClose(true)}
          >
            {dialogState.options.okText || "OK"}
          </Button>
        </DialogActions>
      </Dialog>
    </DialogContext.Provider>
  );
}

/**
 * Custom hook — use anywhere
 */
export function useDialogs() {
  const context = useContext(DialogContext);
  if (!context)
    throw new Error("useDialogs must be used within a DialogProvider");
  return context;
}
