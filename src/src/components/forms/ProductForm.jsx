import { Button, FormGroup, Grid, Stack, TextField,Box } from "@mui/material"
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material"
const ProductForm=({formState,handleSubmit,handleReset,handleFormFieldChange})=>{

    const formValues=[];
    const formErrors=[];
    return(
         <Box
      component="form"
    //   onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    //   onReset={handleReset}
      sx={{ width: '100%' }}
    >
      <FormGroup>
        <Grid container spacing={2} sx={{ mb: 2, width: '100%' }}>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
            <TextField
              value={formValues.name ?? ''}
            //   onChange={handleTextFieldChange}
              name="name"
              label="Name"
              error={!!formErrors.name}
              helperText={formErrors.name ?? ' '}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
            <TextField
              type="number"
              value={formValues.price ?? ''}
            //   onChange={handleNumberFieldChange}
              name="price"
              label="Price"
              error={!!formErrors.price}
              helperText={formErrors.price ?? ' '}
              fullWidth
            />
          </Grid>

           <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
            <TextField
              type="number"
              value={formValues.quantity ?? ''}
            //   onChange={handleNumberFieldChange}
              name="quantity"
              label="Quantity"
              error={!!formErrors.quantity}
              helperText={formErrors.quantity ?? ' '}
              fullWidth
            />
          </Grid>
          
          
        
          
        </Grid>
      </FormGroup>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
        //   onClick={handleBack}
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
        //   loading={isSubmitting}
        >
         Create
        </Button>
      </Stack>
    </Box>
    )
}

export default ProductForm