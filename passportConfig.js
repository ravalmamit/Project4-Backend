const Register = require("./models/register-model");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  // define local strategy for passport
  passport.use(
    new localStrategy((username, password, done) => {
      // lookup for the user in the db
      Register.findOne({ username: username }, (err, user) => {
        // if error
        if (err) throw err;
        //if no user
        if (!user) return done(null, false);
        // if there is a user
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );
  // serializeUser function stores the cookie in the browser with the user id
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  // deserializeUser function will unravel the cookie and returns the user id from it
  passport.deserializeUser((id, cb) => {
    Register.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username,
      };
      cb(err, userInformation);
    });
  });
};
