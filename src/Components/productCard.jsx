/* eslint-disable react/prop-types */
import { Button, Card, CardContent, CardMedia, CardActions, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function ProductCard({ product, onRemove, onAddToCart, showSnackbar }) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        src={'https://i0.wp.com/ten-low.co.il/wp-content/uploads/2024/01/HP_LAPTOP_I7_ON_SALE.jpg?fit=1000%2C1000&ssl=1'}
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
        {onAddToCart && (
          <>
            <Button size="small" color="secondary" onClick={onAddToCart}>
              Add to Cart
            </Button>
            {showSnackbar}
          </>
        )}
        {onRemove && (
          <Button size="small" color="secondary" onClick={() => onRemove(product._id)}>
            Remove from Cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default ProductCard;