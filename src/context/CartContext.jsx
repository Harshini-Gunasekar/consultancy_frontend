
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [error, setError] = useState(null);

  // Refresh userId from localStorage if needed
  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    if (storedId && storedId !== userId) {
      setUserId(storedId);
    }
  }, [userId]);

  // Fetch cart items from backend
  useEffect(() => {
    if (!userId) return;

    const token = localStorage.getItem('authToken'); // Get token from localStorage
    if (!token) {
      setError('User is not authenticated.');
      return;
    }

    axios.get(`https://consultancy-backend-6.onrender.com/api/cart/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Add token in headers
      }
    })
      .then(response => {
        setCartItems(response.data.items || []);
      })
      .catch(err => {
        setError('Failed to fetch cart data. Please try again later.');
        console.error(err);
      });
  }, [userId]);

  const addToCart = (product) => {
    if (!userId) {
      alert('Please log in to add items to your cart.');
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('User is not authenticated.');
      return;
    }

    axios.post('https://consultancy-backend-6.onrender.com/api/cart/add', {
      userId,
      productId: product._id,
      quantity: 1
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => {
        setCartItems(response.data.items);
      })
      .catch(err => {
        setError('Failed to add item to cart. Please try again.');
        console.error(err);
      });
  };

  const removeFromCart = (productId) => {
    if (!userId) {
      alert('Please log in to remove items from your cart.');
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('User is not authenticated.');
      return;
    }

    axios.post('https://consultancy-backend-6.onrender.com/api/cart/remove', {
      userId,
      productId
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => {
        setCartItems(response.data.items);
      })
      .catch(err => {
        setError('Failed to remove item from cart. Please try again.');
        console.error(err);
      });
  };

  const clearCart = () => {
    if (!userId) {
      alert('Please log in to clear the cart.');
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('User is not authenticated.');
      return;
    }

    axios.post('https://consultancy-backend-6.onrender.com/api/cart/clear', { userId }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(() => {
        setCartItems([]);
      })
      .catch(err => {
        setError('Failed to clear the cart. Please try again.');
        console.error(err);
      });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, error }}>
      {children}
    </CartContext.Provider>
  );
};
