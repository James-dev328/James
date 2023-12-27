/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams, Navigate } from "react-router-dom";
import { Box, Button, Container, Grid, Typography, Card, CardContent, CardMedia, CardActions} from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import PriceRangeSlider from "../Components/PriceRangeSlider";
import Multiselect from "multiselect-react-dropdown";
import api from "../services/api.service";

const AllProducts =({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [notFound, setNotFound] = useState(false);
  const [open, setOpen] = useState(false); //to snackbar
  const [allCategories, setAllCategories] = useState([]);

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
    <React.Fragment>
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
    </React.Fragment>
  );

  
   useEffect(() => {
    async function getProducts() {
      const page = parseInt(searchParams.get("page"), 10) || 1;
      if (page < 1) searchParams.set("page", 1);
      setSearchParams(searchParams);

      const options = {
        params: {
          name: searchParams.get("name"),
          minPrice: searchParams.get("minPrice") || 0,
          maxPrice: searchParams.get("maxPrice") || 2000,
          inStock: searchParams.get("inStock"),
          page: page,
          limit: 6,
          categories:  searchParams.get("categories") || [],
        },
      };
      
      try {
        const response = await api.get("/products", options);
        const { products, total, page, pages, categories } = response.data;
        if (products.length === 0) {
          setNotFound(true); // Set notFound to true if no products found
        } else {
          setProducts(products);
          setTotalPages(pages);
          setCurrentPage(parseInt(searchParams.get("page"), 10) || 1);
          setAllCategories(categories)
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    getProducts();
  }, [searchParams, setSearchParams]);



  //HANDLE CATEGORIES FILTERING

  const categoriesOptions =
    allCategories.map((catName) => {
      return { name: catName };
    }) || [];

  // Initialize selectedValues, filter out empty strings
  const initialSelectedValues = (searchParams.get("categories") || "")
    .split(",")
    .filter((category) => category.trim() !== "");

  const [selectedValues, setSelectedValues] = useState(
    initialSelectedValues.map((catName) => {
      return { name: catName };
    }) || []
  );

  const onSelect = (selectedList) => {
    console.log("selected list:", selectedList);
    setSelectedValues(selectedList);

    searchParams.set(
      "categories",
      selectedList.map((item) => item.name).join(",")
    );
    setSearchParams(searchParams);
    searchParams.set("page", 1);
  };

  const onRemove = (selectedList) => {
    setSelectedValues(selectedList);
    searchParams.set(
      "categories",
      selectedList.map((item) => item.name).join(",")
    );
    setSearchParams(searchParams);
    searchParams.set("page", 1);
  };



  function handleFilterChange(ev) {
    const inputName = ev.target.name;

    if (ev.target.type === "checkbox") {
      const checked = ev.target.checked;
      searchParams.set(inputName, checked);
    } else {
      const value = ev.target.value;
      searchParams.set(inputName, value);
    }

    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  function handlePagination(event, value) {
    searchParams.set("page", value);
    setCurrentPage(value);
    setSearchParams(searchParams);
  }

  if(products.length === 0) return;

  if (notFound) {
    return <Navigate to="/404" />;
  }

  return (
    <>
      <Box sx={{ p: 3 }}>
      <Button 
        component={Link} 
        to="create" 
        variant="contained" 
        color="primary" 
        sx={{ mb: 2 }}
      >
        Create Product
      </Button>
      <Box sx={{spaceY: 2 , bgcolor:"#F0F4F7", p: 2}}>
        <Typography variant="h6" gutterBottom>
          Filter Products
        </Typography>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={searchParams.get("inStock") === "true" || false}
                onChange={handleFilterChange}
                name="inStock"
                color="primary"
              />
            }
            label="In Stock"
          />
        </Box>
        <Box>
          <TextField
            label="Product name..."
            type="text"
            name="name"
            value={searchParams.get("name") || ""}
            onChange={handleFilterChange}
            variant="outlined"
            sx={{ mb: 2, width: '100%' }}
          />
        </Box>
        <div className="m-0">
        <label
          htmlFor="categoriesFilter"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <div id="categoriesFilter" className="">
          <Multiselect
            style={{
              searchBox: {
                border: "1px solid #D1D5DB",
                borderRadius: "0.375rem",
                padding: "0.5rem",
                marginTop: "0.25rem",
              },
              multiselectContainer: {
                // marginTop: "0",
              },
            }}
            placeholder="Select categories (multiple)"
            options={categoriesOptions}
            selectedValues={selectedValues}
            onSelect={onSelect}
            onRemove={onRemove}
            displayValue="name"
          />
        </div>
      </div>
        <PriceRangeSlider searchParams={searchParams} setSearchParams={setSearchParams}/>
      </Box>
    </Box>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  src="https://i0.wp.com/ten-low.co.il/wp-content/uploads/2024/01/HP_LAPTOP_I7_ON_SALE.jpg?fit=1000%2C1000&ssl=1" // Use a default image if product.image is not available
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
                  <Button 
                    size="small" 
                    color="secondary" 
                    onClick={() => {
                      addToCart(product);
                      handleClick();
                    }}
                  > Add to Cart
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
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination 
          count={totalPages} 
          page={currentPage} 
          onChange={handlePagination} 
          color="secondary" 
          shape="rounded" 
        />
      </Box>
    </>
  )
}

export default AllProducts