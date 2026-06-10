import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/products"
    );

    setProducts(res.data);
  } catch (error) {
    console.error(error);
  }
};

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/products/add",
        {
          name,
          price,
          category,
          image,
          description,
        }
      );
      

    fetchProducts();

      alert("Product Added Successfully!");

      setName("");
      setPrice("");
      setCategory("");
      setImage("");
      setDescription("");
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    }
  };

  const handleDelete = async (id) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/products/${id}`
    );

    alert("Product Deleted!");

    fetchProducts();
  } catch (error) {
    console.error(error);
    alert("Delete Failed");
  }
};

const handleUpdate = async () => {
  try {
    await axios.put(
      `http://localhost:5000/api/products/${editingId}`,
      {
        name,
        price,
        category,
        image,
        description,
      }
    );

    alert("Product Updated!");

    setEditingId(null);

    setName("");
    setPrice("");
    setCategory("");
    setImage("");
    setDescription("");

    fetchProducts();
  } catch (error) {
    console.error(error);
    alert("Update Failed");
  }
};

const [editingId, setEditingId] = useState(null);

  useEffect(() => {
  fetchProducts();
}, []);

 return (
  <div className="container">
    <h1 className="page-title">Admin Panel</h1>

    <div className="form-container">
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {editingId ? (
          <button
            type="button"
            className="primary-btn"
            onClick={handleUpdate}
          >
            Update Product
          </button>
        ) : (
          <button
            type="submit"
            className="primary-btn"
          >
            Add Product
          </button>
        )}
      </form>
    </div>

    <h2 className="page-title">All Products</h2>

    {products.map((product) => (
      <div
        key={product._id}
        className="admin-card"
      >
        <h3>{product.name}</h3>

        <p>₹{product.price}</p>

        <p>{product.category}</p>

        <div className="cart-actions">
          <button
            className="primary-btn"
            onClick={() =>
              handleDelete(product._id)
            }
          >
            Delete
          </button>

          <button
            className="primary-btn"
            onClick={() => {
              setEditingId(product._id);

              setName(product.name);
              setPrice(product.price);
              setCategory(product.category);
              setImage(product.image);
              setDescription(product.description);
            }}
          >
            Edit
          </button>
        </div>
      </div>
    ))}
  </div>
);
}

export default AdminPage;