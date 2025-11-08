import { Button, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
const paginationModel = { page: 0, pageSize: 5 };

export default function DataTableDemo({business,handleDeleteRow}) {
  const navigate=useNavigate()
    
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
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.  ',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.logo || ''}`,
  },
  {
  field: 'actions--',
  type: 'actions',
  headerName: 'Actions',
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
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid 
        rows={business}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        getRowId={(row) => row.id}
        // checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
