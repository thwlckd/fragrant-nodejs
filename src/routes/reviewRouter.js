const { Router } = require('express');
const { reviewController } = require('../controllers');
const asyncHandler = require('../middlewares/asyncHandler');

const reviewRouter = Router();

reviewRouter.get('/:productId', asyncHandler(reviewController.getAllReviewByProductId));
reviewRouter.post('/:productId', asyncHandler(reviewController.createReview));
reviewRouter.delete('/:productId', asyncHandler(reviewController.deleteReviewsByProductId));

module.exports = reviewRouter;
