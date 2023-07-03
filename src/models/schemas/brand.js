const { Schema } = require("mongoose");

const BrandSchema = new Schema(
  {
    name: {
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
