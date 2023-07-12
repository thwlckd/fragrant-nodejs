module.exports = (req, res, next) => {
  if (!req.user) {
    res.status(400).redirect('/login');
  }
  next();
};
