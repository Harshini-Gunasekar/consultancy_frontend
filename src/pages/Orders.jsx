
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/order.css";

const Orders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`https://consultancy-backend-6.onrender.com/api/order/${user.userId}`);
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders', err);
        setError('Failed to fetch orders. Please try again later.');
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user.userId]);

  return (
    <div className="orders-container">
      <h1>Your Past Orders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : orders.length === 0 ? (
        <p>You have no past orders.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <h3>Order ID: {order._id}</h3>
            <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
            <p><strong>Payment Mode:</strong> {order.paymentMode || 'N/A'}</p>
            <p><strong>Payment Status:</strong> 
              <span className={
                order.paymentStatus === "Rejected" ? "rejected-status" : 
                order.paymentStatus === "Paid" ? "delivered-status" : 
                "pending-status"
              }>
                {order.paymentStatus || 'Pending'}
              </span>
            </p>
            <p><strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>

            {order.paymentStatus === "Rejected" && (
              <button className="rejected-btn">❌ Order Rejected</button>
            )}
            {order.paymentStatus === "Paid" && (
              <button className="mark-delivered-btn">✅ Product Received</button>
            )}

            <h4>Products:</h4>
            <ul className="product-list">
              {order.products.map((product, index) => (
                <li key={index} className="product-item">
                  {product.productImage && (
                    <img 
                      src={`https://consultancy-backend-6.onrender.com${product.productImage}`} 
                      alt={product.productName} 
                      className="product-image"
                    />
                  )}
                  <span>{product.productName} — {product.quantity} x ₹{product.productPrice}</span>
                </li>
              ))}
            </ul>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
