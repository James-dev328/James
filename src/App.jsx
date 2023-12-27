import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import MyProducts from "./Pages/MyProducts";
import AllProducts from "./Pages/AllProducts";
import ProductDetails from "./Pages/ProductDetails";
import ModalAddProduct from "./Pages/ModalAddProduct";
import NotFoundPage from "./Pages/NotFoundPage";
import CreateNewProduct from "./Pages/CreateNewProduct";
import Navbar from "./Components/Navbar";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import Footer from "./Components/Footer";
import './index.css';
import './App.css'
import { useEffect, useState } from "react";
import AuthProvider from "./context/AuthContext";
import UserProfilePage from "./Pages/UserProfilePage";
import Cart from "./Pages/Cart";

function App() {
  const [myProducts, setMyProducts] = useState(() => {
    const savedProducts = localStorage.getItem('myProducts');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  useEffect(() => {
    localStorage.setItem('myProducts', JSON.stringify(myProducts));
  }, [myProducts]);

  const addToCart = (product) => {
    setMyProducts([...myProducts, product]);
  };

  const removeFromCart = (productId) => {
    const updatedProducts = myProducts.filter((product) => product._id !== productId);
    setMyProducts(updatedProducts);
    localStorage.setItem('myProducts', JSON.stringify(updatedProducts)); 
  };

  return (
      <div className="app-container">
        <AuthProvider>
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<HomePage addToCart={addToCart}/>} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="/products">
                <Route index element={<AllProducts addToCart={addToCart}/>} />
                <Route path="cart" element={<Cart myProducts={myProducts} removeFromCart={removeFromCart}/>} />
                <Route path="myProducts" element={<MyProducts addToCart={addToCart}/>} />
                <Route path=":productId" element={<ProductDetails />} />
                <Route path="create" element={<ModalAddProduct />}>
                  <Route index element={<CreateNewProduct />} />
                </Route>
              </Route>
              <Route path="/users/:userId" element={<UserProfilePage/>}/>
              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
        </AuthProvider>
      </div>
  );
}

export default App
