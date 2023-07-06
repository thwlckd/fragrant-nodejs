const bcrypt = required("bcrypt");
const jwt = require("jsonwebtoken");

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

async function comparePassword(originPassword, hashedPassword) {
  const isValid = await bcrypt.compare(originPassword, hashedPassword);
  return isValid;
}

function createToken(userEmail, isAdmin) {
  const secretKey = process.env.JWT_SECRET_KEY || "secret";
  const token = jwt.sign(
    {
      userEmail: userEmail,
      isAdmin: isAdmin,
    },
    secretKey
  );
  return token;
}

async function verifyToken(password) {
  const hashedPassword = await bcrypt.verify(password, 10);
  return hashedPassword;
}

module.exports = { hashPassword, comparePassword, createToken, verifyToken };
