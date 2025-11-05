import { Box, TextField, Button,Breadcrumbs  } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home as HomeIcon
} from "@mui/icons-material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StyledBreadcrumb from "../components/StyledBreadcrumb"
import AddProductPage from "./AddProductPage";
const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });
  const handleChane = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("formData",formData)
    // await window.api.product.add(formData);
      const data={
          name: formData.name,
          description: formData.description,
          price: parseFloat( formData.price),
          quantity: parseInt( formData.quantity),
      }
     let item= await window.api.product.add(data);;
     console.log("item added",item);

    navigate("/products");
  };
  return(
    <AddProductPage/>
  )
//   return (
//     <div>

//       <Breadcrumbs aria-label="breadcrumb">
//   <StyledBreadcrumb
//     component="a"
//     href="#"
//     label="Home"
//     icon={<HomeIcon fontSize="small" />}
//   />
//   <StyledBreadcrumb component="a" href="#" label="Catalog" />
//   <StyledBreadcrumb
//     label="Accessories"
//     deleteIcon={<ExpandMoreIcon />}
//     onDelete={handleClick}
//   />
// </Breadcrumbs>

    
//       <Box>
//        <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             label="Name"
//             variant="outlined"
//             name="name"
//             value={formData.name}
//             onChange={handleChane}
//             margin="normal"
//           />

//           <TextField
//             fullWidth
//             label="Price"
//             variant="outlined"
//             name="price"
//             value={formData.price}
//             onChange={handleChane}
//             margin="normal"
//           />

//           <TextField
//             fullWidth
//             label="Quantity"
//             variant="outlined"
//             name="quantity"
//             value={formData.quantity}
//             onChange={handleChane}
//             margin="normal"
//           />

//           <TextField
//             fullWidth
//             label="Description"
//             variant="outlined"
//             name="description"
//             value={formData.description}
//             onChange={handleChane}
//             margin="normal"
//           />

//           <Button type="submit">Add</Button>
//         </form>

//          <Button onClick={()=>navigate('/products')}>Back to home</Button>
//       </Box>
//       </div>
//   );
};

export default AddProduct;
