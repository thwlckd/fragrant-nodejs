const adminOnly = require('./adminOnly');
const loginRequired = require('./loginRequired');
const asyncHandler = require('./asyncHandler');
const errorLogger = require('./errorLogger');

module.exports = {
  adminOnly,
  loginRequired,
  asyncHandler,
  errorLogger,
};
