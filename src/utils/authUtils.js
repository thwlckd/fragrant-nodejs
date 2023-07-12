const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

async function comparePassword(originPassword, hashedPassword) {
  const isValid = await bcrypt.compare(originPassword, hashedPassword);
  return isValid;
}

function setUserToken(res, userEmail, isAdmin) {
  const secretKey = process.env.JWT_SECRET_KEY || 'secret';
  const token = jwt.sign(
    {
      userEmail,
      isAdmin,
    },
    secretKey,
  );
  res.cookie('token', token, { httpOnly: true });
}

module.exports = {
  hashPassword,
  comparePassword,
  setUserToken,
};
