const passport = require('passport');
const local = require('./strategies/local');
const jwt = require('./strategies/jwt');
const google = require('./strategies/google');
const kakao = require('./strategies/kakao');

module.exports = () => {
  passport.use('local', local);
  passport.use('jwt', jwt);
  passport.use('google', google);
  passport.use('kakao', kakao);
};
