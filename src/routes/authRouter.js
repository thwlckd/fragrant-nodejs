const { Router } = require('express');
const passport = require('passport');
const { userController } = require('../controllers');

const authRouter = Router();

authRouter.post('/sign-up', userController.postSignUpInfo);
authRouter.post(
  '/sign-in',
  passport.authenticate('local', { session: false }),
  userController.postSignInInfo,
);
authRouter.post('/sign-out', (req, res, next) => {
  res.clearCookie('token').end();
});

module.exports = authRouter;
