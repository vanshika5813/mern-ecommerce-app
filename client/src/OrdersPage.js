import React, { useEffect, useState } from "react";
import axios from "axios";

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/orders"
      );

      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
  <div className="container">
    <h1 className="page-title">Order History</h1>

    {orders.length === 0 ? (
      <p>No Orders Found</p>
    ) : (
      orders.map((order) => (
        <div key={order._id} className="order-card">
          <h3>Order ID</h3>

          <p>{order._id}</p>

          <p>
            <strong>Total Amount:</strong> ₹{order.totalAmount}
          </p>

          <h4>Items:</h4>

          {order.items.map((item, index) => (
            <div key={index}>
              {item.name} × {item.quantity}
            </div>
          ))}
        </div>
      ))
    )}
  </div>
);return (
  <div className="container">
    <h1 className="page-title">Order History</h1>

    {orders.length === 0 ? (
      <p>No Orders Found</p>
    ) : (
      orders.map((order) => (
        <div key={order._id} className="order-card">
          <h3>Order ID</h3>

          <p>{order._id}</p>

          <p>
            <strong>Total Amount:</strong> ₹{order.totalAmount}
          </p>

          <h4>Items:</h4>

          {order.items.map((item, index) => (
            <div key={index}>
              {item.name} × {item.quantity}
            </div>
          ))}
        </div>
      ))
    )}
  </div>
);
}

export default OrdersPage;