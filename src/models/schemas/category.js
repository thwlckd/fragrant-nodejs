const { Schema } = require("mongoose");

const CategorySchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Sort",
    timestamps: true,
  }
);

module.exports = CategorySchema;
