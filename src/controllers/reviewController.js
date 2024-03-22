const { userDAO } = require('../models/model');
const { reviewService } = require('../services');

const reviewController = {
  async getAllReviewByProductId(req, res) {
    const { page, perPage } = req.query;

    const { productId } = req.params;

    const { reviews, totalPage, total } = await reviewService.getAllReviewByProductId(productId, {
      page: page || 1,
      perPage: perPage || 5,
    });

    res.json({ reviews, totalPage, total });
  },

  async createReview(req, res) {
    console.log(req.body);
    const { userEmail } = req.user;
    const { userName: author } = await userDAO.findOneByEmail(userEmail);
    const { comment } = req.body;
    const { productId } = req.params;

    const review = await reviewService.createReview({ author, comment, productId });

    res.status(201).json({ review });
  },

  async deleteReviewsByProductId(req, res) {
    const { productId } = req.params;

    const deletedCount = await reviewService.deleteReviewsByProductId(productId);

    res.json({ deletedCount });
  },
};

module.exports = reviewController;
