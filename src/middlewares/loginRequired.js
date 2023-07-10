const jwt = require('jsonwebtoken');

function loginRequired(req, res, next) {
  let { authorization: token } = req.headers;
  if (token) {
    [token] = token.split(' ').reverse();
  }

  try {
    if (!token) {
      throw new Error('로그인이 필요한 서비스입니다. 로그인 해주세요.');
    }
    const secretKey = process.env.JWT_SECRET_KEY || 'secret';
    const jwtDecoded = jwt.verify(token, secretKey);
    const { userEmail } = jwtDecoded;
    req.userEmail = userEmail;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = loginRequired;
