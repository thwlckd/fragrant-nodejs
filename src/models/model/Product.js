const mongoose = require("mongoose");
const { ProductSchema } = require("../schema");

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
