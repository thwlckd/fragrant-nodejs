const LocalStrategy = require('passport-local').Strategy;
const { userDAO } = require('../../models/model');
const { comparePassword } = require('../../utils/authUtils');

const passportConfig = {
  // 기본으로 username와 password를 req에서 가져옴
  usernameField: 'email',
  passwordField: 'password',
};

const local = new LocalStrategy(passportConfig, async (email, password, done) => {
  try {
    const user = await userDAO.findOneByEmail(email);
    if (!user) {
      done(null, false, { error: '등록되지 않은 사용자입니다.' });
      return;
    }
    if (!(await comparePassword(password, user.password))) {
      done(null, false, { error: '비밀번호가 일치하지 않습니다.' });
      return;
    }
     // 미들웨어에서 res.user. 으로 접근
    done(null, {
      userEmail: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    done(error, null);
  }
});

module.exports = local;
