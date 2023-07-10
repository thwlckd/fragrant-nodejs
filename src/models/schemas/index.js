const BrandSchema = require('./brand');
const OrderSchema = require('./order');
const { ProductSchema, ProductIdCounterSchema } = require('./product');
const ReviewSchema = require('./review');
const NoteSchema = require('./note');
const UserSchema = require('./user');

module.exports = {
  BrandSchema,
  OrderSchema,
  ProductSchema,
  ProductIdCounterSchema,
  ReviewSchema,
  NoteSchema,
  UserSchema,
};
