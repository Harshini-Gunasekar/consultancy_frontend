
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminOrders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get("https://consultancy-backend-6.onrender.com/api/order/admin/all");
      setOrders(response.data);
    } catch (err) {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Handle Mark as Delivered
  const handleMarkAsDelivered = async (orderId) => {
    try {
      await axios.patch(`https://consultancy-backend-6.onrender.com/api/order/mark-paid/${orderId}`);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, paymentStatus: "Delivered" } : order
        )
      );
    } catch (err) {
      alert("Failed to mark as delivered");
    }
  };

  // Handle Rejection
  const handleRejectOrder = async (orderId) => {
    try {
      await axios.patch(`https://consultancy-backend-6.onrender.com/api/order/reject/${orderId}`);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, paymentStatus: "Rejected" } : order
        )
      );
    } catch (err) {
      alert("Failed to reject the order");
    }
  };

  return (
    <div className="admin-orders">
      <h2>📦 All Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p>{error}</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <h4>Order ID: {order._id}</h4>
            <p><strong>User ID:</strong> {order.userId}</p>
            <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
            <p><strong>Payment Mode:</strong> {order.paymentMode || "N/A"}</p>
            <p><strong>Payment Status:</strong>
              <span className={
                order.paymentStatus === "Rejected" ? "rejected-status" : 
                order.paymentStatus === "Delivered" ? "delivered-status" : 
                "pending-status"
              }>
                {order.paymentStatus || "Pending"}
              </span>
            </p>
            <p><strong>Placed On:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <ul>
              {order.products.map((product, idx) => (
                <li key={idx} className="product-item">
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

            {/* Action Buttons */}
            {order.paymentStatus === "Pending" && (
              <>
                <button onClick={() => handleMarkAsDelivered(order._id)} className="mark-paid-btn">
                  ✅ Mark as Delivered
                </button>
                <button onClick={() => handleRejectOrder(order._id)} className="reject-btn">
                  ❌ Reject
                </button>
              </>
            )}
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;
