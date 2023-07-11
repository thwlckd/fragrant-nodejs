const { Router } = require('express');
const { userController } = require('../controllers');
const { adminOnly, loginRequired } = require('../middlewares');

const userRouter = Router();

userRouter.get('/', adminOnly, userController.getUsers);
userRouter.get('/userName', adminOnly, userController.getUsersByUserName);

userRouter.get('/:userId', adminOnly, userController.getUser);
userRouter.get('/user/info', loginRequired, userController.getUser);

userRouter.patch('/:userId', adminOnly, userController.patchUser);
userRouter.patch('/user/info', loginRequired, userController.patchUser);
userRouter.patch('/user/info/password', loginRequired, userController.patchUserPassword);

userRouter.delete('/:userId', adminOnly, userController.deleteUser);
userRouter.delete('/user/info', loginRequired, userController.deleteUser);

module.exports = userRouter;
