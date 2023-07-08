const { Router } = require('express');
const { orderController } = require('../controllers');
const { adminOnly, loginRequired } = require('../middlewares');

const orderRouter = Router();

orderRouter.get('/', adminOnly, orderController.getOrders); // 전체 주문 목록 조회는 관리자만
orderRouter.post('/order', loginRequired, orderController.postOrder);
orderRouter.get(
  '/user',
  loginRequired,
  orderController.getOrdersByUserEmail,
);
orderRouter.get('/:orderId', loginRequired, orderController.getOrder);
orderRouter.patch('/user/:orderId', loginRequired, orderController.patchUserOrder);
orderRouter.patch('/admin/:orderId', adminOnly, orderController.patchAdminOrder);
orderRouter.delete('/:orderId', loginRequired, orderController.deleteOrder);

module.exports = orderRouter;
