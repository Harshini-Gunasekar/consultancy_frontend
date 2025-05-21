
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ManageProducts.css";

const ManageProducts = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "Kids",
    price: "",
    quantity: "",
    image: null,
  });

  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Load all products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://consultancy-backend-6.onrender.com/api/product");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("quantity", formData.quantity);
    if (formData.image) formDataToSend.append("image", formData.image);

    try {
      if (editId) {
        await axios.put(`https://consultancy-backend-6.onrender.com/api/product/${editId}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        setSuccessMessage("✅ Product updated successfully!");
      } else {
        await axios.post("https://consultancy-backend-6.onrender.com/api/product", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        setSuccessMessage("✅ Product added successfully!");
      }

      setFormData({
        name: "",
        category: "Kids",
        price: "",
        quantity: "",
        image: null,
      });
      setEditId(null);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
      setErrorMessage("❌ Operation failed. Try again.");
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
      image: null,
    });
    setEditId(product._id);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`https://consultancy-backend-6.onrender.com/api/product/${id}`, { withCredentials: true });
      setSuccessMessage("🗑️ Product deleted successfully.");
      fetchProducts();
    } catch (err) {
      console.error("Delete error:", err);
      setErrorMessage("❌ Failed to delete product.");
    }
  };

  return (
    <div className="manage-products">
      <h2>{editId ? "Update Product" : "Add a New Product"}</h2>

      <form className="product-form" onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Category:</label>
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="Kids">Kids</option>
          <option value="Women">Women</option>
          <option value="Men">Men</option>
        </select>

        <label>Price (₹):</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} min="1" required />

        <label>Quantity:</label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min="1" required />

        <label>Image Upload:</label>
        <input type="file" name="image" accept="image/*" onChange={handleChange} />

        <button type="submit" className="submit-btn">
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <h3>Product List</h3>
      <div className="product-grid">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            {p.imageUrl && (
              <img
                src={`https://consultancy-backend-6.onrender.com${p.imageUrl}`}
                alt={p.name}
                className="product-image"
              />
            )}
            <div className="product-info">
              <p className="product-name">{p.name}</p>
              <p className="product-price">Price: ₹{p.price}</p>
              <p className="product-quantity">Quantity: {p.quantity}</p>
              <p className="product-category">Category: {p.category}</p>
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(p)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(p._id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;
