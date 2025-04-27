const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const port = 8008 || 3000;

const app = express();

/* Models */
const Product = require("./models/product");

// connect to mongodb --
mongoose
  .connect("mongodb://127.0.0.1/shop_db")
  .then((result) => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.render("products/index", { products: products });
});

app.get("/product/create", (req, res) => {
  res.render("products/create");
});

app.get("/product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("products/show", { product: product });
});

app.post("/product", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.redirect(`/product/${product._id}`);
});

app.listen(port, () => {
  console.log(`Shop app listening on http://localhost:${port}`);
});
