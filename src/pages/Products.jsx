
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom"; // To navigate to the ProductDetails page
import "../styles/products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Kids");
  const { addToCart } = useContext(CartContext);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://consultancy-backend-6.onrender.com/api/product");
        setProducts(response.data);
        setFilteredProducts(
          response.data.filter((product) => product.category === selectedCategory)
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = async (product) => {
    if (!user) {
      alert("Please log in to add items to the cart.");
      return;
    }

    try {
      const response = await axios.post(
        `https://consultancy-backend-6.onrender.com/api/cart/add`,
        {
          userId: user.userId,
          productId: product._id,
          quantity: 1,
        }
      );

      if (response.status === 200) {
        addToCart(product);
        alert("Product added to your cart successfully!");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to the cart.");
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`); // Navigate to the ProductDetails page
  };

  return (
    <div className="products-page">
      <h2>Products</h2>

      <div className="category-toggle">
        <button
          onClick={() => handleCategoryChange("Kids")}
          className={selectedCategory === "Kids" ? "active" : ""}
        >
          Kids
        </button>
        <button
          onClick={() => handleCategoryChange("Men")}
          className={selectedCategory === "Men" ? "active" : ""}
        >
          Men
        </button>
        <button
          onClick={() => handleCategoryChange("Women")}
          className={selectedCategory === "Women" ? "active" : ""}
        >
          Women
        </button>
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              className="product-card"
              key={product._id}
              onClick={() => handleProductClick(product._id)} // Navigate on click
            >
              {product.imageUrl && (
                <img src={`https://consultancy-backend-6.onrender.com${product.imageUrl}`} alt={product.name} />
              )}
              <h3>{product.name}</h3>
              <p>Price per piece: ₹{product.price}</p>
              {product.quantity && <p>Available: {product.quantity} pcs</p>}

              <button
                className="add-to-cart-btn"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation when clicking the button
                  handleAddToCart(product);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
