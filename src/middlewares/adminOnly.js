const jwt = require('jsonwebtoken');

function adminOnly(req, res, next) {
  let { authorization: token } = req.headers;
  if (token) {
    [token] = token.split(' ').reverse();
  }
  if (!token) {
    throw new Error('로그인이 필요한 서비스입니다. 로그인 해주세요.');
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'secret';
    const jwtDecoded = jwt.verify(token, secretKey);
    const { isAdmin } = jwtDecoded;
    if (!isAdmin) {
      throw new Error('서비스 권한이 없습니다.');
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = adminOnly;
