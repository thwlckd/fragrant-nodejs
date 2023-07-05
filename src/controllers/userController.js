const { userService } = require("../services");

const userController = {
  async getUser(req, res, next) {
    try {
      const { userId } = req.params;
      const user = await userService.getUser(userId);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  async getUsers(req, res, next) {
    try {
      const users = await userService.getUsers();
      res.json(users);
    } catch (err) {
      next(err);
    }
  },

  async getUsersByUserName(req, res, next) {
    try {
      const userName = req.query;
      const users = await userService.getUsersByUserName(userName);
      res.json(users);
    } catch (err) {
      next(err);
    }
  },

  async patchUserByEmail(req, res, next) {
    try {
      const { userId } = req.params;
      const { email, password, isAdmin, userName, phone, address } = req.body;
      const toUpdate = { email, password, isAdmin, userName, phone, address };
      await userService.updateOne(userId, toUpdate);
      res.status(201).end();
    } catch (err) {
      next(err);
    }
  },

  async deleteUserByEmail(req, res, next) {
    try {
      const { userEmail } = req.params;
      await userService.deleteUserByEmail(userEmail);
      res.end();
    } catch (err) {
      next(err);
    }
  },

  async deleteUserByPassword(req, res, next) {
    try {
      const userEmail = req.userEmail;
      const { password } = req.body;
      await userService.deleteOneByPassword(userEmail, password);
      res.end();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = userController;
