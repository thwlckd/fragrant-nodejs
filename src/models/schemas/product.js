const { Schema } = require('mongoose');
const NoteSchema = require('./note');

const ProductIdCounterSchema = new Schema(
  {
    target: {
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
    _id: false,
  },
);

const ProductSchema = new Schema(
  {
    productId: {
      type: String,
      unique: true,
      index: true,
    },
    // name: {
    //   type: {
    //     origin: {
    //       type: String,
    //       required: true,
    //       unique: true,
    //     },
    //     korean: {
    //       type: String,
    //       required: true,
    //       unique: true,
    //     },
    //   },
    //   required: true,
    // },
    // price: {
    //   type: Number,
    //   required: true,
    // },
    // picture: {
    //   type: String,
    //   required: true,
    // },
    // gender: {
    //   type: String,
    //   enum: ['man', 'woman', 'unisex'],
    //   default: 'unisex',
    // },
    // note: {
    //   type: [NoteSchema],
    //   required: true,
    // },
    // brand: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Brand',
    //   required: true,
    // },
    // description: {
    //   type: String,
    //   required: true,
    // },
    // quantity: {
    //   type: Number,
    //   default: 0,
    // },
  },
  {
    collection: 'Product',
    timestamps: true,
    _id: false,
  },
);

module.exports = { ProductSchema, ProductIdCounterSchema };
