<<<<<<< HEAD
const { reviewDAO } = require('../models/model');

const reviewService = {
  async getAllReviewByProductId(productId, { page, perPage }) {
    const { reviews, total } = await reviewDAO.getAllReviewByProductId(productId, {
      page,
      perPage,
    });

    const totalPage = Math.ceil(total / perPage);

    return { reviews, totalPage };
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
=======
const { reviewDAO } = require('../models/model');

const reviewService = {
  async getAllReviewByProductId(productId, { page, perPage }) {
    const { reviews, total } = await reviewDAO.getAllReviewByProductId(productId, {
      page,
      perPage,
    });

    const totalPage = Math.ceil(total / perPage);

    return { reviews, totalPage };
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
>>>>>>> 6c76a9bdd99bbb366558cf16530d4f047cd2e570
