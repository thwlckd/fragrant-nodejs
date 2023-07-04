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
    admin: {
      type: Boolean,
      default: false,
      required: true,
    },
    userName: {
      type: String,
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
    emailValidation: {
      type: Boolean,
      required: true,
    },
    passwordReset: {
      type: Boolean,
      required: true,
    },
  },
  {
    collection: "User",
    timestamps: true,
  }
);

module.exports = UserSchema;
