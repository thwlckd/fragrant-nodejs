const { Schema } = require('mongoose');
const shortId = require('./types/shortId');
const ReviewSchema = require('./review');

const ProductSchema = new Schema(
  {
    productId: {
      type: String,
      default: shortId(),
      required: true,
      unique: true,
      index: true,
    },
    name: {
      origin: {
        type: String,
        required: true,
      },
      korean: {
        type: String,
        required: true,
      },
    },
    price: {
      type: Number,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['man', 'woman', 'unisex'],
      default: 'unisex',
      required: true,
    },
    catogory: {
      type: Schema.Types.ObjectId,
      ref: 'Catogory',
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
    },
    review: [ReviewSchema],
  },
  {
    collection: 'Product',
    timestamps: true,
  },
);

module.exports = ProductSchema;
