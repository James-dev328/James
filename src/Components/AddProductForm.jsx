/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 
import api from '../services/api.service';

function AddProductForm() {
    const [newProductName, setNewProductName] = useState("");
    const [newProductPrice, setNewProductPrice] = useState("");
    const [newProductQuantity, setNewProductQuantity] = useState(1);
    const [newProductCategory, setnewProductCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const navigateBack = useNavigate();
    const { loggedInUser } = useContext(AuthContext);

    function goBack () {
      navigateBack(-1);
    }

    async function createNewProduct (ev) {
      if (newProductName !== "" && newProductPrice!== "" && newProductCategory !== "" && newProductQuantity >= 1){
        ev.preventDefault();
        if (!loggedInUser) {
          alert('You must be logged in to add products.');
          return;
        }
        try {
          const newProduct = {
            name: newProductName,
            price: newProductPrice,
            quantity: newProductQuantity,
            categories: newProductCategory.split(", "),
            user: loggedInUser.userId
          };
          setLoading(true);
          await api.post("products/create", newProduct);
          setNewProductName("");
          setNewProductPrice("");
          setNewProductQuantity(1);
          setnewProductCategory("");
          goBack();
        } catch (error) {
          console.error(error)
        } 
        finally {
          setLoading(false);
        }
      }
  }

  if (!loggedInUser) {
    return <p>You must be logged in to add products.</p>; 
  }

    return (
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%', 
          mt: 2, 
        }}
      >
        <Box component="form" onSubmit={createNewProduct} sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: 2, 
            width: '100%', 
            marginBottom: '2rem' ,
          }}>
           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Add New Product
          </Typography>  
          <TextField 
            label="Add product name..."
            id="fullWidth"
            value={newProductName} 
            onChange={(ev) => setNewProductName(ev.target.value)} 
            sx={{ flex: 1 }} 
            fullWidth
            required
          />
          <TextField 
            label="Add price..."
            type="number"
            id="fullWidth"
            value={newProductPrice} 
            onChange={(ev) => setNewProductPrice(ev.target.value)} 
            sx={{ flex: 1 }} 
            fullWidth
            required
          />
          <TextField 
            label="Add quantity..."
            type="number"
            id="fullWidth"
            value={newProductQuantity} 
            onChange={(ev) => setNewProductQuantity(ev.target.value)} 
            sx={{ flex: 1 }} 
            fullWidth
            required
          />
            <TextField 
            label="Add category..."
            id="fullWidth"
            value={newProductCategory} 
            onChange={(ev) => setnewProductCategory(ev.target.value)} 
            sx={{ flex: 1 }}
            fullWidth
            required
          />
           <Tooltip title="Add Product">
            <Box sx={{ width: '100%' }}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                disabled={loading}
                sx={{ height: '56px' }}
                fullWidth
                required
              >
              {loading ? <CircularProgress size={24} /> : <AddIcon />}
              </Button>
            </Box>
          </Tooltip>
        </Box>
      </Box>
      )
  }


export default AddProductForm