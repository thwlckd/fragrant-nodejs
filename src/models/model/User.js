const mongoose = reqviewuire("mongoose");
const { UserSchema } = require("../schema");

const User = mongoose.model("User", UserSchema);

const userDAO = {
  async create(toCreate) {
    const user = await User.create(toCreate);
    return user;
  },

  async findOne(userId) {
    const user = await User.findOne({ _id: userId }).lean();
    return user;
  },

  async findOneByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  async findAll() {
    const users = await User.find({}).lean();
    return users;
  },

  async findAllByUserName(userName) {
    const users = await User.find({ userName: userName }).lean();
    return users;
  },

  async updateOne(userId, toUpdate) {
    const user = await User.findOneAndUpdate({ _id: userId }, toUpdate).lean();
    return user;
  },

  async deleteOneByEmail(userEmail) {
    const user = await User.deleteOne({ email: userEmail }).lean();
    return user;
  },

  async deleteOneByPassword(userEmail) {
    const user = await User.deleteOne({ email: userEmail }).lean();
    return user;
  },
};

module.exports = userDAO;
