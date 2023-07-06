const { hashPassword, comparePassword } = require("../utils/authUtils");
const { userDAO } = require("../models/model");

const userService = {
  async postSignUpInfo(email, password, userName) {
    const hashedPassword = hashPassword(password);
    const toPost = { email, password: hashedPassword, userName };
    const user = await userDAO.create(toPost);
    return user;
  },

  async postSignInInfo(email, originPassword) {
    const { password, isAdmin } = await userDAO.findOne({ email });
    if (!comparePassword(originPassword, password)) {
      return null;
    }
    const token = createToken(email, isAdmin);
    return token;
  },

  async getUser(userId) {
    const user = await userDAO.findOne(userId);
    return user;
  },

  async getUsers() {
    const users = await userDAO.findAll();
    return users;
  },

  async getUsersByUserName(userName) {
    const users = await userDAO.findAllByUserName(userName);
    return users;
  },

  async patchUser(userId, toUpdate) {
    const user = await userDAO.updateOne(userId, toUpdate);
    return user;
  },

  async deleteUserByEmail(userEmail) {
    const user = await userDAO.deleteOneByEmail(userEmail);
    return user;
  },

  async deleteUserByPassword(userEmail, password) {
    const { password } = await userDAO
      .findOne({
        email: userEmail,
        password: password,
      })
      .lean();
    if (!comparePassword(originPassword, password)) {
      return null;
    }

    const user = await userDAO.deleteOneByPassword(userEmail);
    return user;
  },
};

module.exports = userService;
