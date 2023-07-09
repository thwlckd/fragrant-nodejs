const { userService } = require('../services');
const { checkObjectValues, filterResponse } = require('../utils/utils');
const { setUserToken } = require('../utils/authUtils');

const userController = {
  async postSignUpInfo(req, res, next) {
    try {
      const { email, password, userName } = req.body;
      await userService.postSignUpInfo(email, password, userName);
      res.status(201).end();
    } catch (err) {
      next(err);
    }
  },

  async postSignInInfo(req, res, next) {
    try {
      const { email } = req.body;
      const { isAdmin } = await userService.getUserByEmail(email);
      setUserToken(res, email, isAdmin);
      res.status(201).end();
    } catch (err) {
      next(err);
    }
  },

  async getUser(req, res, next) {
    try {
      const { userId } = req.params;
      const user = await userService.getUser(userId);
      res.json(filterResponse(user));
    } catch (err) {
      next(err);
    }
  },

  async getUsers(req, res, next) {
    try {
      const users = await userService.getUsers();
      res.json(filterResponse(users));
    } catch (err) {
      next(err);
    }
  },

  async getUsersByUserName(req, res, next) {
    try {
      const { userName } = req.query;
      const users = await userService.getUsersByUserName(userName);
      res.json(filterResponse(users));
    } catch (err) {
      next(err);
    }
  },

  async patchUser(req, res, next) {
    try {
      const { userId } = req.params;
      const { userName, phone, address } = req.body;
      const checkedToUpdate = checkObjectValues({
        userName,
        phone,
      });

      if (address) {
        const checkedAddressToUpdate = checkObjectValues({
          postalCode: address.postalCode,
          address1: address.address1,
          address2: address.address2,
        });
        if (Object.keys(checkedAddressToUpdate).length !== 0) {
          checkedToUpdate.address = checkedAddressToUpdate;
        }
      }

      await userService.patchUser(userId, checkedToUpdate);
      res.status(201).end();
    } catch (err) {
      next(err);
    }
  },

  async patchUserPassword(req, res, next) {
    try {
      const { userId } = req.params;
      const { oldPassword, newPassword } = req.body;
      if (
        !(await userService.patchUser(userId, {
          oldPassword,
          newPassword,
        }))
      ) {
        res.status(400).end();
        return;
      }
      res.status(201).end();
    } catch (err) {
      next(err);
    }
  },

  async deleteUser(req, res, next) {
    try {
      const { userId } = req.params;
      const { password } = req.body;
      const passwordValidation = await userService.deleteUser(userId, password);
      if (passwordValidation === null) {
        res.status(400).json();
        return;
      }
      res.end();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = userController;
