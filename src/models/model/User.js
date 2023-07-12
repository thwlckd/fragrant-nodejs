const mongoose = require('mongoose');
const { UserSchema } = require('../schemas');

const User = mongoose.model('User', UserSchema);

const userDAO = {
  async create(toCreate) {
    const user = await User.create(toCreate);
    return user;
  },

  async findOneById(userId) {
    const user = await User.findOne({ _id: userId }).lean();
    return user;
  },

  async findOneByEmail(email) {
    const user = await User.findOne({ email }).lean();
    return user;
  },

  async findAll() {
    const users = await User.find({}).lean();
    return users;
  },

  async findAllByUserName(userName) {
    const users = await User.find({ userName }).lean();
    return users;
  },

  async updateOneById(userId, toUpdate) {
    const user = await User.findOneAndUpdate({ _id: userId }, toUpdate).lean();
    return user;
  },

  async updateOneByUserEmail(email, toUpdate) {
    const user = await User.findOneAndUpdate({ email }, toUpdate).lean();
    return user;
  },

  async deleteOneById(userId) {
    const user = await User.deleteOne({ _id: userId }).lean();
    return user;
  },
};

module.exports = userDAO;
