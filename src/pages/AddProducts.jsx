import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProducts() {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleAddProduct = async () => {
    try {
      const response = await fetch('https://consultancy-backend-6.onrender.com/api/product/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName,
          quantity,
          price,
          category,
          image,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Product added successfully');
        navigate('/products');
      } else {
        alert(data.error || 'Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Server error');
    }
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
        <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
        <button type="button" onClick={handleAddProduct}>Add Product</button>
      </form>
    </div>
  );
}

export default AddProducts;
