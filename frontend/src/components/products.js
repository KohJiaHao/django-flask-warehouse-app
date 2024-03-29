import { Typography } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useState, useEffect } from 'react';
import MenuAppBar from './navigation/appbar';
import CreateProductForm from './createForms/createProduct';


const columns = [
  { field: 'sku', headerName: 'Product SKU', width: 130 },
  { field: 'name', headerName: 'Product Name', width: 200 },
];

function ProductsScreen() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [toggleCreate, setToggleCreate] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setRows(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const clickedCreate = () => {
    setToggleCreate(true);
  }

  const closeCreate = async () => {
    await fetchProducts();
    setToggleCreate(false);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <MenuAppBar></MenuAppBar>
      {!toggleCreate && (
        <div>
          <Grid container spacing={3} alignItems="center" sx={{ padding: '15px' }}>
            <Grid item>
              <Typography variant="h4" component="div" align="left">
                Products screen
              </Typography>
            </Grid>
            <div className="spacer"></div>
            <Grid item>
              <Button onClick={clickedCreate} variant="contained">Add Product</Button>
            </Grid>
          </Grid>
          <div style={{ height: 400, width: '95%', margin: '0 auto' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              checkboxSelection
              getRowId={(row) => row.sku}
            />
          </div>
        </div>
      )}
      {toggleCreate && (
        <div>
          <CreateProductForm closeCreate={closeCreate}></CreateProductForm>
        </div>
      )}
      
    </div>
  );
}
  
  export default ProductsScreen;