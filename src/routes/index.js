const { Router } = require("express");
const viewRouter = require("./viewRouter");
const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const orderRouter = require("./orderRouter");
const productRouter = require("./productRouter");

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/orders", orderRouter);
router.use("/products", productRouter);

module.exports = { viewRouter, router };
