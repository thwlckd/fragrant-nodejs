const mongoose = require("mongoose");
const { BrandSchema } = require("../schema");

const Brand = mongoose.model("Brand", BrandSchema);

module.exports = Brand;
