const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  category: {
    type: String,
    enum: ["Clothes", "Pants", "Shoe", "Hat", "Accessories", "Jacket"],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
