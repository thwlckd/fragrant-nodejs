const { userDAO } = require("../models/model");

function checkObjectValues(obj) {
  const result = Object.entries(obj).reduce((map, [key, value]) => {
    if (value !== undefined || value !== "") {
      map[key] = value;
    }
    return map;
  }, {});
  return result;
}

async function checkDuplicatedEmail(email) {
  const user = await userDAO.findOneByEmail(email);
  if (user) {
    const error = new Error("이미 존재하는 이메일입니다.");
    error.statusCode = 400;
    throw error;
  }
  return;
}

module.exports = {
  checkObjectValues,
  checkDuplicatedEmail,
};
