import { Avatar, Button, IconButton, Stack, useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import { DataGrid, GridActionsCellItem,gridClasses } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
// import { ImagePreview } from '../UI/ImagePreview';
import { LogoCell } from '../UI';
const paginationModel = { page: 0, pageSize: 5 };

export default function DataTableDemo({business,handleDeleteRow}) {
  const navigate=useNavigate()
  const theme = useTheme();
 const handleRowEdit = (id)=>{

  navigate(`/edit-business/${id}`);
 };

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Business name', width: 130 },
  { field: 'businessType', headerName: 'Business Type', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  {
    field: 'phone',
    headerName: 'Phone',
    type: 'number',
    width: 90,
  },
   { field: 'gstNumber', headerName: 'Gst Number', width: 130 },
  {
    field: 'logo',
    headerName: 'Business Logo',
    description: 'This column has a value getter and is not sortable.  ',
    sortable: false,
    width: 160,
    renderCell:(params)=>{
       return <LogoCell 
        filePath={params.value} 
        altText={params.row.name}
      />
    }
  },
  {
  field: 'actions--',
  type: 'actions',
  headerName: 'Actions',
  width: 100,
  getActions: (params) => [
    <GridActionsCellItem
      icon={ <EditIcon />
    }
      label="Edit"
      color="primary" 
      onClick={() => handleRowEdit(params.id)}
    />,
    <GridActionsCellItem
       color="error" 
      icon={<DeleteIcon  />}
      label="Delete"
      onClick={() =>handleDeleteRow(params.id)}
    />
  ]
},
 
//   {
//   field: 'actions',
//   headerName: 'Actions',
//   width: 200,
//   sortable: false,
//   renderCell: (params) => {
//       const handleEdit = () => {
//         console.log('Row data:', params.row);
//         // Your action here
//       };
//         const handleDelete = () => {
//         console.log('Row data:', params.row);
//         // Your action here
//       };
//     return (
//       <Stack direction="row" spacing={2} 
//   alignItems="center"
//   sx={{ height: '100%' }} 
//   >
//         <Button 
//           variant="outlined" 
//           color="primary" 
//           size="small"
//           startIcon={<EditIcon />}
//           onClick={() => handleEdit(params.row)}
//         >
//           Edit
//         </Button>
//         <Button 

//           variant="contained" 
//           color="error" 
//           size="small"
//           startIcon={<DeleteIcon />}
//           onClick={() => handleDelete(params.row)}
//         >
//           Delete
//         </Button>
//       </Stack>
//     );
//   }
// }

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
        rows={business}
        columns={columns}
        //  sortingMode="server"
        //     filterMode="server"
        //     paginationMode="server"
            //  paginationModel={paginationModel}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        showToolbar
        getRowId={(row) => row.id}
        // checkboxSelection
        // sx={{ border: 0 }}
        // sx={{
        //       [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
        //         outline: 'transparent',
        //       },
        //       [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
        //         {
        //           outline: 'none',
        //         },
        //       [`& .${gridClasses.row}:hover`]: {
        //         cursor: 'pointer',
        //       },
        //     }}

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
                variant: 'circular-progress',
                noRowsVariant: 'circular-progress',
              },
              baseIconButton: {
                size: 'small',
              },
            }}
      />
    </Paper>
  );
}
