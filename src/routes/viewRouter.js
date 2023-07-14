const express = require('express');
const path = require('path');
const { redirectUser } = require('../middlewares');

const viewRouter = express.Router();

const serveStatic = (resource) => {
  const resourcePath = path.join(__dirname, `../views/pages/${resource}`);
  const option = { index: `${resource}.html` };

  return express.static(resourcePath, option);
};

viewRouter.use('/', serveStatic('Main'));

viewRouter.use('/login', serveStatic('Login'));
viewRouter.use('/login/auth', serveStatic('EmailAuth'));
viewRouter.use('/password', serveStatic('FindPassword'));
viewRouter.use('/password/reset', serveStatic('PasswordReset'));
viewRouter.use('/signup', serveStatic('Signup'));

viewRouter.use('/products', serveStatic('Products'));
viewRouter.use('/products/:productId', serveStatic('ProductDetail'));
viewRouter.use('/products/:classified/:target', serveStatic('Products'));

viewRouter.use('/cart', serveStatic('Cart'));
viewRouter.use('/order', serveStatic('Order'));
viewRouter.use('/order/complete', serveStatic('OrderComplete'));

viewRouter.use('/user/myPage', serveStatic('User'));
viewRouter.use('/user/modify', serveStatic('UserModify'));
viewRouter.use('/user/orders', serveStatic('Orders'));
viewRouter.use('/user/orders/:orderId', serveStatic('OrderDetail'));

viewRouter.use('/admin/login', serveStatic('AdminLogin'));
viewRouter.use('/admin/users', redirectUser, serveStatic('AdminUsers'));
viewRouter.use('/admin/users/:userId', redirectUser, serveStatic('AdminUserDetail'));
viewRouter.use('/admin/products', redirectUser, serveStatic('AdminProducts'));
viewRouter.use('/admin/products/:productId', redirectUser, serveStatic('AdminProductDetail'));
viewRouter.use('/admin/orders', redirectUser, serveStatic('AdminOrders'));
viewRouter.use('/admin/orders/:orderId', redirectUser, serveStatic('AdminOrderDetail'));
viewRouter.use('/admin/brands', redirectUser, serveStatic('AdminBrands'));
viewRouter.use('/admin/classify', redirectUser, serveStatic('AdminClassify'));

viewRouter.use('/NotFound', serveStatic('NotFound'));

module.exports = viewRouter;
