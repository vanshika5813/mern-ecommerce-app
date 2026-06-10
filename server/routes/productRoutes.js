const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

console.log("Product =", Product);
console.log("Product.find =", Product.find);

// Add product
router.post("/add", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

// Get products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
// DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Delete failed",
    });
  }
});
// UPDATE PRODUCT
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: "Update Failed",
    });
  }
});