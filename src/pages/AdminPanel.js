import React, { useState } from "react";
import "./Products.css";

const AdminPanel = () => {
  const [product, setProduct] = useState({ name: "", price: "", image: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!product.name || !product.price) {
      setMessage("Please fill in all fields.");
      return;
    }

    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = [...savedProducts, product];
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProduct({ name: "", price: "", image: "" });
    setMessage("✅ Product added successfully!");
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Panel – Add Product</h2>
      <div className="admin-form">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price (KSh)"
          value={product.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={product.image}
          onChange={handleChange}
        />
        <button onClick={handleAdd} className="admin-btn">Add Product</button>
        {message && <p className="admin-message">{message}</p>}
      </div>
    </div>
  );
};

export default AdminPanel;
