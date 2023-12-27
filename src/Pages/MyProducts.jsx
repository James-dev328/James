/* eslint-disable react/prop-types */

/* eslint-disable no-unused-vars */
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Button, Grid, Typography, Card, CardContent, CardMedia, CardActions, IconButton} from '@mui/material';
import { Link} from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api.service';

const MyProducts = ({addToCart}) => {
  const { loggedInUser } = useContext(AuthContext);
  console.log(loggedInUser);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false); //to snackbar

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  const action = (
    <Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  useEffect(() => {
    const fetchUserProducts = async () => {
      if (!loggedInUser?.token) {
        console.error('User is not logged in');
        return;
      }

      try {
        console.log('Fetching products for user:', loggedInUser);
        const response = await api.get(`products/myProducts`);
        console.log('Response:', response.data);
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching user products:', error);
      } 
    };

    fetchUserProducts();
  }, [loggedInUser]);


  if (!loggedInUser) {
    return <p>You must be logged in to see your products.</p>; 
  }
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom sx={{my:2, mx:2}}>
        My Products
      </Typography>
      {products.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <Grid container spacing={4} sx={{mb:2}}>
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <Card>
              <CardMedia
                  component="img"
                  height="200"
                  src="https://i0.wp.com/ten-low.co.il/wp-content/uploads/2024/01/HP_LAPTOP_I7_ON_SALE.jpg?fit=1000%2C1000&ssl=1"
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.categories.join(", ")}
                  </Typography>
                  <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                    ${product.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" component={Link} to={`/products/${product._id}`}>
                    View Details
                  </Button>
                  <Button size="small" color="secondary" onClick={() => {addToCart(product); handleClick();}}>
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  )
}

export default MyProducts