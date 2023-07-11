const mongoose = require('mongoose');
const { OrderSchema, UserSchema } = require('../schemas');
const { formatDate, filterResponseOrder } = require('../../utils/utils');

const Order = mongoose.model('Order', OrderSchema);
const User = mongoose.model('User', UserSchema);

const orderDAO = {
  async create({ products, orderer, price, orderStatus, requirement }, userEmail) {
    const toCreate = {
      products,
      orderer,
      price,
      orderStatus,
    };
    if (requirement) toCreate.requirement = requirement;
    const order = await Order.create(toCreate);
    const { postalCode, address1, address2 } = orderer.address;
    await User.updateOne(
      { email: userEmail },
      {
        address: {
          postalCode,
          address1,
          address2,
        },
      },
    );

    return order.toObject();
  },

  async findOne(orderId) {
    const order = await Order.findById(orderId).lean();
    return filterResponseOrder(formatDate(order));
  },

  async findAll() {
    const order = await Order.find({}).lean();
    return filterResponseOrder(formatDate(order));
  },

  async findAllByUserName(name) {
    const orders = await Order.find({}).lean();
    const ordersByName = orders.filter((order) => order.orderer.name === name);
    return filterResponseOrder(formatDate(ordersByName));
  },

  async findAllByUserEmail(userEmail) {
    const orders = await Order.find({}).lean();
    const ordersByEmail = orders.filter((order) => order.orderer.email === userEmail);
    return filterResponseOrder(formatDate(ordersByEmail));
  },

  async updateOne(orderId, toUpdate) {
    const order = await Order.findByIdAndUpdate(orderId, toUpdate).lean();
    return order;
  },

  async deleteOne(orderId) {
    const order = await Order.findByIdAndDelete(orderId).lean();
    return order;
  },
};

module.exports = orderDAO;
