import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

const BusinessTable = ({ business }) => {
  return (
   
        
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
            {business.map((p,index) => (
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
  );
};

export default BusinessTable;
