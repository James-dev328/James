/* eslint-disable react/prop-types */
import { Grid, Typography } from '@mui/material';
import ProductCard from '../Components/productCard';

function Cart({ myProducts, removeFromCart }) {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom sx={{ my: 2, mx: 2 }}>
        My Cart
      </Typography>
      {myProducts.length === 0 ? (
        <p>No products added to cart yet.</p>
      ) : (
        <Grid container spacing={4} sx={{ mb: 2 }}>
          {myProducts.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <ProductCard product={product} onRemove={removeFromCart} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default Cart;