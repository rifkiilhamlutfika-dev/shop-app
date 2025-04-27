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

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Shop app listening on http://localhost:${port}`);
});
