const { hashPassword, comparePassword } = require('../utils/authUtils');
const { filterResponseUser } = require('../utils/utils');
const { userDAO } = require('../models/model');

const userService = {
  async postSignUpInfo(email, password, userName, isAdmin) {
    const hashedPassword = await hashPassword(password);
    const toPost = { email, password: hashedPassword, userName, isAdmin };
    const user = await userDAO.create(toPost);
    return user;
  },

  async getUserById(userId) {
    const user = await userDAO.findOneById(userId);
    return filterResponseUser(user);
  },

  async getUserByEmail(email) {
    const user = await userDAO.findOneByEmail(email);
    return user;
  },

  async getUsers() {
    const users = await userDAO.findAll();
    return filterResponseUser(users);
  },

  async getUsersByUserName(userName) {
    const users = await userDAO.findAllByUserName(userName);
    return filterResponseUser(users);
  },

  async patchUserById(userId, toUpdate) {
    const user = await userDAO.updateOneById(userId, toUpdate);
    return user;
  },

  async patchUserPasswordById(userId, toUpdate) {
    const { oldPassword, newPassword } = toUpdate;
    if (oldPassword) {
      const { password } = await userDAO.findOneById(userId);
      if (await comparePassword(oldPassword, password)) {
        const hashedPassword = await hashPassword(newPassword);
        const user = await userDAO.updateOneById(userId, { password: hashedPassword });
        return user;
      }
      return false;
    }
    return false;
  },

  async deleteUserByIdForAdmin(userId) {
    const user = await userDAO.deleteOneById(userId);
    return user;
  },

  async deleteUserByIdForUser(userId, originPassword) {
    const { password } = await userDAO.findOneById(userId);
    if (!(await comparePassword(originPassword, password))) {
      return false;
    }
    const user = await userDAO.deleteOneById(userId);
    return user;
  },
};

module.exports = userService;
