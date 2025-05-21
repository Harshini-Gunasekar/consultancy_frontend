
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/cart.css";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const [placingOrder, setPlacingOrder] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setError('Please log in to view your cart');
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await axios.get(`https://consultancy-backend-6.onrender.com/api/cart/${user.userId}`);
        if (response.data && response.data.products) {
          setCart({ items: response.data.products });
        } else {
          setCart({ items: [] });
        }
      } catch (err) {
        setError('Cart is empty');
        console.error(err);
      }
    };

    fetchCart();
  }, [user]);

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.post('https://consultancy-backend-6.onrender.com/api/cart/remove', {
        userId: user.userId,
        productId,
      });

      if (response.data && response.data.products) {
        setCart({ items: response.data.products });
      } else {
        setError('Error removing product from cart');
      }
    } catch (err) {
      setError('Error removing product from cart');
      console.error("Error:", err);
    }
  };

  const clearCart = async () => {
    try {
      const response = await axios.delete(`https://consultancy-backend-6.onrender.com/api/cart/clear/${user.userId}`);
      if (response.data && response.data.message === 'Cart cleared') {
        setCart({ items: [] });
        alert('Your cart has been cleared');
      } else {
        setError('Error clearing cart');
      }
    } catch (err) {
      setError('Error clearing cart');
      console.error(err);
    }
  };

  const placeOrder = async () => {
    setPlacingOrder(true);
    try {
      const response = await axios.post('https://consultancy-backend-6.onrender.com/api/order/place', {
        userId: user.userId
      });

      if (response.data && response.data.order) {
        alert('Order placed successfully!');
        setCart({ items: [] });
        navigate('/order-success', { state: { order: response.data.order } });
      } else {
        alert('Failed to place order');
      }
    } catch (err) {
      alert('Something went wrong while placing the order');
      console.error(err);
    } finally {
      setPlacingOrder(false);
    }
  };

  if (error) return <div className="error-message">{error}</div>;
  if (!cart) return <div>Loading your cart...</div>;

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      {!cart.items || cart.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.items.map((item, index) => {
              const price = item.productPrice ? parseFloat(item.productPrice) : 0;
              const total = price * item.quantity;

              return (
                <tr key={index}>
                  <td>
                    <img
                      src={`https://consultancy-backend-6.onrender.com${item.productImage}`}
                      alt={item.productName}
                      className="cart-product-image"
                    />
                  </td>
                  <td>{item.productName}</td>
                  <td>₹{price}</td>
                  <td>{item.quantity}</td>
                  <td>₹{total}</td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.productId)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {cart?.items?.length > 0 && (
        <div className="cart-actions">
          <button onClick={clearCart} className="clear-cart-btn">
            Clear Cart
          </button>
          <button
            onClick={placeOrder}
            className="checkout-btn"
            disabled={placingOrder}
          >
            {placingOrder ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
