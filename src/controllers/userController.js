const { userService } = require("../services");
const { checkObjectValues } = require("../../utils/utils");

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
      const { email, password } = req.body;
      const token = await userService.postSignInInfo(email, password);
      if (token === null) {
        res.status(400).json();
        return;
      }
      res.status(201).json({ token });
    } catch (err) {
      next(err);
    }
  },

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

  async patchUser(req, res, next) {
    try {
      const { userId } = req.params;
      const { email, password, isAdmin, userName, phone, address } = req.body;
      const checkedToUpdate = checkObjectValues({
        email,
        password,
        isAdmin,
        userName,
        phone,
      });
      const checkedAddressToUpdate = checkObjectValues({
        postalCode: address.postalCode,
        address1: address.address1,
        address2: address.address2,
      });
      if (Object.keys(checkedAddressToUpdate).length !== 0) {
        checkedToUpdate.address = checkedAddressToUpdate;
      }

      await userService.patchUser(userId, checkedToUpdate);
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
      const passwordValidation = await userService.deleteUserByPassword(
        userEmail,
        password
      );
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
