const { Schema } = require('mongoose');

const AddressSchema = new Schema(
  {
    postalCode: {
      type: String,
    },
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
  },
  { _id: false },
);

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    address: AddressSchema,
    phone: {
      type: String,
    },
  },
  {
    collection: 'User',
    timestamps: true,
  },
);

module.exports = UserSchema;
