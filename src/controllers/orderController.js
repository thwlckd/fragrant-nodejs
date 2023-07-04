const { orderService } = require("../services");

const orderController = {
  async postOrder(req, res, next) {
    try {
      const { products, orderer, price, orderStatus, requirement } = req.body;
      await orderService.createOrder({
        products,
        orderer,
        price,
        orderStatus,
        requirement,
      });
      res.status(201).end();
    } catch (err) {
      next(err);
    }
  },

  async getOrder(req, res, next) {
    try {
      const { id } = req.params;
      const order = await orderService.getOrder(id);
      res.json(order);
    } catch (err) {
      next(err);
    }
  },

  async getOrders(req, res, next) {
    try {
      const orders = await orderService.getOrders();
      res.json(orders);
    } catch (err) {
      next(err);
    }
  },

  async getOrdersByUserEmail(req, res, next) {
    try {
      const userEmail = req.userEmail;
      const orders = await orderService.getOrdersByUserEmail(userEmail);
      res.json(orders);
    } catch (err) {
      next(err);
    }
  },

  async patchOrder(req, res, next) {
    try {
      const { orderId } = req.params;
      const { products, orderer, price, orderStatus, requirement } = req.body;
      const toUpdate = { products, orderer, price, orderStatus };
      if (requirement) obj.requirement = requirement;
      await orderService.updatePost(orderId, toUpdate);
      res.status(201).end();
    } catch (err) {
      next(err);
    }
  },

  async deleteOrder(req, res, next) {
    try {
      const { orderId } = req.params;
      await orderService.deleteOrder(orderId);
      res.end();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = orderController;
