const { userService } = require('../services');
const { checkObjectValues, filterResponse } = require('../utils/utils');
const { setUserToken } = require('../utils/authUtils');

const userController = {
  async postSignUpInfo(req, res, next) {
    try {
      const { email, password, userName, isAdmin } = req.body;
      await userService.postSignUpInfo(email, password, userName, isAdmin);
      res.status(201).redirect('/login');
    } catch (err) {
      next(err);
    }
  },

  async postSignInInfo(req, res, next) {
    try {
      const { email } = req.body;
      const { isAdmin } = await userService.getUserByEmail(email);
      setUserToken(res, email, isAdmin);
      res.status(201).redirect('/');
    } catch (err) {
      next(err);
    }
  },

  async getUser(req, res, next) {
    try {
      let userEmail;
      let userId;
      if (!req.params.userId) {
        userEmail = req.user.userEmail;
        const { _id } = await userService.getUserByEmail(userEmail);
        userId = _id;
      } else {
        userId = req.params.userId;
      }
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
      let userEmail;
      let userId;
      if (!req.params.userId) {
        userEmail = req.user.userEmail;
        const { _id } = await userService.getUserByEmail(userEmail);
        userId = _id;
      } else {
        userId = req.params.userId;
      }
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
      const { userEmail } = req.user;
      const { _id } = await userService.getUserByEmail(userEmail);
      const userId = _id;
      const { oldPassword, newPassword } = req.body;
      if (
        !(await userService.patchUser(userId, {
          oldPassword,
          newPassword,
        }))
      ) {
        throw new Error('비밀번호가 일치하지 않습니다.');
      }
      res.status(201).end();
    } catch (err) {
      next(err);
    }
  },

  async deleteUser(req, res, next) {
    try {
      let userEmail;
      let userId;
      if (!req.params.userId && !req.user.isAdmin) {
        userEmail = req.user.userEmail;
        const { _id } = await userService.getUserByEmail(userEmail);
        userId = _id;
        const { password } = req.body;
        const passwordValidation = await userService.deleteUserByPassword(userId, password);
        if (passwordValidation === null) {
          throw new Error('비밀번호가 일치하지 않습니다.');
        }
        res.end();
        return;
      }
      userId = req.params.userId;
      const user = await userService.deleteUserForAdmin(userId);
      if (user.deletedCount === 0) {
        throw new Error('존재하지 않는 유저입니다.');
      }
      res.end();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = userController;
