import {
  Button,
  FormGroup,
  Grid,
  Stack,
  TextField,
  Box,
  MenuItem,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyButton } from "../UI";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useFileUpload } from '../../hooks/useFileUpload';
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const BusinessForm = ({
  formState,
  handleSubmit,
  handleReset,
  handleFormFieldChange,
  handleFileChange,
  isSubmitting,
  submitButtonLabel,
}) => {


  const formErrors = formState?.errors || {};
  const formValues = formState?.values || {};
  const navigate = useNavigate();
  const theme = useTheme();

  
  const [logoPreview, setLogoPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [success, setSuccess] = useState(false);

  
const {
    uploading: logoUploading,
    error: logoError,
    selectAndUpload,
    reset: resetUpload,
  } = useFileUpload({
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedExtensions: ['.jpg', '.jpeg', '.png', '.svg', '.webp'],
    uploadDir: 'logos',
    onSuccess: (filePath) => {
      // setFormData(prev => ({ ...prev, logo: filePath }));
      handleFileChange(filePath)
      loadLogoPreview(filePath);
    },
    onError: (error) => {
      console.error('Logo upload error:', error);
    },
  });


  const loadLogoPreview = async (filePath) => {
    try {
      const result = await window.fileAPI.getBase64(filePath);
      if (result.success && result.data) {
        setLogoPreview(`data:image/png;base64,${result.data}`);
      }
    } catch (error) {
      console.error('Preview load error:', error);
    }
  };

  const handleLogoUpload = async () => {
    resetUpload();
    await selectAndUpload();
  };

  const handleRemoveLogo = async () => {
    if (formData.logo) {
      try {
        await window.fileAPI.delete(formData.logo);
        // setFormData(prev => ({ ...prev, logo: null }));
         handleFileChange(null)
        setLogoPreview(null);
      } catch (error) {
        console.error('Logo removal error:', error);
      }
    }
  };


  const businessTypes = [
    { value: "grocery", label: "Grocery" },
    { value: "medical", label: "Medical" },
    { value: "restaurant", label: "Restaurant" },
    { value: "retail", label: "Retail" },
  ];

  const currencies = [
    { value: "INR", label: "INR (₹)" },
    { value: "USD", label: "USD ($)" },
    { value: "EUR", label: "EUR (€)" },
    { value: "GBP", label: "GBP (£)" },
  ];


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
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
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

          {/* Business Type */}
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <TextField
              select
              value={formValues.businessType ?? ""}
              onChange={handleFormFieldChange}
              name="businessType"
              label="Business Type *"
              error={!!formErrors.businessType}
              helperText={formErrors.businessType ?? " "}
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
          <Grid size={{ xs: 12 }} sx={{ display: "flex" }}>
            <TextField
              value={formValues.address ?? ""}
              onChange={handleFormFieldChange}
              name="address"
              label="Address"
              error={!!formErrors.address}
              helperText={formErrors.address ?? " "}
              fullWidth
              multiline
              rows={2}
            />
          </Grid>

          {/* Phone */}
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <TextField
              type="tel"
              value={formValues.phone ?? ""}
              onChange={(e) => {
                e.target.value.length <= 10 && handleFormFieldChange(e);
              }}
              name="phone"
              label="Phone"
              error={!!formErrors.phone}
              helperText={formErrors.phone ?? " "}
              fullWidth
              placeholder="+91 XXXXX XXXXX"
            />
          </Grid>

          {/* Email */}
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <TextField
              type="email"
              value={formValues.email ?? ""}
              onChange={handleFormFieldChange}
              name="email"
              label="Email"
              error={!!formErrors.email}
              helperText={formErrors.email ?? " "}
              fullWidth
              placeholder="business@example.com"
            />
          </Grid>

          {/* GST Number */}
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <TextField
              value={formValues.gstNumber ?? ""}
              onChange={handleFormFieldChange}
              name="gstNumber"
              label="GST Number"
              error={!!formErrors.gstNumber}
              helperText={formErrors.gstNumber ?? " "}
              fullWidth
              placeholder="22AAAAA0000A1Z5"
            />
          </Grid>

          {/* Logo URL */}
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            {/* <TextField
              value={formValues.logo ?? ''}
              onChange={handleFormFieldChange}
              name="logo"
              label="Logo URL"
              error={!!formErrors.logo}
              helperText={formErrors.logo ?? ' '}
              fullWidth
              placeholder="https://example.com/logo.png"
            /> */}

            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{
                height: { xs: "48px", md: "56px" },
                width: "100%",
                color: theme.palette.text.primary,
                borderColor: theme.palette.action.disabled,
                "&:hover": {
                  borderColor: theme.palette.text.primary,
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              Upload logo
              <VisuallyHiddenInput
                type="file"
                onChange={handleFileChange}
                multiple
              />
            </Button>
          </Grid>

          {/* Currency */}
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <TextField
              select
              value={formValues.currency ?? "INR"}
              onChange={handleFormFieldChange}
              name="currency"
              label="Currency"
              error={!!formErrors.currency}
              helperText={formErrors.currency ?? " "}
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
          <Grid
            size={{ xs: 12, sm: 6 }}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={formValues.taxEnabled ?? true}
                  onChange={(e) =>
                    handleFormFieldChange({
                      target: {
                        name: "taxEnabled",
                        value: e.target.checked,
                      },
                    })
                  }
                  name="taxEnabled"
                />
              }
              label="Tax Enabled"
            />
          </Grid>

          <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Business Logo
          </label>
          
          {logoPreview ? (
            <div style={{ marginBottom: '10px' }}>
              <img
                src={logoPreview}
                alt="Logo preview"
                style={{
                  maxWidth: '200px',
                  maxHeight: '200px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '5px',
                }}
              />
              <div style={{ marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  style={{
                    padding: '5px 15px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Remove Logo
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleLogoUpload}
              disabled={logoUploading}
              style={{
                padding: '10px 20px',
                backgroundColor: logoUploading ? '#ccc' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: logoUploading ? 'not-allowed' : 'pointer',
              }}
            >
              {logoUploading ? 'Uploading...' : 'Upload Logo'}
            </button>
          )}

          {logoError && (
            <div
              style={{
                marginTop: '10px',
                padding: '10px',
                backgroundColor: '#f8d7da',
                color: '#721c24',
                borderRadius: '4px',
              }}
            >
              {logoError}
            </div>
          )}
        </div>

        </Grid>
      </FormGroup>

      <Stack direction="row" spacing={2} justifyContent="space-between">
        <MyButton
          buttonLable={"Back"}
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        />
        <MyButton
          buttonLable={submitButtonLabel}
          type="submit"
          loading={isSubmitting}
        />
      </Stack>
    </Box>
  );
};

export default BusinessForm;
