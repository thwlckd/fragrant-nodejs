module.exports = (req, res, next) => {
  if (!req.user.isAdmin) {
    throw new Error('서비스 권한이 없습니다.');
  }
  next();
};
