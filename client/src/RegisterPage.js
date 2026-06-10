import React, { useState } from "react";
import axios from "axios";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name,
          email,
          password,
        }
      );

      alert("Registration Successful!");
      console.log(res.data);
    } catch (error) {
  console.log(error.response?.data);

  alert(
    error.response?.data?.message || "Registration Failed"
  );
}
  };

  return (
  <div className="form-container">
    <h2 className="page-title">Register</h2>

    <form onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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
        Register
      </button>
    </form>
  </div>
);
}

export default RegisterPage;