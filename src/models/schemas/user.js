const { Schema } = require("mongoose");

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
      required: true,
    },
  },
  {
    collection: "User",
    timestamps: true,
  }
);

const AddressSchema = new Schema({
  postalCode: {
    type: String,
  },
  address1: {
    type: String,
  },
  address2: {
    type: String,
  },
});

module.exports = UserSchema;
