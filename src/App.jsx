
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetails from './pages/ProductDetails';
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import AdminDashboard from "./pages/AdminDashboard";
import OrderSuccess from './pages/OrderSuccess'; 
import Orders from './pages/Orders'; 
// Adjust path if needed

import Signup from "./pages/Signup"; // Add the import for Signup
import axios from "axios"; // For checking user authentication status from backend

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Make an API call to verify if the user is authenticated
        const response = await axios.get('https://consultancy-backend-6.onrender.com/api/user/profile', { withCredentials: true });
        if (response.data) {
          setUser(response.data); // Set the user if authenticated
        }
      } catch (error) {
        console.error('Not authenticated:', error);
      }
    };

    checkAuthStatus(); // Run on mount to check authentication
  }, []);

  return (
    <CartProvider>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} /> {/* Add the signup route */}
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate to="/auth" />}
        />
       <Route path="/admin" element={user && user.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orders" element={<Orders />} />


      </Routes>
    </CartProvider>
  );
}

export default App;
