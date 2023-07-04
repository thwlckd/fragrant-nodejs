const mongoose = require("mongoose");
const { OrderSchema } = require("../schema");
const Order = mongoose.model("Order", OrderSchema);

const orderDAO = {
  async create({ products, orderer, price, orderStatus, requirement }) {
    const toCreate = {
      products,
      orderer,
      price,
      orderStatus,
    };
    if (requirement) toCreate.request = request;
    const order = await Order.create(toCreate);
    return order.toObject();
  },

  async findOne(orderId) {
    const order = await Order.findById({ _id: orderId }).lean();
    return order;
  },

  async findAll() {
    const order = await Order.find({}).lean();
    return order;
  },

  async findAllByUserEmail(userEmail) {
    const order = await Order.find({ orderer: { email: userEmail } }).lean();
    return order;
  },

  async updateOne(id, toUpdate) {
    const order = await Order.findByIdAndUpdate({ _id: orderId }, toUpdate);
    return order;
  },

  async deleteOne(id) {
    const order = await order.findByIdAndDelete({ _id: orderId }).lean();
    return order;
  },
};

module.exports = orderDAO;
