
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/productDetail.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(""); // Default to no size selected
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user"))); // Get logged-in user from localStorage

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://consultancy-backend-6.onrender.com/api/product/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = async (product) => {
    if (!user) {
      alert("Please log in to add items to the cart.");
      return;
    }

    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    try {
      const response = await axios.post(`https://consultancy-backend-6.onrender.com/api/cart/add`, {
        userId: user.userId,
        productId: product._id,
        quantity: quantity,
      });

      if (response.status === 200) {
        addToCart(product);
        alert("Product added to your cart!");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-page">
      <div className="product-details-card">
        <h2 className="product-title">{product.name}</h2>
        <div className="product-details-content">
          <img
            src={`https://consultancy-backend-6.onrender.com${product.imageUrl}`}
            alt={product.name}
            className="product-image"
          />
          <div className="product-info">
            <p className="product-price"><strong>Price:</strong> ₹{product.price}</p>
            <p className="product-description"><strong>Description:</strong> High-quality and comfortable product for everyday use.</p>

            <div className="size-selection">
              <h4>Select Size:</h4>
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="quantity-section">
              <label htmlFor="quantity"><strong>Quantity:</strong></label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
                max={product.quantity}
                className="quantity-input"
              />
            </div>

            <button
              className="add-to-cart-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
