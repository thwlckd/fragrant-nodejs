const { orderDAO } = require("../model");

const orderService = {
  async createOrder({
    orderId,
    productId,
    price,
    orderTime,
    address,
    phone,
    orderStatus,
    request,
  }) {
    const createdOrder = await orderDAO.create({
      orderId,
      productId,
      price,
      orderTime,
      address,
      phone,
      orderStatus,
      request,
    });
    return createdOrder;
  },

  async getOrder(id) {
    const order = await orderDAO.findOne(id);
    return order;
  },

  async getOrders(id) {
    const orders = await orderDAO.findMany(id);
    return orders;
  },

  async updateOrder(
    id,
    { orderId, productId, price, address, phone, orderStatus } // util 오브젝트 검사 함수?
  ) {
    const order = await orderDAO.updateOne(id);
  },

  async deletePost(id) {
    const order = await orderDAO.deleteOne(id);
    return order;
  },
};

module.exports = orderService;
