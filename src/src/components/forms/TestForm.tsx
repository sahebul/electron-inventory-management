import React from "react";
import {
  Button,
  FormGroup,
  Grid,
  Stack,
  TextField,
  Box,
  MenuItem,
  FormControlLabel,
  Switch
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";

// ✅ Import your custom types (or define inline below)
import { FormProps, FormFieldValue } from "./types";

const TestForm: React.FC<FormProps> = ({
  formState,
  handleSubmit,
  handleReset,
  handleFormFieldChange,
}) => {
  const formErrors = formState?.errors || {};
  const formValues = formState?.values || {};

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      onReset={handleReset}
      sx={{ width: "100%" }}
    >
      <FormGroup>
        <Grid container spacing={2} sx={{ mb: 2, width: "100%" }}>
          {/* Business Name */}
          <Grid  size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <TextField
              value={formValues.name ?? ""}
              onChange={handleFormFieldChange}
              name="name"
              label="Business Name *"
              error={!!formErrors.name}
              helperText={formErrors.name ?? " "}
              fullWidth
              required
            />
          </Grid>
        </Grid>
      </FormGroup>

      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={handleReset}
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
        >
          Create Business
        </Button>
      </Stack>
    </Box>
  );
};

export default TestForm;
