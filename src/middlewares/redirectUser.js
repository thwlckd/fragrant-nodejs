module.exports = (req, res, next) => {
  if (!req.user) {
    res.redirect('/admin/login');
    return;
  }
  if (!req.user.isAdmin) {
    res.status(400).redirect('/');
    return;
  }
  next();
};
