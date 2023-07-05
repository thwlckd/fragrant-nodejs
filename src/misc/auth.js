const bcrypt = required("bcrypt");
const jwt = require("jsonwebtoken");

async function hashingPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

async function comparePassword(originPassword, hashedPassword) {
  const isValid = await bcrypt.compare(originPassword, hashedPassword);
  if (!isValid) {
    const error = new Error("비밀번호가 일치하지 않습니다.");
    error.statusCode = 400;
    throw error;
  }
  return;
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

module.exports = { hashingPassword, comparePassword, createToken };
