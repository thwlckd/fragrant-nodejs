const { orderDAO, userDAO } = require('../models/model');
const { formatDate, filterResponseOrder } = require('../utils/utils');

const orderService = {
  async createOrderAndUpdateUserAddress(toCreate, userEmail) {
    const order = await orderDAO.create(toCreate);
    const toUpdate = order.orderer.address;
    await userDAO.updateOneByUserEmail(userEmail, {
      address: toUpdate,
    });
    return order;
  },

  async getOrderByOrderId(orderId) {
    const order = await orderDAO.findOneByOrderId(orderId);
    return filterResponseOrder(formatDate(order));
  },

  async getOrders() {
    const order = await orderDAO.findAll();
    return filterResponseOrder(formatDate(order));
  },

  async getOrdersByUserName(name) {
    const orders = await orderDAO.findAll();
    const ordersforSameName = orders.filter((order) => order.orderer.name === name);
    return filterResponseOrder(formatDate(ordersforSameName));
  },

  async getOrdersByUserEmail(userEmail) {
    const orders = await orderDAO.findAll();
    const ordersByEmail = orders.filter((order) => order.orderer.email === userEmail);
    return filterResponseOrder(formatDate(ordersByEmail));
  },

  async updateOrderByOrderId(orderId, toUpdate) {
    const order = await orderDAO.updateOneByOrderId(orderId, toUpdate);
    return order;
  },

  async deleteOrderByOrderId(orderId) {
    const order = await orderDAO.deleteOneByOrderId(orderId);
    return order;
  },
};

module.exports = orderService;
