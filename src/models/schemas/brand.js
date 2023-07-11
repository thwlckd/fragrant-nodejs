const { Schema } = require('mongoose');

const BrandSchema = new Schema(
  {
    name: {
      type: {
        origin: {
          type: String,
          required: true,
          unique: true,
        },
        korean: {
          type: String,
          required: true,
          unique: true,
        },
      },
      required: true,
      _id: false,
    },
    picture: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'Brand',
    timestamps: true,
  },
);

module.exports = BrandSchema;
