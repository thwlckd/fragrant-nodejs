const { Router } = require("express");

const orderRouter = Router();

orderRouter.get("/", (req, res) => {
  res.json([
    {
      orderId: 3847182093,
      productPicture: "없어.png",
      price: 130000,
      orderTime: new Date(),
      address: "성수 낙낙",
      phone: 821034567890,
      orderStatus: 0,
      userId: "누구?",
      request: "빠른배송좀",
    },
  ]);
});

orderRouter.get("/:orderId", (req, res) => {
  res.json({
    orderId: 3847182093,
    productPicture: "없어.png",
    price: 130000,
    orderTime: new Date(),
    address: "성수 낙낙",
    phone: 821034567890,
    orderStatus: 0,
    userId: "누구?",
    request: "빠른배송좀",
  });
});

orderRouter.delete("/:orderId", (req, res) => {
  res.end();
});

orderRouter.get("/:userId", (req, res) => {
  res.json([
    {
      orderId: 23573234,
      product: [
        {
          name: "perfume",
          price: 130000,
          picture: "몰라.png",
        },
      ],
      price: 300000,
      orderTime: new Date(),
      orderStatus: 0,
      request: "칼배송 부탁",
    },
  ]);
});

module.exports = orderRouter;
