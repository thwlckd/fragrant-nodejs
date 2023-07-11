const JwtStrategy = require('passport-jwt').Strategy;

function cookieExtractor(req) {
  const { token } = req.cookies;
  return token;
}

const jwtConfig = {
  secretOrKey: process.env.JWT_SECRET_KEY || 'secret',
  jwtFromRequest: cookieExtractor,
};

const jwt = new JwtStrategy(jwtConfig, async (jwtPayload, done) => {
  try {
    done(null, jwtPayload);
  } catch (error) {
    done(error, null);
  }
});

module.exports = jwt;
