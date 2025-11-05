import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Breadcrumbs,
  Stack,
  Tooltip,
  IconButton,
} from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useNavigate } from "react-router-dom";
import PageContainer from "./PageContainer";

const ProductTable = ({ products }) => {

  const navigate=useNavigate()
  return (
    <PageContainer
      title={"Products"}
      breadcrumbs={[{ title: "Products" }]}
      actions={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Tooltip title="Reload data" placement="right" enterDelay={1000}>
            <div>
              <IconButton size="small" aria-label="refresh"
              //  onClick={handleRefresh}
               >
                <RefreshIcon />
              </IconButton>
            </div>
          </Tooltip>
          <Button
            variant="contained"
            onClick={()=>navigate("/add-products")}
            startIcon={<AddIcon />}
          >
            Create
          </Button>
        </Stack>
      }
    >
         {/* <Breadcrumbs aria-label="breadcrumb">
  <StyledBreadcrumb
    component="a"
    href="#"
    label="Home"
    icon={<HomeIcon fontSize="small" />}
  />
  <StyledBreadcrumb component="a" href="#" label="Products" />
 
</Breadcrumbs> */}
    {/* Header Title */}
        {/* <Box
          sx={{
            display:'flex',
            p: 2,
            bgcolor: "linear-gradient(45deg, #1976d2, #42a5f5)",
            // color: "white",
            flexDirection:'row',
            textAlign: "left",
            justifyContent:'space-between'
          }}
        >
          <Typography variant="h6" fontWeight="bold">
          Product Inventory
          </Typography>
          <Button
          variant="outlined"
           onClick={()=>navigate("/add-products")}>
            Add Product
          </Button>
        </Box> */}
    <Box
      sx={{
        // p: 3,
        display: "flex",
        justifyContent: "center",
        // bgcolor: "#1d3aacff",
        minHeight: "100vh",
      }}
    >
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          maxWidth: "100%",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        

        <Table>
          <TableHead
            sx={{
              bgcolor: "background.default",
            }}
          >
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                Sl#
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                Price
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                Quantity
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((p,index) => (
              <TableRow
                key={p.id}
                hover
                sx={{
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "background.default",
                    transform: "scale(1.01)",
                  },
                }}
              >
                <TableCell sx={{ fontSize: "0.95rem", color: "text.primary" }}>
                  {index+1}
                </TableCell>
                <TableCell sx={{ fontSize: "0.95rem", color: "text.primary" }}>
                  {p.name}
                </TableCell>
                <TableCell sx={{ fontSize: "0.95rem", color: "text.primary" }}>
                  ₹{p.price}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "0.95rem",
                    color: p.quantity < 5 ? "error.main" : "success.main",
                    fontWeight: 500,
                  }}
                >
                  {p.quantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
   </PageContainer>
  );
};

export default ProductTable;
