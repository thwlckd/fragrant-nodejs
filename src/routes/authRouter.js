const { Router } = require('express');
const passport = require('passport');
const { userController } = require('../controllers');
const { setUserToken } = require('../utils/authUtils');
const { asyncHandler } = require('../middlewares');
const sendMail = require('../utils/nodeMailer');

const authRouter = Router();

authRouter.post(
  '/sign-up',
  // passport.authenticate('jwt', { session: false }),
  asyncHandler(userController.postSignUpInfo),
);

authRouter.post(
  '/email',
  asyncHandler(async (req, res) => {
    const { email } = req.body;
    await sendMail(email);
    res.status(201).json({ message: '인증 메일을 전송했습니다.' });
  }),
);

authRouter.post(
  '/emailValidation',
  asyncHandler(async (req, res) => {
    setUserToken(res, req.body.email, false);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write(`<script>alert("이메일 인증에 성공했습니다.")</script>`);
    res.write(`<script>window.location="${process.env.HOST}/signup"</script>`);
  }),
);

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

authRouter.get(
  '/is-sign-in',
  passport.authenticate('jwt', { session: false }),
  asyncHandler((req, res) => res.json({ isAdmin: req.user.isAdmin })),
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
