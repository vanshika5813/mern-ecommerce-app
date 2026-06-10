import "./App.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { fetchProducts } from "./redux/productSlice";


import {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "./redux/cartSlice";

import CheckoutPage from "./CheckoutPage";
import RegisterPage from "./RegisterPage";
import AdminPage from "./AdminPage";
import LoginPage from "./LoginPage";
import OrdersPage from "./OrdersPage";

function ProductsPage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div >
      <h1 className="page-title">Products</h1>

      {/* SEARCH */}
      <div className="search-box">
  <input
    placeholder="Search products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <button className="search-btn">
    Search
  </button>
</div>
      {/* CATEGORY */}
      <div className="category-buttons">
  <button onClick={() => setCategory("All")}>All</button>
  <button onClick={() => setCategory("Fashion")}>Fashion</button>
</div>
         <div className="product-grid"> 
      {/* PRODUCTS */}
      {products
        .filter((p) => {
          return (
            p.name.toLowerCase().includes(search.toLowerCase()) &&
            (category === "All" || p.category === category)
          );
        })
        .map((p) => (
          <div key={p._id}className="product-card"
>
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <p>{p.category}</p>

            <button className="primary-btn" onClick={() => dispatch(addToCart(p))}>
              Add to Cart
            </button>
          </div>
        ))}
    </div>
     </div>
  );
}

function CartPage() {
  
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
     <div className="container">
      <h1 className="page-title">Shopping Cart</h1>

      <h2>Total: ₹{totalPrice}</h2>


      <Link to="/checkout">
        <button className="primary-btn">
          Proceed to Checkout
        </button>
      </Link>


      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((item) => (
           <div key={item._id} className="cart-item">
            <h3>{item.name}</h3>
            <p>Price: ₹{item.price}</p>
            <p>Quantity: {item.quantity}</p>

<div className="cart-actions">
            <button onClick={() => dispatch(increaseQty(item._id))}>
              +
            </button>

            <button onClick={() => dispatch(decreaseQty(item._id))}>
              -
            </button>

            <button onClick={() => dispatch(removeFromCart(item._id))}>
              Remove
            </button>
          </div>

          </div>
        ))
      )}
    </div>
  );
}

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.reload();
}; 
  const dispatch = useDispatch(); 

  const [search, setSearch] = React.useState("");

  // PRODUCTS STATE
  const products = useSelector((state) => state.products.items);

  // CART STATE
  const cart = useSelector((state) => state.cart.items);

  const [category, setCategory] = React.useState("All");

  console.log("CART STATE:", cart);

const totalPrice = cart.reduce((sum, item) => {
  return sum + item.price * item.quantity;
}, 0);

  // FETCH PRODUCTS ON LOAD
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
  <div className="container">
    
    <div className="navbar">
  <Link to="/">Products</Link>
  <Link to="/cart">Cart</Link>
  <Link to="/orders">Orders</Link>
  <Link to="/admin">Admin</Link>

  {!user ? (
    <>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </>
  ) : (
    <>
      <span>Welcome, {user.name}</span>

      <button onClick={handleLogout}>
        Logout
      </button>
    </>
  )}
</div>
    {/* ROUTES */}
<Routes>
  <Route path="/" element={<ProductsPage />} />
  <Route path="/cart" element={<CartPage />} />
  <Route path="/checkout" element={<CheckoutPage />} />
  <Route path="/orders" element={<OrdersPage />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/admin"element={user ? <AdminPage /> : <Navigate to="/login" />}/>
  
</Routes>

  </div>
);
}

export default App;