import { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import MenuAppBar from './navigation/appbar';
import CreateInventoryForm from './createForms/createInventory';

const columns = [
  { field: 'id', headerName: 'ID', width: 30 },
  { field: 'prod_sku', headerName: 'Product SKU', width: 130 },
  { field: 'location', headerName: 'Storage Location', width: 130 },
  { field: 'qty', headerName: 'Quantity', type: 'number', width: 100 },
];

function InventoryScreen() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [toggleCreate, setToggleCreate] = useState(false);

  const fetchInventory = async () => {
    try {
      const response = await axios.get('/api/inventory');
      setRows(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const clickedCreate = () => {
    setToggleCreate(true);
  }

  const closeCreate = async () => {
    await fetchInventory();
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
                Inventory screen
              </Typography>
            </Grid>
            <div className="spacer"></div>
            <Grid item>
              <Button onClick={clickedCreate} variant="contained">Add Inventory</Button>
            </Grid>
          </Grid>
          <div style={{ height: 400, width: '95%', margin: '0 auto' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              checkboxSelection
              getRowId={(row) => row.id}
            />
          </div>
        </div>
      )}
      {toggleCreate && (
        <div>
          <CreateInventoryForm closeCreate={closeCreate}></CreateInventoryForm>
        </div>
      )}
      
    </div>
  );
}

  
export default InventoryScreen;