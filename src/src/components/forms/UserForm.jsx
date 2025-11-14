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
const UserForm = ({
  formState,
  handleSubmit,
  handleReset,
  handleFormFieldChange,
  isSubmitting,
  submitButtonLabel,
  business
}) => {


  const formErrors = formState?.errors || {};
  const formValues = formState?.values || {};
  const navigate = useNavigate();
 

  const roles = [
    { value: "", label: "Select a role" },
    { value: "admin", label: "Admin" },
    { value: "manager", label: "Manager" },
    { value: "cashier", label: "Cashier" },
    { value: "staff", label: "Staff" },
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
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <TextField
              value={formValues.name ?? ""}
              onChange={handleFormFieldChange}
              name="name"
              label="User Name *"
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
              value={formValues.businessId ?? ""}
              onChange={handleFormFieldChange}
              name="businessId"
              label="Business *"
              error={!!formErrors.businessId}
              helperText={formErrors.businessId ?? " "}
              fullWidth
              required
            >
              {business.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
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

         
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <TextField
              value={formValues.password ?? ""}
              onChange={handleFormFieldChange}
              name="password"
              label="Password"
              type="password"
              error={!!formErrors.password}
              helperText={formErrors.password ?? " "}
              fullWidth
              placeholder=""
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <TextField
              select
              value={formValues.role ?? ""}
              onChange={handleFormFieldChange}
              name="role"
              label="Role"
              error={!!formErrors.role}
              helperText={formErrors.role ?? " "}
              fullWidth
            >
              {roles.map((option) => (
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
                  checked={formValues.isActive ?? true}
                  onChange={(e) =>
                    handleFormFieldChange({
                      target: {
                        name: "isActive",
                        value: e.target.checked,
                      },
                    })
                  }
                  name="isActive"
                />
              }
              label="Is Active"
            />
          </Grid>
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

export default UserForm;
