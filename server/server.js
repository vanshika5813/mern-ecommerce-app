const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
console.log(process.env.MONGO_URI?.slice(0, 30));

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");

  const productRoutes = require("./routes/productRoutes");
  const orderRoutes = require("./routes/orderRoutes");
  const userRoutes = require("./routes/userRoutes");
  app.use("/api/products", productRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/users", userRoutes);

  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
})
.catch(err => console.log(err));
