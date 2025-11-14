import { useTheme } from "@mui/material";
import Paper from "@mui/material/Paper";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
const paginationModel = { page: 0, pageSize: 5 };

export default function UserTable({ data, handleDeleteRow }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const handleRowEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "User name", width: 130 },
    { field: "business", headerName: "Business Name", width: 130, 
      valueGetter: (params) => params.name || ''},
    { field: "email", headerName: "Email", width: 130 },
    {
      field: "phone",
      headerName: "Phone",
      type: "number",
      width: 90,
    },
    { field: "role", headerName: "Role", width: 130 },
    { field: "isActive", headerName: "Is Active", width: 130 },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          color="primary"
          onClick={() => handleRowEdit(params.id)}
        />,
        <GridActionsCellItem
          color="error"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteRow(params.id)}
        />,
      ],
    },
  ];

  return (
    <Paper
      // sx={{ height: 400, width: '100%' }}
      elevation={0}
      sx={{
        height: 400,
        width: "100%",
        borderRadius: 3,
        overflow: "hidden",
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <DataGrid
        rows={data}
        columns={columns}
        //  sortingMode="server"
        //     filterMode="server"
        //     paginationMode="server"
        //  paginationModel={paginationModel}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        showToolbar
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
        sx={{
          border: "none",
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.paper,

          // Header
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.background.default
                : "#f9fafb",
            borderBottom: `1px solid ${theme.palette.divider}`,
            fontWeight: 600,
          },

          // Rows
          "& .MuiDataGrid-row": {
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.05)"
                : "#f9fafb",
            cursor: "pointer",
          },

          // Cells
          "& .MuiDataGrid-cell": {
            border: "none",
          },

          // Footer
          "& .MuiDataGrid-footerContainer": {
            borderTop: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
          },
        }}
        slotProps={{
          loadingOverlay: {
            variant: "circular-progress",
            noRowsVariant: "circular-progress",
          },
          baseIconButton: {
            size: "small",
          },
        }}
      />
    </Paper>
  );
}
