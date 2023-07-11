const { Router } = require('express');
const { orderController } = require('../controllers');
const { adminOnly, loginRequired } = require('../middlewares');
const asyncHandler = require('../middlewares/asyncHandler');

const orderRouter = Router();

orderRouter.get('/', adminOnly, asyncHandler(orderController.getOrders));
orderRouter.get('/userName', adminOnly, asyncHandler(orderController.getOrdersByUserName));
orderRouter.post('/order', loginRequired, asyncHandler(orderController.postOrder));
orderRouter.get('/user', loginRequired, asyncHandler(orderController.getOrdersByUserEmail));
orderRouter.get('/:orderId', loginRequired, asyncHandler(orderController.getOrder));
orderRouter.patch('/user/:orderId', loginRequired, asyncHandler(orderController.patchUserOrder));
orderRouter.patch('/admin/:orderId', adminOnly, asyncHandler(orderController.patchAdminOrder));
orderRouter.delete('/:orderId', loginRequired, asyncHandler(orderController.deleteOrder));

module.exports = orderRouter;
