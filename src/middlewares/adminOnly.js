const jwt = require('jsonwebtoken');

function adminOnly(req, res, next) {
  let { authorization: token } = req.headers;
  if (token) {
    [token] = token.split(' ').reverse();
  }

  if (!token || token === undefined) {
    res.status(400).json({
      error: '인증되지 않은 유저입니다. 로그인 해주세요.',
    });
    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'secret';
    const jwtDecoded = jwt.verify(token, secretKey);
    const { isAdmin } = jwtDecoded;
    if (!isAdmin) {
      res.status(400).json({
        error: '서비스 권한이 없습니다.',
      });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = adminOnly;
