const { Router } = require("express");
const { userController } = require("../controllers");
const {
  adminOnly,
  loginRequired,
  checkDuplicatedEmail,
} = require("../middlewares");

const userRouter = Router();

userRouter.get("/:userId", loginRequired, userController.getUser);
userRouter.get("/", adminOnly, userController.getUsers);
userRouter.get("/list", adminOnly, userController.getUsersByUserName);
userRouter.patch(
  "/:userId",
  loginRequired,
  checkDuplicatedEmail,
  userController.patchUser
);
userRouter.delete("/:userId", loginRequired, userController.deleteUser);

module.exports = userRouter;
