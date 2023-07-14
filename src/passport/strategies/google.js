const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { userDAO } = require('../../models/model');

const config = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://kdt-sw-5-team14.elicecoding.com/api/auth/google/callback',
};

async function findOrCreateUser({ name, email }) {
  const user = await userDAO.findOneByEmail(email);
  if (user) {
    return user;
  }
  const createdUser = await userDAO.create({
    userName: name,
    email,
    password: 'GOOGLE_OAUTH',
  });

  return createdUser;
}

module.exports = new GoogleStrategy(config, async (accessToken, refreshToken, profile, done) => {
  const { email, name } = profile._json;
  try {
    const user = await findOrCreateUser({ email, name });
    done(null, {
      userEmail: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    done(error, null);
  }
});
