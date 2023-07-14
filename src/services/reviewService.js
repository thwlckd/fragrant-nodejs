const { reviewDAO } = require('../models/model');

const reviewService = {
  async getAllReviewByProductId(productId, { page, perPage }) {
    const { reviews, total } = await reviewDAO.getAllReviewByProductId(productId, {
      page,
      perPage,
    });

    const totalPage = Math.ceil(total / perPage);

    return { reviews, totalPage, total };
  },

  async createReview({ author, comment, productId }) {
    const reviewInfo = {
      author,
      comment,
      productId,
    };

    const review = await reviewDAO.createReview(reviewInfo);

    return review;
  },

  async deleteReviewsByProductId(productId) {
    const deletedCount = await reviewDAO.deleteReviewsByProductId(productId);

    return deletedCount;
  },
};

module.exports = reviewService;
