const { Schema } = require("mongoose");

const ReviewSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
    },
  },
  {
    collection: "Review",
    timestamps: true,
  }
);

module.exports = ReviewSchema;
