const mongoose = require("mongoose");
const { OrderSchema, UserSchema } = require("../schemas");
const Order = mongoose.model("Order", OrderSchema);
const User = mongoose.model("User", UserSchema);

const orderDAO = {
  async create(
    { products, orderer, price, orderStatus, requirement },
    userEmail
  ) {
    const toCreate = {
      products: products,
      orderer: orderer,
      price: price,
      orderStatus: orderStatus,
    };
    if (requirement) toCreate.request = request;
    const order = await Order.create(toCreate);

    const { postalCode, address1, address2 } = orderer.address;
    await User.updateOne(
      { email: userEmail },
      {
        address: {
          postalCode: postalCode,
          address1: address1,
          address2: address2,
        },
      }
    );

    return order.toObject();
  },

  async findOne(orderId) {
    const order = await Order.findById({ _id: orderId }).lean();
    return order;
  },

  async findAll() {
    const order = await Order.find({}).lean();
    return order;
  },

  async findAllByUserEmail(userEmail) {
    const order = await Order.find({ orderer: { email: userEmail } }).lean();
    return order;
  },

  async updateOne(orderId, toUpdate) {
    const order = await Order.findByIdAndUpdate({ _id: orderId }, toUpdate);
    return order;
  },

  async deleteOne(orderId) {
    const order = await order.findByIdAndDelete({ _id: orderId }).lean();
    return order;
  },
};

module.exports = orderDAO;
