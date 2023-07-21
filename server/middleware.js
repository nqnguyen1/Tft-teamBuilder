module.exports = {
  isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
      return next({ code: 401, error: { message: "MUST BE LOGGED IN" } });
    }
    return next();
  },
};
