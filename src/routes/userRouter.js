const { Router } = require("express");
const { userController } = require("../controllers");
const { adminOnly, loginRequired, checkDuplicatedEmail } =
  requrie("../middlewares");

const userRouter = Router();

userRouter.get("/:userId", loginRequired, userController.getUser);
userRouter.get("/", adminOnly, userController.getUsers);
userRouter.get("/userName", adminOnly, userController.getUsersByUserName);
userRouter.patch(
  "/:userId",
  loginRequired,
  checkDuplicatedEmail,
  userController.patchUser
);
userRouter.delete("/:userEmail", adminOnly, userController.deleteUserByEmail);
userRouter.delete("/user", loginRequired, userController.deleteUserByPassword);

module.exports = userRouter;
