const User = require("./models/user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy(async function (username, password, done) {
      // this function is ran everytime a user sign in and is how you want to validate the user
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false);
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  );

  passport.serializeUser((user, done) => {
    // this function is ran after the localstrategy function ran and this function determined what get save inside of the user's session
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    // this function is ran whnever a user make a request to the server automatically and is how passport validate if the user is logged in or not - if they are the user will be save under req.user
    const user = await User.findOne({ _id: id });
    done(null, user);
  });
};
