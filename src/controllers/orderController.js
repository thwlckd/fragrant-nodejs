const { orderService } = require('../services');
// const { addProductsQuantity, subtractProductsQuantity } = require('../utils/utils');

const orderController = {
  async postOrder(req, res) {
    const { products, orderer, price, orderStatus, requirement } = req.body;
    const { userEmail } = req.user;
    orderer.email = userEmail;
    const order = await orderService.createOrderAndUpdateUserAddress(
      {
        products,
        orderer,
        price,
        orderStatus,
        requirement,
      },
      userEmail,
    );
    if (!order) {
      throw new Error('주문에 실패했습니다.');
    }
    // await subtractProductsQuantity(products);
    res.status(201).end();
  },

  async getOrderByOrderId(req, res) {
    const { orderId } = req.params;
    const order = await orderService.getOrderByOrderId(orderId);
    if (!order) {
      throw new Error('상품 조회에 실패했습니다.');
    }
    res.json(order);
  },

  async getOrders(req, res) {
    const orders = await orderService.getOrders();
    if (!orders) {
      throw new Error('상품 리스트 조회에 실패했습니다.');
    }
    res.json(orders);
  },

  async getOrdersByUserName(req, res) {
    const { userName } = req.query;
    const orders = await orderService.getOrdersByUserName(userName);
    if (!orders) {
      throw new Error('상품 리스트 조회에 실패했습니다.');
    }
    res.json(orders);
  },

  async getOrdersByUserEmail(req, res) {
    const { userEmail } = req.user;
    const orders = await orderService.getOrdersByUserEmail(userEmail);
    if (!orders) {
      throw new Error('상품 리스트 조회에 실패했습니다.');
    }
    res.json(orders);
  },

  async patchOrderByOrderIdForUser(req, res) {
    const { orderId } = req.params;
    const { orderer, requirement } = req.body;
    orderer.email = req.user.userEmail;
    const order = await orderService.updateOrderByOrderId(orderId, { orderer, requirement });
    if (!order) {
      throw new Error('주문 내역 수정에 실패했습니다.');
    }
    res.status(201).end();
  },

  async patchOrderByOrderIdForAdmin(req, res) {
    const { orderId } = req.params;
    const { orderStatus } = req.body;
    const order = await orderService.updateOrderByOrderId(orderId, { orderStatus });
    if (!order) {
      throw new Error('주문 내역 수정에 실패했습니다.');
    }
    res.status(201).end();
  },

  async deleteOrderByOrderId(req, res) {
    const { orderId } = req.params;
    const order = await orderService.getOrderByOrderId(orderId);
    if (!order) {
      throw new Error('취소할 주문이 없습니다.');
    }
    await orderService.deleteOrderByOrderId(orderId);
    // await addProductsQuantity(order.products);
    if (!req.user.isAdmin) {
      res.redirect('/user/myPage');
      return;
    }
    res.end();
  },
};

module.exports = orderController;
