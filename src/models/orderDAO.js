const { Order } = require("./model");

const orderDAO = {
  async create({
    orderId,
    productId,
    price,
    orderTime,
    address,
    phone,
    orderStatus,
    request,
  }) {
    const obj = {
      orderId,
      productId,
      price,
      orderTime,
      address,
      phone,
      orderStatus,
    };
    if (request) obj.request = request;
    const order = await Order.create(obj);
    return order.toObject();
  },

  async findOne(id) {
    const order = await Order.findById(id).lean();
    return order;
  },

  async findMany(id) {
    const order = await Order.find(id).lean();
    return order;
  },

  async updateOne(id, toUpdate) {
    const order = await Order.findByIdAndUpdate(id, toUpdate);
    return order;
  },

  async deleteOne(id) {
    const order = await order.findByIdAndDelete(id).lean();
    return order;
  },

};
