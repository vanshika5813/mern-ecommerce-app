import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://mern-ecommerce-app-g5mh.onrender.com/api/users/login",
        {
          email,
          password,
        }
      );

      alert("Login Successful!");

localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
  <div className="form-container">
    <h2 className="page-title">Login</h2>

    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="primary-btn"
      >
        Login
      </button>
    </form>
  </div>
);
}

export default LoginPage;
