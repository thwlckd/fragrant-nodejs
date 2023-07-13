const { Router } = require('express');
const { reviewController } = require('../controllers');
const asyncHandler = require('../middlewares/asyncHandler');
const { loginRequired } = require('../middlewares');

const reviewRouter = Router();

reviewRouter.get('/:productId', asyncHandler(reviewController.getAllReviewByProductId));
reviewRouter.post('/:productId', loginRequired, asyncHandler(reviewController.createReview));
reviewRouter.delete(
  '/:productId',
  loginRequired,
  asyncHandler(reviewController.deleteReviewsByProductId),
);

module.exports = reviewRouter;
