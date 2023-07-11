const { orderService } = require('../services');
const { addProductsQuantity, subtractProductsQuantity } = require('../utils/utils');

const orderController = {
  async postOrder(req, res, next) {
    try {
      const { products, orderer, price, orderStatus, requirement } = req.body;
      const { userEmail } = req;
      const isCreated = await orderService.createOrder(
        {
          products,
          orderer,
          price,
          orderStatus,
          requirement,
        },
        userEmail,
      );
      if (!isCreated) {
        throw new Error('주문에 실패했습니다.');
      }
      await subtractProductsQuantity(products);
      res.status(201).end();
    } catch (err) {
      next(err);
    }
  },

  async getOrder(req, res, next) {
    try {
      const { orderId } = req.params;
      const order = await orderService.getOrder(orderId);
      if (!order) {
        throw new Error('상품 조회에 실패했습니다.');
      }
      res.json(order);
    } catch (err) {
      next(err);
    }
  },

  async getOrders(req, res, next) {
    try {
      const orders = await orderService.getOrders();
      if (!orders) {
        throw new Error('상품 리스트 조회에 실패했습니다.');
      }
      res.json(orders);
    } catch (err) {
      next(err);
    }
  },

  async getOrdersByUserName(req, res, next) {
    try {
      const { userName } = req.query;
      const orders = await orderService.getOrdersByUserName(userName);
      if (!orders) {
        throw new Error('상품 리스트 조회에 실패했습니다.');
      }
      res.json(orders);
    } catch (err) {
      next(err);
    }
  },

  async getOrdersByUserEmail(req, res, next) {
    try {
      const { userEmail } = req.user;
      const orders = await orderService.getOrdersByUserEmail(userEmail);
      if (!orders) {
        throw new Error('상품 리스트 조회에 실패했습니다.');
      }
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
      const isUpdated = await orderService.updateUserOrder(orderId, toUpdate);
      if (!isUpdated) {
        throw new Error('주문 내역 수정에 실패했습니다.');
      }
      res.status(201).end();
    } catch (err) {
      next(err);
    }
  },

  async patchAdminOrder(req, res, next) {
    try {
      const { orderId } = req.params;
      const { orderStatus } = req.body;
      const isUpdated = await orderService.updateUserOrder(orderId, { orderStatus });
      if (!isUpdated) {
        throw new Error('주문 내역 수정에 실패했습니다.');
      }
      res.status(201).end();
    } catch (err) {
      next(err);
    }
  },

  async deleteOrder(req, res, next) {
    try {
      const { orderId } = req.params;
      const order = await orderService.getOrder(orderId);
      if (!order) {
        throw new Error('취소할 주문이 없습니다.');
      }
      await orderService.deleteOrder(orderId);
      await addProductsQuantity(order.products);
      res.end();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = orderController;
