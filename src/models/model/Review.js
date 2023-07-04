const mongoose = require("mongoose");
const { ReviewSchema } = require("../schema");

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
