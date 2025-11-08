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
  TablePagination,
} from "@mui/material";
import { useState } from "react";

const BusinessTable = ({ business }) => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };
  return (
   
      <Paper>
      <TableContainer
        // component={Paper}
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
                Business Type
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                Phone
              </TableCell>
               <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                Email
              </TableCell>
               <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                Address
              </TableCell>
               <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                GST No
              </TableCell>
               <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                Currency
              </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                Tax Enabled
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {business
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((p,index) => (
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
                  ₹{p.businessType}
                </TableCell>
                 <TableCell sx={{ fontSize: "0.95rem", color: "text.primary" }}>
                  ₹{p.phone}
                </TableCell>
                 <TableCell sx={{ fontSize: "0.95rem", color: "text.primary" }}>
                  ₹{p.email}
                </TableCell>
                 <TableCell sx={{ fontSize: "0.95rem", color: "text.primary" }}>
                  ₹{p.address}
                </TableCell>
                 <TableCell sx={{ fontSize: "0.95rem", color: "text.primary" }}>
                  ₹{p.gstNumber}
                </TableCell>
                <TableCell sx={{ fontSize: "0.95rem", color: "text.primary" }}>
                  ₹{p.currency}
                </TableCell>
                <TableCell sx={{ fontSize: "0.95rem", color: "text.primary" }}>
                  ₹{p.taxEnabled}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "0.95rem",
                    color: p.quantity < 5 ? "error.main" : "success.main",
                    fontWeight: 500,
                  }}
                >
                  {p.taxEnabled}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

       <TablePagination
        component="div"
        count={business.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
</Paper>
  );
};

export default BusinessTable;
