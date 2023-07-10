const passport = require('passport');

function getToken(req, res, next) {
  if (!req.cookies.token) {
    next();
    return;
  }
  passport.authenticate('jwt', { session: false })(req, res, next);
}

module.exports = getToken;
