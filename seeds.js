const mongoose = require("mongoose");
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

const seedProduct = [
  {
    name: "Kemeja Flanel",
    brand: "Hollister",
    price: 750000,
    color: "biru muda",
    category: "Clothes",
  },
  {
    name: "Celana Chino",
    brand: "Levi's",
    price: 900000,
    color: "krem",
    category: "Pants",
  },
  {
    name: "Sweater",
    brand: "Gap",
    price: 650000,
    color: "merah muda",
    category: "Jacket",
  },
  {
    name: "Sepatu Sneakers",
    brand: "Nike",
    price: 1200000,
    color: "putih",
    category: "Shoe",
  },
  {
    name: "Tas Ransel",
    brand: "Herschel",
    price: 1500000,
    color: "biru",
    category: "Accessories",
  },
  {
    name: "Kacamata Aviator",
    brand: "Ray-Ban",
    price: 2000000,
    color: "emas",
    category: "Accessories",
  },
  {
    name: "Baju Renang",
    brand: "Speedo",
    price: 500000,
    color: "biru tua",
    category: "Clothes",
  },
  {
    name: "Topi Baseball",
    brand: "New Era",
    price: 350000,
    color: "hitam",
    category: "Hat",
  },
  {
    name: "Rompi",
    brand: "Zara",
    price: 850000,
    color: "abu-abu",
    category: "Jacket",
  },
  {
    name: "Jas",
    brand: "Hugo Boss",
    price: 4500000,
    color: "hitam",
    category: "Clothes",
  },
  {
    name: "Sepatu Loafers",
    brand: "Gucci",
    price: 8000000,
    color: "coklat",
    category: "Shoe",
  },
];

Product.insertMany(seedProduct)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
