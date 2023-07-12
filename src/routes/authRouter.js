const { Router } = require('express');
const passport = require('passport');
const { userController } = require('../controllers');
const { setUserToken } = require('../utils/authUtils');
const { asyncHandler } = require('../middlewares');

const authRouter = Router();

authRouter.post('/sign-up', asyncHandler(userController.postSignUpInfo));
authRouter.post(
  '/sign-in',
  passport.authenticate('local', { session: false }),
  asyncHandler(userController.postSignInInfo),
);
authRouter.post(
  '/sign-out',
  passport.authenticate('jwt', { session: false }),
  asyncHandler((req, res) => {
    if (req.user.isAdmin) {
      res.clearCookie('token').redirect('/admin/login');
    } else {
      res.clearCookie('token').redirect('/');
    }
  }),
);

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  asyncHandler((req, res) => {
    setUserToken(res, req.user.userEmail, false);
    res.redirect('/');
  }),
);

authRouter.get('/kakao', passport.authenticate('kakao', { session: false }));
authRouter.get(
  '/kakao/callback',
  passport.authenticate('kakao', { session: false }),
  asyncHandler((req, res) => {
    setUserToken(res, req.user.userEmail, false);
    res.redirect('/');
  }),
);

module.exports = authRouter;
