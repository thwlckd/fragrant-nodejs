const jwt = require('jsonwebtoken');

function loginRequired(req, res, next) {
  let { authorization: token } = req.headers;
  if (token) {
    [token] = token.split(' ').reverse();
  }

  if (!token || token === undefined) {
    res.status(400).json({
      error: '인증되지 않은 유저입니다. 로그인 해주세요.',
    });
  }

  try {
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
