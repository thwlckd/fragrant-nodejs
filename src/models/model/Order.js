const mongoose = require('mongoose');
const { OrderSchema } = require('../schemas');

const Order = mongoose.model('Order', OrderSchema);

const orderDAO = {
  async create(toCreate) {
    const order = await Order.create(toCreate);
    return order.toObject();
  },

  async findOneByOrderId(orderId) {
    const order = await Order.findById(orderId).lean();
    return order;
  },

  async findAll() {
    const orders = await Order.find({}).lean();
    return orders;
  },

  async updateOneByOrderId(orderId, toUpdate) {
    const order = await Order.findByIdAndUpdate(orderId, toUpdate).lean();
    return order;
  },

  async deleteOneByOrderId(orderId) {
    const order = await Order.findByIdAndDelete(orderId).lean();
    return order;
  },
};

module.exports = orderDAO;
