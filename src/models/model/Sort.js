const mongoose = require("mongoose");
const { SortSchema } = require("../schema");

const Sort = mongoose.model("Sort", SortSchema);

module.exports = Sort;
