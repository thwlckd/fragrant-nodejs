const { userDAO } = require('../models/model');

async function checkDuplicatedEmail(req, res, next) {
  try {
    const { email } = req.body;
    const user = await userDAO.findOneByEmail(email);
    if (user) {
      throw new Error('이미 존재하는 이메일입니다.');
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = checkDuplicatedEmail;
