const { userService } = require('../services');
const { setUserToken } = require('../utils/authUtils');

const userController = {
  async postSignUpInfo(req, res) {
    const { email, password, userName, isAdmin } = req.body;
    // if (email !== req.user.userEmail) {
    //   throw new Error('인증한 이메일로 회원가입 해주세요');
    // }
    const user = await userService.getUserByEmail(email);
    if (user) {
      throw new Error('이미 존재하는 이메일입니다.');
    }
    await userService.postSignUpInfo(email, password, userName, isAdmin);
    res.status(201).redirect('/login');
  },

  async postSignInInfo(req, res) {
    const { email } = req.body;
    const { isAdmin } = await userService.getUserByEmail(email);
    setUserToken(res, email, isAdmin);
    if (isAdmin) {
      res.redirect(303, '/admin/users');
      return;
    }
    res.status(201).redirect('/');
  },

  async getUserById(req, res) {
    let userId;
    if (!req.params.userId) {
      const { _id } = await userService.getUserByEmail(req.user.userEmail);
      userId = String(_id);
    } else {
      userId = req.params.userId;
    }
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new Error('회원정보 조회에 실패했습니다.');
    }
    res.json(user);
  },

  async getUsers(req, res) {
    const users = await userService.getUsers();
    if (!users) {
      throw new Error('회원정보 조회에 실패했습니다.');
    }
    res.json(users);
  },

  async getUsersByUserName(req, res) {
    const { userName } = req.query;
    const users = await userService.getUsersByUserName(userName);
    if (!users) {
      throw new Error('회원정보 조회에 실패했습니다.');
    }
    res.json(users);
  },

  async patchUserById(req, res) {
    let userId;
    if (!req.params.userId) {
      const { _id } = await userService.getUserByEmail(req.user.userEmail);
      userId = _id;
    } else {
      userId = req.params.userId;
    }
    const { userName, phone, address } = req.body;
    const user = await userService.patchUserById(userId, { userName, phone, address });
    if (!user) {
      throw new Error('회원정보 수정에 실패했습니다.');
    }
    res.status(201).end();
  },

  async patchUserPasswordById(req, res) {
    const { userEmail } = req.user;
    const { _id } = await userService.getUserByEmail(userEmail);
    const userId = _id;
    const { oldPassword, newPassword } = req.body;
    const user = await userService.patchUserPasswordById(userId, {
      oldPassword,
      newPassword,
    });
    if (!user) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }
    res.status(201).end();
  },

  async deleteUser(req, res) {
    let userId;
    if (!req.params.userId && !req.user.isAdmin) {
      const { _id } = await userService.getUserByEmail(req.user.userEmail);
      userId = _id;
      const { password } = req.body;
      const passwordValidation = await userService.deleteUserByIdForUser(userId, password);
      if (!passwordValidation) {
        throw new Error('비밀번호가 일치하지 않습니다.');
      }
      res.redirect('/');
      return;
    }
    userId = req.params.userId;
    const user = await userService.deleteUserByIdForAdmin(userId);
    if (user.deletedCount === 0) {
      throw new Error('존재하지 않는 유저입니다.');
    }
    res.end();
  },
};

module.exports = userController;
