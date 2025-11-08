import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductTable from "../components/ProductTable"
import { Button } from '@mui/material';
function ProductListPage({mode,setMode}) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const handleAdd=async()=>{
    // console.log("add one item to db");
   let item= await window.api.product.add({ name: "Apple", price: 50,quantity:1 });
     console.log("item added",item);
  } 
  
  const getAll=async()=>{
    // console.log("add one item to db");
  const items = await window.api.product.list();
console.log("items fetch",items)
  }
  const fetchProducts = async () => {
    // const data = await window.api.getProducts();
    // const products = await window.electronAPI.invoke("get-products");

    // await window.api.product.add({ name: "Apple", price: 50 });
// const items = await window.api.product.list();
// console.log("items fetch",items)
    setProducts([]);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <ProductTable products={products}/>
    </div>
  );
}

export default ProductListPage;
