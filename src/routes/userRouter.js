const { Router } = require('express');
const { userController } = require('../controllers');
const { adminOnly, loginRequired, asyncHandler } = require('../middlewares');

const userRouter = Router();

userRouter.get('/', adminOnly, asyncHandler(userController.getUsers));
userRouter.get('/userName', adminOnly, asyncHandler(userController.getUsersByUserName));

userRouter.get('/:userId', adminOnly, asyncHandler(userController.getUserById));
userRouter.get('/user/info', loginRequired, asyncHandler(userController.getUserById));

userRouter.patch('/:userId', adminOnly, asyncHandler(userController.patchUserById));
userRouter.patch('/user/info', loginRequired, asyncHandler(userController.patchUserById));
userRouter.patch(
  '/user/info/password',
  loginRequired,
  asyncHandler(userController.patchUserPasswordById),
);

userRouter.delete('/:userId', adminOnly, asyncHandler(userController.deleteUser));
userRouter.delete('/user/info', loginRequired, asyncHandler(userController.deleteUser));

module.exports = userRouter;
