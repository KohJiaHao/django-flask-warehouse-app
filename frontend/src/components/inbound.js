import { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import MenuAppBar from './navigation/appbar';
import CreateInboundForm from './createForms/createInbound';

const columns = [
  { field: 'reference', headerName: 'Reference ID', width: 100 },
  { field: 'date_received', headerName: 'Date Received', width: 100, type: 'date', valueGetter: ({ value }) => value && new Date(value)},
  { field: 'prod_sku', headerName: 'Product SKU', width: 100 },
  { field: 'qty', headerName: 'Quantity', type: 'number', width: 100 },
  { field: 'supplier', headerName: 'Supplier', width: 100 },
  { field: 'location', headerName: 'Storage Location', width: 100 },
  { field: 'remarks', headerName: 'Remarks', width: 200 },
  { field: 'status', headerName: 'Status', width: 100 },
];

function InboundScreen() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [toggleCreate, setToggleCreate] = useState(false);

  const fetchList = async () => {
    try {
      const response = await axios.get('/api/inbound');
      setRows(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const clickedCreate = () => {
    setToggleCreate(true);
  }

  const closeCreate = async () => {
    await fetchList();
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
                Inbound screen
              </Typography>
            </Grid>
            <div className="spacer"></div>
            <Grid item>
              <Button onClick={clickedCreate} variant="contained">Add Inbound</Button>
            </Grid>
          </Grid>
          <div style={{ height: 400, width: '95%', margin: '0 auto' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              checkboxSelection
              getRowId={(row) => row.reference}
            />
          </div>
        </div>
      )}
      {toggleCreate && (
        <div>
          <CreateInboundForm closeCreate={closeCreate}></CreateInboundForm>
        </div>
      )}
      
    </div>
  );
}

  
export default InboundScreen;