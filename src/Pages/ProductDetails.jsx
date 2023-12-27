import { useEffect, useState } from 'react';
import Product from '../Components/Product';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import api from '../services/api.service';

function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL = `products/${productId}`;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await api.get(URL);
        setDetails(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleClick = () => {
    navigate('/products');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Product details={details} setDetails={setDetails} />
      <Button variant="contained" color="secondary" onClick={handleClick} sx={{ mb: 2, ml: 42 }}>
        Back to Products
      </Button>
    </div>
  );
}

export default ProductDetails;
