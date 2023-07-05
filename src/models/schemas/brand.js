const { Schema } = require("mongoose");

const BrandSchema = new Schema(
  {
    brand: {
      origin: {
        type: String,
        required: true,
      },
      korean: {
        type: String,
        required: true,
      },
    },
    logo: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Brand",
    timestamps: true,
  }
);

module.exports = BrandSchema;
