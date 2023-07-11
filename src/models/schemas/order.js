const { Schema } = require('mongoose');

const ProductSchema = new Schema(
  {
    productId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      requried: true,
    },
    img: {
      type: String,
      requried: true,
    },
    capacity: {
      type: Number,
      requried: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const AddressSchema = new Schema(
  {
    postalCode: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const OrdererSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: AddressSchema,
      required: true,
    },
  },
  { _id: false },
);

const OrderSchema = new Schema(
  {
    products: {
      type: [ProductSchema],
      required: true,
    },
    orderer: {
      type: OrdererSchema,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      default: '주문완료',
      required: true,
    },
    requirement: {
      type: String,
    },
  },
  {
    collection: 'Order',
    timestamps: true,
  },
);

module.exports = OrderSchema;
