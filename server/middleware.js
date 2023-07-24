module.exports = {
  isLoggedIn(req, res, next) {
    // middleware to protect route that needs user to be logged in
    if (!req.isAuthenticated()) {
      return next({
        code: 401,
        error: { message: "MUST BE LOGGED IN" },
        internalMessage: {
          from: "isLoggedIn",
          e: "Unauthorized access",
        },
      });
    }
    return next();
  },
};
