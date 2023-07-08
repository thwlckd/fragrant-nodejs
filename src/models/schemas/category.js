const { Schema } = require('mongoose');

const CategorySchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'Catogory',
    timestamps: true,
  },
);

module.exports = CategorySchema;
