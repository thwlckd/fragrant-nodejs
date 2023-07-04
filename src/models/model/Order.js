const mongoose = require("mongoose");
const { OrderSchema } = require("../schema");

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
