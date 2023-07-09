const { Router } = require('express');
const { userController } = require('../controllers');

const authRouter = Router();

authRouter.post('/sign-up', userController.postSignUpInfo);
authRouter.post('/sign-in', userController.postSignInInfo);

module.exports = authRouter;
