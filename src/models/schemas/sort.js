const { Schema } = require("mongoose");

const SortSchema = new Schema(
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

module.exports = SortSchema;
