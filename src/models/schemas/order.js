const { Schema } = required("mongoose");

const OrderSchema = new Schema(
  {
    products: [
      {
        productId: {
          type: String,
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
      },
    ],
    orderer: {
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
        type: String,
        required: true,
      },
    },
    price: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
    },
    requirement: {
      type: String,
    },
  },
  {
    collection: "Order",
    timestamps: true,
  }
);

module.exports = OrderSchema;
