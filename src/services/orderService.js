const { orderDAO } = require('../models/model');

const orderService = {
  async createOrder({ products, orderer, price, orderStatus, requirement }, userEmail) {
    const order = await orderDAO.create(
      {
        products,
        orderer,
        price,
        orderStatus,
        requirement,
      },
      userEmail,
    );
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

  async getOrdersByUserName(name) {
    const order = await orderDAO.findAllByUserName(name);
    return order;
  },

  async getOrdersByUserEmail(userEmail) {
    const order = await orderDAO.findAllByUserEmail(userEmail);
    return order;
  },

  async updateUserOrder(orderId, toUpdate) {
    const order = await orderDAO.updateOne(orderId, toUpdate);
    return order;
  },

  async deleteOrder(orderId) {
    const order = await orderDAO.deleteOne(orderId);
    return order;
  },
};

module.exports = orderService;
