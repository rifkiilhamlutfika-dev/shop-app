const path = require("path");
const methodOverride = require("method-override");
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
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const products = await Product.find();
  res.render("products/index", { products: products, category: "All" });
});

app.get("/products", async (req, res) => {
  const { category } = req.query;
  let products = [];
  if (category) {
    products = await Product.find({ category: category });
    if (products.length == 0) res.render("not_found");
    res.render("products/index", { products: products, category });
  } else {
    products = await Product.find({});
    res.render("products/index", { products: products, category: "All" });
  }
});

app.get("/product/create", (req, res) => {
  res.render("products/create");
});

app.get("/product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("products/show", { product: product });
});

app.get("/product/:id/edit", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.render("not_found");
  try {
    const product = await Product.findById(req.params.id);
    if (!product) res.render("not_found");
    else res.render("products/edit", { product: product });
  } catch (error) {
    console.log(error);
  }
});

app.post("/product", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.redirect(`/product/${product._id}`);
});

app.put("/product/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    runValidator: true,
  });
  res.redirect(`/product/${product._id}`);
});

app.delete("/product/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
});

app.use((req, res) => {
  res.render("not_found");
});

app.listen(port, () => {
  console.log(`Shop app listening on http://localhost:${port}`);
});
