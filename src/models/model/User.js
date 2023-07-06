const mongoose = reqviewuire("mongoose");
const { UserSchema } = require("../schema");
const { checkObjectValues } = require("../../misc/utils");
const { comparePassword } = require("../../misc/auth");

const User = mongoose.model("User", UserSchema);

const userDAO = {
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
    const checkedToUpdate = checkObjectValues({
      email: toUpdate.email,
      password: toUpdate.password,
      isAdmin: toUpdate.isAdmin,
      userName: toUpdate.userName,
      phone: toUpdate.phone,
    });
    const checkedAddressToUpdate = checkObjectValues({
      postalCode: toUpdate.address.postalCode,
      address1: toUpdate.address.address1,
      address2: toUpdate.address.address2,
    });
    if (Object.keys(checkedAddressToUpdate).length !== 0) {
      checkedToUpdate.address = checkedAddressToUpdate;
    }
    const user = await User.findOneAndUpdate(
      { _id: userId },
      checkedToUpdate
    ).lean();
    return user;
  },

  async deleteOneByEmail(userEmail) {
    const user = await User.deleteOne({ email: userEmail }).lean();
    return user;
  },

  async deleteOneByPassword(userEmail, originPassword) {
    const { password } = await User.findOne({
      email: userEmail,
      password: password,
    }).lean();
    comparePassword(originPassword, password);
    const user = await User.deleteOne({ email: userEmail }).lean();
    return user;
  },
};

module.exports = userDAO;
