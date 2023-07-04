const { Router } = require("express");

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.json([
    {
      email: "test@test.com",
      userName: "elice",
      address: "성수 낙낙",
      phone: 821034567890,
    },
  ]);
});

userRouter.get("/:userId", (req, res) => {
  res.json({
    email: "test@test.com",
    userName: "elice",
    address: "성수 낙낙",
    phone: 821034567890,
  });
});

userRouter.patch("/:userId", (req, res) => {
  res.status(201).end();
});

userRouter.delete("/:userId", (req, res) => {
  res.status(201).end();
});

module.exports = userRouter;
