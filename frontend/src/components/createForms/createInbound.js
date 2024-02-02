import React, { useState } from 'react';
import { TextField, Button, Grid, CircularProgress, Typography, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

const CreateInboundForm = ({ closeCreate }) => {
  const [reference, setReference] = useState('');
  const [dateReceived, setDateReceived] = useState('');
  const [qty, setQty] = useState('');
  const [supplier, setSupplier] = useState('');
  const [location, setLocation] = useState('');
  const [remarks, setRemarks] = useState('');
  const [prodSku, setProdSku] = useState('');
  const [status, setStatus] = useState('Pending');

  const [isLoading, setIsLoading] = useState(false);
  const [createdInbound, setCreatedInbound] = useState(null);

  const handleSkuChange = (event) => {
    setProdSku(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  
  const handleDateReceived = (event) => {
    setDateReceived(event.target.value);
  };
  
  const handleRefChange = (event) => {
    setReference(event.target.value);
  };
  
  const handleSupplierChange = (event) => {
    setSupplier(event.target.value);
  };
  
  const handleQtyChange = (event) => {
    setQty(event.target.value);
  };
  
  const handleRemarksChange = (event) => {
    setRemarks(event.target.value);
  };
  
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/inbound', { prod_sku:prodSku, location, qty, reference,supplier, remarks, status, date_received:dateReceived });      
      setCreatedInbound(response.data); 
      // Pause execution for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      closeCreate();
    }
  };

  return (
    <div>
      <Button sx={{float:'left'}} onClick={closeCreate} startIcon={<ArrowBack />}>Back</Button>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <TextField
            label="Reference ID" variant="outlined" value={reference}
            onChange={handleRefChange}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Product SKU" variant="outlined" value={prodSku}
            onChange={handleSkuChange}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Location" variant="outlined" value={location}
            onChange={handleLocationChange}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Quantity" variant="outlined" type="number" value={qty} 
            onChange={handleQtyChange}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Supplier" variant="outlined" value={supplier} 
            onChange={handleSupplierChange}
          />
        </Grid>
        <Grid item>
        <div>
          <label htmlFor="dateReceived">Date Received:</label>
          <input
            type="date"
            id="dateReceived"
            name="dateReceived"
            value={dateReceived}
            onChange={handleDateReceived}
          />
        </div>
        </Grid>
        <Grid item>
          <TextField
            label="Remarks" variant="outlined" value={remarks} 
            onChange={handleRemarksChange}
          />
        </Grid>
        <Grid item>
          {/* <TextField
            label="Status" variant="outlined" value={status}
            onChange={handleStatusChange}
          /> */}
          <TextField
            id="status"
            select
            label="Select"
            defaultValue="Pending"
            value={remarks}
            onChange={handleStatusChange}
            // helperText="Please select"
          >
            {['Pending', 'Completed'].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isLoading} // Disable button while API call is in progress
          >
            {isLoading ? <CircularProgress size={24} /> : 'Create Inbound'}
          </Button>
        </Grid>
        {createdInbound && (
          <Grid item>
            <Typography variant="body1">
              Created Inbound. Inbound ID: {createdInbound.id}
            </Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default CreateInboundForm;