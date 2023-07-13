const { Router } = require('express');
const passport = require('passport');
const viewRouter = require('./viewRouter');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const orderRouter = require('./orderRouter');
const productRouter = require('./productRouter');
const brandRouter = require('./brandRouter');
const noteRouter = require('./noteRouter');
const reviewRouter = require('./reviewRouter');

const router = Router();

router.use('/auth', authRouter);
router.use('/users', passport.authenticate('jwt', { session: false }), userRouter);
router.use('/orders', passport.authenticate('jwt', { session: false }), orderRouter);
router.use('/products', productRouter);
router.use('/brands', brandRouter);
router.use('/notes', noteRouter);
router.use('/reviews', reviewRouter);

module.exports = { viewRouter, router };
