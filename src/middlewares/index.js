const adminOnly = require('./adminOnly');
const loginRequired = require('./loginRequired');
const asyncHandler = require('./asyncHandler');
const checkDuplicatedEmail = require('./checkDuplicatedEmail');
const getToken = require('./getToken');

module.exports = {
  adminOnly,
  loginRequired,
  asyncHandler,
  checkDuplicatedEmail,
  getToken,
};
