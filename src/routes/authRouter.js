const { Router } = require('express');
const { userController } = require('../controllers');
const { checkDuplicatedEmail } = require('../middlewares');

const authRouter = Router();

authRouter.post('/sign-up', checkDuplicatedEmail, userController.postSignUpInfo);
authRouter.post('/sign-in', userController.postSignInInfo);

module.exports = authRouter;
