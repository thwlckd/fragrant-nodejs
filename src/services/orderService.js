const { orderDAO } = require("../models/model");

const orderService = {
  async createOrder({ products, orderer, price, orderStatus, requirement }) {
    const order = await orderDAO.create({
      products,
      orderer,
      price,
      orderStatus,
      requirement,
    });
    return order;
  },

  async getOrder(orderId) {
    const order = await orderDAO.findOne(orderId);
    return order;
  },

  async getOrders() {
    const order = await orderDAO.findAll();
    return order;
  },

  async getOrdersByUserEmail(userEmail) {
    const order = await orderDAO.getOrdersByUserEmail(userEmail);
    return order;
  },

  async updatePost(orderId, toUpdate) {
    const order = await orderDAO.updateOne(orderId, toUpdate);
    return order;
  },

  async deletePost(orderId) {
    const order = await orderDAO.delteOne(orderId);
    return order;
  },
};

module.exports = orderService;
