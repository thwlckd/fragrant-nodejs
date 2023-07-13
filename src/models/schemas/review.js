const { Schema } = require('mongoose');

const ReviewSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    collection: 'Review',
    timestamps: true,
  },
);

module.exports = ReviewSchema;
