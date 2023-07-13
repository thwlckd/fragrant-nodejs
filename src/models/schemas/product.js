const { Schema } = require('mongoose');

const ProductIdCounterSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    usableId: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: 'ProductId',
    timestamps: true,
  },
);

const ProductSchema = new Schema(
  {
    productId: {
      type: Number,
      unique: true,
      index: true,
    },
    name: {
      type: {
        origin: {
          type: String,
          required: true,
        },
        korean: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    capacity: {
      type: String,
      required: true,
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
    },
    note: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Note',
        },
      ],
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 100,
    },
  },
  {
    collection: 'Product',
    timestamps: true,
  },
);

module.exports = { ProductSchema, ProductIdCounterSchema };
