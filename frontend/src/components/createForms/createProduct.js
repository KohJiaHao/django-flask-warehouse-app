import React, { useState } from 'react';
import { TextField, Button, Grid, CircularProgress, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import axios from 'axios';

const CreateProductForm = ({ closeCreate }) => {
  const [sku, setSku] = useState('');
  const [productName, setProductName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [createdProduct, setCreatedProduct] = useState(null);

  const handleSkuChange = (event) => {
    setSku(event.target.value);
  };

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/products', { sku, name:productName });      
      setCreatedProduct(response.data); // Store the created product
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
            label="SKU"
            variant="outlined"
            value={sku}
            onChange={handleSkuChange}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Product Name"
            variant="outlined"
            value={productName}
            onChange={handleProductNameChange}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isLoading} // Disable button while API call is in progress
          >
            {isLoading ? <CircularProgress size={24} /> : 'Create Product'}
          </Button>
        </Grid>
        {createdProduct && (
          <Grid item>
            <Typography variant="body1">
              Created Product: {createdProduct.name} (SKU: {createdProduct.sku})
            </Typography>
          </Grid>
        )}
      </Grid>
    </div>
    
  );
};

export default CreateProductForm;