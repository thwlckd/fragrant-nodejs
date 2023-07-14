const KakaoStrategy = require('passport-kakao').Strategy;
const { userDAO } = require('../../models/model');

const config = {
  clientID: process.env.KAKAO_CLIENT_ID,
  clientSecret: process.env.KAKAO_CLIENT_SECRET,
  callbackURL: 'http://kdt-sw-5-team14.elicecoding.com/api/auth/kakao/callback',
};

async function findOrCreateUser(email, userName) {
  const user = await userDAO.findOneByEmail(email);
  if (user) {
    return user;
  }
  const createdUser = await userDAO.create({
    userName,
    email,
    password: 'KAKAO_OAUTH',
  });
  return createdUser;
}

module.exports = new KakaoStrategy(config, async (accessToken, refreshToken, profile, done) => {
  const kakaoProfile = profile._json.kakao_account;
  const { email } = kakaoProfile;
  const userName = kakaoProfile.profile.nickname;
  try {
    const user = await findOrCreateUser(email, userName);
    done(null, {
      userEmail: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    done(error, null);
  }
});
