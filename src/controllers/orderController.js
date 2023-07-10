const { orderService } = require('../services');

const orderController = {
  async postOrder(req, res, next) {
    try {
      const { products, orderer, price, orderStatus, requirement } = req.body;
      const { userEmail } = req;
      await orderService.createOrder(
        {
          products,
          orderer,
          price,
          orderStatus,
          requirement,
        },
        userEmail,
      );
      res.status(201).end();
    } catch (err) {
      next(err);
    }
  },

  async getOrder(req, res, next) {
    try {
      const { orderId } = req.params;
      const order = await orderService.getOrder(orderId);
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

  async getOrdersByUserName(req, res, next) {
    try {
      const { userName } = req.query;
      const orders = await orderService.getOrdersByUserName(userName);
      res.json(orders);
    } catch (err) {
      next(err);
    }
  },

  async getOrdersByUserEmail(req, res, next) {
    try {
      const { userEmail } = req.user;
      const orders = await orderService.getOrdersByUserEmail(userEmail);
      res.json(orders);
    } catch (err) {
      next(err);
    }
  },

  async patchUserOrder(req, res, next) {
    try {
      const { orderId } = req.params;
      const { orderer, requirement } = req.body;
      orderer.email = req.userEmail;
      const toUpdate = { orderer };
      if (requirement) toUpdate.requirement = requirement;
      await orderService.updateUserOrder(orderId, toUpdate);
      res.status(201).end();
    } catch (err) {
      next(err);
    }
  },

  async patchAdminOrder(req, res, next) {
    try {
      const { orderId } = req.params;
      const { orderStatus } = req.body;
      await orderService.updateUserOrder(orderId, { orderStatus });
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
