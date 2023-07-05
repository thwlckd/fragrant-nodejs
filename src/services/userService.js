const { userDAO } = require("../models/model");
const { hashingPassword } = require("../misc/auth");

const userService = {
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

  async updateUser(userId, toUpdate) {
    const user = await userDAO.updateOne(userId, toUpdate);
    return user;
  },

  async deleteUserByEmail(userEmail) {
    const user = await userDAO.deleteOneByEmail(userEmail);
    return user;
  },

  async deleteUserByPassword(userEmail, password) {
    const user = await userDAO.deleteOneByPassword(userEmail, password);
    return user;
  },
};

module.exports = userService;
