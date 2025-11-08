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
import {FormProps,FormState} from './types';
import React,{useState} from "react";
const BusinessForm:React.FC<FormProps>   = ({ formState, handleSubmit, handleReset, handleFormFieldChange }) => {
  const formErrors = formState?.errors || {};
  const formValues = formState?.values || {};
  const [isSubmitting,setIsSubmitting]=useState(false);
  // const formErrors = formState?.errors || {};

  const businessTypes = [
    { value: "grocery", label: "Grocery" },
    { value: "medical", label: "Medical" },
    { value: "restaurant", label: "Restaurant" },
    { value: "retail", label: "Retail" }
  ];

  const currencies = [
    { value: "INR", label: "INR (₹)" },
    { value: "USD", label: "USD ($)" },
    { value: "EUR", label: "EUR (€)" },
    { value: "GBP", label: "GBP (£)" }
  ];

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      onReset={handleReset}
      sx={{ width: '100%' }}
    >
      <FormGroup>
        <Grid container spacing={2} sx={{ mb: 2, width: '100%' }}>
          {/* Business Name */}
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
            <TextField
              value={formValues.name ?? ''}
              onChange={handleFormFieldChange}
              name="name"
              label="Business Name *"
              error={!!formErrors.name}
              helperText={formErrors.name ?? ' '}
              fullWidth
              required
            />
          </Grid>

          {/* Business Type */}
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
            <TextField
              select
              value={formValues.businessType ?? ''}
              onChange={handleFormFieldChange}
              name="businessType"
              label="Business Type *"
              error={!!formErrors.businessType}
              helperText={formErrors.businessType ?? ' '}
              fullWidth
              required
            >
              {businessTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Address */}
          <Grid size={{ xs: 12 }} sx={{ display: 'flex' }}>
            <TextField
              value={formValues.address ?? ''}
              onChange={handleFormFieldChange}
              name="address"
              label="Address"
              error={!!formErrors.address}
              helperText={formErrors.address ?? ' '}
              fullWidth
              multiline
              rows={2}
            />
          </Grid>

          {/* Phone */}
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
            <TextField
              type="tel"
              value={formValues.phone ?? ''}
              onChange={handleFormFieldChange}
              name="phone"
              label="Phone"
              error={!!formErrors.phone}
              helperText={formErrors.phone ?? ' '}
              fullWidth
              placeholder="+91 XXXXX XXXXX"
            />
          </Grid>

          {/* Email */}
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
            <TextField
              type="email"
              value={formValues.email ?? ''}
              onChange={handleFormFieldChange}
              name="email"
              label="Email"
              error={!!formErrors.email}
              helperText={formErrors.email ?? ' '}
              fullWidth
              placeholder="business@example.com"
            />
          </Grid>

          {/* GST Number */}
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
            <TextField
              value={formValues.gstNumber ?? ''}
              onChange={handleFormFieldChange}
              name="gstNumber"
              label="GST Number"
              error={!!formErrors.gstNumber}
              helperText={formErrors.gstNumber ?? ' '}
              fullWidth
              placeholder="22AAAAA0000A1Z5"
            />
          </Grid>

          {/* Logo URL */}
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
            <TextField
              value={formValues.logo ?? ''}
              onChange={handleFormFieldChange}
              name="logo"
              label="Logo URL"
              error={!!formErrors.logo}
              helperText={formErrors.logo ?? ' '}
              fullWidth
              placeholder="https://example.com/logo.png"
            />
          </Grid>

          {/* Currency */}
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
            <TextField
              select
              value={formValues.currency ?? 'INR'}
              onChange={handleFormFieldChange}
              name="currency"
              label="Currency"
              error={!!formErrors.currency}
              helperText={formErrors.currency ?? ' '}
              fullWidth
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Tax Enabled Switch */}
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={formValues.taxEnabled ?? true}
                  onChange={(e) => handleFormFieldChange({
                    target: {
                      name: 'taxEnabled',
                      value: e.target.checked
                    }
                  })}
                  name="taxEnabled"
                />
              }
              label="Tax Enabled"
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
          loading={isSubmitting}
        >
          Create Business
        </Button>
      </Stack>
    </Box>
  );
};

export default BusinessForm;
