const { Router } = require("express");
const { userController } = require("../controllers");
const { adminOnly, loginRequired } = require("../middlewares");

const userRouter = Router();

userRouter.get("/", adminOnly, userController.getUsers);
userRouter.get("/list", adminOnly, userController.getUsersByUserName);
userRouter.get("/:userId", loginRequired, userController.getUser);
userRouter.patch("/:userId", loginRequired, userController.patchUser);
userRouter.patch(
  "/password/:userId",
  loginRequired,
  userController.patchUserPassword
);
userRouter.delete("/:userId", loginRequired, userController.deleteUser);

module.exports = userRouter;
