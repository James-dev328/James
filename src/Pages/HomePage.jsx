/* eslint-disable react/prop-types */

import { Box, Button, Container, Grid, Typography, Card, CardContent, CardMedia, CardActions} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import api from '../services/api.service';

const Homepage = ({addToCart}) => {
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

  async function get2randomProducts() {
    try {
      const response = await api.get(`/products?limit=3`);
      setProducts(response.data.products); 
    } catch (error) {
      console.error("Error fetching random products:", error);
    }
  }

  useEffect(() => {
    get2randomProducts();
  }, []);

  if(products.length === 0) return;

  return (
      <Box>
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to Our Marketplace
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            Discover the best products at unbeatable prices.
          </Typography>
          <Button variant="contained" color="secondary" size="large" component={Link} to="/products">
            Shop Now
          </Button>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Featured Products
        </Typography>
        <Grid container spacing={4}>
          {products.map((product) => (
             <Grid item key={product._id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  src={'https://i0.wp.com/ten-low.co.il/wp-content/uploads/2024/01/HP_LAPTOP_I7_ON_SALE.jpg?fit=1000%2C1000&ssl=1'} // Use a default image if product.image is not available
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
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Product added to cart"
                    action={action}
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Homepage;

