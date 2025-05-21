import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import "../styles/ordersuccess.css";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  return (
    <div className="order-success-container">
      <div className="order-success-content">
        <h1>🎉 Order Placed Successfully!</h1>

        {order ? (
          <>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
          </>
        ) : (
          <p>Thank you for your purchase!</p>
        )}

        <div className="order-buttons">
          <button onClick={() => navigate("/")} className="back-home-btn">Back to Home</button>

          {/* View My Orders Button */}
          <Link to="/orders">
            <button className="view-orders-btn">View My Orders</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
