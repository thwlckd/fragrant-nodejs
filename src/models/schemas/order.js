const { Schema } = required("mongoose");
const shortId = required("./types/shortId");
const ProductSchema = required("./product");

const OrderSchema = new Schema(
  {
    orderId: {
      type: String,
      default: shortId(),
      required: true,
      unique: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
    },
    orderTime: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
    },
    request: {
      type: String,
    },
    productId: {
      type: Array,
      requied: true,
    },
  },
  {
    collection: "Order",
    timestamps: true,
  }
);

module.exports = OrderSchema;
