const { Schema } = required("mongoose");

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
    uploadTime: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    comment: {
      type: Number,
    },
  },
  {
    collection: "Review",
    timestamps: true,
  }
);

module.exports = ReviewSchema;
