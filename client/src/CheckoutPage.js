import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function CheckoutPage() {
  const cart = useSelector((state) => state.cart.items);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
const handlePlaceOrder = async () => {
  try {
    const orderData = {
      items: cart.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount: totalPrice,
    };

    const res = await axios.post(
      "https://mern-ecommerce-app-g5mh.onrender.com/api/orders",
      orderData
    );

    alert("Order Saved Successfully!");
    console.log(res.data);
  } catch (error) {
    console.error(error);
    alert("Failed to save order");
  }
};
  return (
  <div className="container">
    <h1 className="page-title">Checkout</h1>

    {cart.length === 0 ? (
      <p>Your cart is empty</p>
    ) : (
      <>
        {cart.map((item) => (
          <div
            key={item._id}
            className="checkout-card"
          >
            <h3>{item.name}</h3>

            <p>Price: ₹{item.price}</p>

            <p>Quantity: {item.quantity}</p>

            <p>
              Subtotal: ₹
              {item.price * item.quantity}
            </p>
          </div>
        ))}

        <div className="checkout-total">
          <h2>Total Amount: ₹{totalPrice}</h2>

          <button
            className="primary-btn"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </>
    )}
  </div>
);
}

export default CheckoutPage;