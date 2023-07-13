const mongoose = require('mongoose');
const { ReviewSchema } = require('../schemas');

const Review = mongoose.model('Review', ReviewSchema);

const reviewDAO = {
  async getAllReviewByProductId(productId, { page, perPage }) {
    const [reviews, total] = await Promise.all([
      Review.find({ productId })
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage)
        .lean(),
      Review.countDocuments({ productId }),
    ]);

    return { reviews, total };
  },

  async createReview(reviewInfo) {
    const review = await Review.create(reviewInfo);

    return review;
  },

  async deleteReviewsByProductId(productId) {
    const { deletedCount } = await Review.deleteMany({ productId });

    return deletedCount;
  },
};

module.exports = reviewDAO;
