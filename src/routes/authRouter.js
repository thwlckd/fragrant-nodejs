const { Router } = require('express');
const passport = require('passport');
const { userController } = require('../controllers');
const { setUserToken } = require('../utils/authUtils');

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

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res, next) => {
    setUserToken(res, req.user);
    res.redirect('/');
  },
);

authRouter.get('/kakao', passport.authenticate('kakao', { session: false }));
authRouter.get(
  '/kakao/callback',
  passport.authenticate('kakao', { session: false }),
  (req, res, next) => {
    setUserToken(res, req.user);
    res.redirect('/');
  },
);

module.exports = authRouter;
