const { hashPassword, comparePassword } = require('../utils/authUtils');
const { userDAO } = require('../models/model');

const userService = {
  async postSignUpInfo(email, password, userName) {
    const hashedPassword = await hashPassword(password);
    const toPost = { email, password: hashedPassword, userName };
    const user = await userDAO.create(toPost);
    return user;
  },

  async getUser(userId) {
    const user = await userDAO.findOne(userId);
    return user;
  },

  async getUserByEmail(email) {
    const user = await userDAO.findOneByEmail(email);
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
    const { oldPassword, newPassword } = toUpdate;
    if (oldPassword) {
      const { password } = await userDAO.findOne(userId);
      if (await comparePassword(oldPassword, password)) {
        const hashedPassword = await hashPassword(newPassword);
        await userDAO.updateOne(userId, { password: hashedPassword });
        return true;
      }
      return false;
    }
    const user = await userDAO.updateOne(userId, toUpdate);
    return user;
  },

  async deleteUser(userId, originPassword) {
    const { password } = await userDAO.findOne(userId);
    if (!(await comparePassword(originPassword, password))) {
      return null;
    }

    const user = await userDAO.deleteOne(userId);
    return user;
  },
};

module.exports = userService;
