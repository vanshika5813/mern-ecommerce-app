const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    const order = new Order({
      items,
      totalAmount,
    });

    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to save order",
    });
  }
});

module.exports = router;
// GET ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});