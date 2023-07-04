const express = require("express");
const path = require("path");

const viewRouter = express.Router();

const serveStatic = (resource) => {
  const resourcePath = path.join(__dirname, `../views/pages/${resource}`);
  const option = { index: `${resource}.html` };

  return express.static(resourcePath, option);
};

viewRouter.get("/", serveStatic("Main"));

viewRouter.get("/login", serveStatic("Login"));
viewRouter.get("/login/auth", serveStatic("EmailAuth"));
viewRouter.get("/password", serveStatic("FindPassword"));
viewRouter.get("/password/reset", serveStatic("PasswordReset"));
viewRouter.get("/singup", serveStatic("SignUp"));

viewRouter.get("/products", serveStatic("Products"));
viewRouter.get("/products/:productId", serveStatic("ProductDetail"));

viewRouter.get("/cart", serveStatic("Cart"));
viewRouter.get("/order", serveStatic("Order"));
viewRouter.get("/order/complete", serveStatic("OrderComplete"));

viewRouter.get("/user/myPage", serveStatic("User"));
viewRouter.get("/user/modify", serveStatic("UserModify"));
viewRouter.get("/user/orders", serveStatic("Orders"));
viewRouter.get("/user/orders/:orderId", serveStatic("OrderDetail"));

viewRouter.get("/admin/login", serveStatic("AdminLogin"));
viewRouter.get("/admin/users", serveStatic("AdminUsers"));
viewRouter.get("/admin/users/:userId", serveStatic("AdminUserDetail"));
viewRouter.get("/admin/products", serveStatic("AdminProducts"));
viewRouter.get("/admin/products/:productId", serveStatic("AdminProductDetail"));
viewRouter.get("/admin/orders", serveStatic("AdminOrders"));
viewRouter.get("/admin/orders/:orderId", serveStatic("AdminOrderDetail"));
viewRouter.get("/admin/brands", serveStatic("AdminBrands"));
viewRouter.get("/admin/classify", serveStatic("AdminClassify"));

viewRouter.get("/NotFound", serveStatic("NotFound"));

module.exports = viewRouter;
