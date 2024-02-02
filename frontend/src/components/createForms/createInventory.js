import React, { useState } from 'react';
import { TextField, Button, Grid, CircularProgress, Typography, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import axios from 'axios';

const CreateInventoryForm = ({ closeCreate }) => {
  const [prodSku, setProdSku] = useState('');
  const [location, setLocation] = useState('');
  const [qty, setQty] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [createdInventory, setCreatedInventory] = useState(null);

  const handleSkuChange = (event) => {
    setProdSku(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  
  const handleQtyChange = (event) => {
    setQty(event.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/inventory', { prod_sku:prodSku, location, qty });      
      setCreatedInventory(response.data); 
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
            label="Product SKU"
            variant="outlined"
            value={prodSku}
            onChange={handleSkuChange}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Location"
            variant="outlined"
            value={location}
            onChange={handleLocationChange}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Quantity"
            variant="outlined"
            type="number"
            value={qty} 
            onChange={handleQtyChange}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isLoading} // Disable button while API call is in progress
          >
            {isLoading ? <CircularProgress size={24} /> : 'Create Inventory'}
          </Button>
        </Grid>
        {createdInventory && (
          <Grid item>
            <Typography variant="body1">
              Created Inventory. Inventory ID: {createdInventory.id}
              {/* Created Inventory: {createdInventory} */}
            </Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default CreateInventoryForm;