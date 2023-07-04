const mongoose = require("mongoose");
const { CategorySchema } = require("../schema");

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
