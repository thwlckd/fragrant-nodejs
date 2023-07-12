const { reviewService } = require('../services');

const reviewController = {
  async getAllReviewByProductId(req, res) {
    const { page, perPage } = req.query;

    const { productId } = req.params;

    const { reviews, totalPage } = await reviewService.getAllReviewByProductId(productId, {
      page: page || 1,
      perPage: perPage || 5,
    });

    res.json({ reviews, totalPage });
  },

  async createReview(req, res) {
    const { author, comment } = req.body;
    const { productId } = req.params;

    const review = await reviewService.createReview({ author, comment, productId });

    res.statua(201).json({ review });
  },

  async deleteReviewsByProductId(req, res) {
    const { productId } = req.params;

    const deletedCount = await reviewService.deleteReviewsByProductId(productId);

    res.json({ deletedCount });
  },
};

module.exports = reviewController;
