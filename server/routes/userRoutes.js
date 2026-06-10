const express = require("express");
const router = express.Router();

const User = require("../models/User");

// REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = new User({
      name,
      email,
      password,
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Registration failed",
    });
  }
});

module.exports = router;

// LOGIN USER
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    res.json({
      message: "Login Successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Login Failed",
    });
  }
});