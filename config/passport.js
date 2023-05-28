// passport brings in the ability to login and signup locally
const LocalStrategy = require("passport-local").Strategy;
// mongoose allows the use of schemas and makes MongoDB somewhat easier
const mongoose = require("mongoose");
// pull in the User model
const User = require("../middleware/models/User");


// export the passport function
module.exports = function (passport) {
  passport.use(
    // new strategy to define how passport is used
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // check if user is in the system
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` });
        }
        if (!user.password) {
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        // compare the passwords
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, { msg: "Invalid email or password." });
        });
      });
    })
  );

  // stores temporary information
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // pulls from the serialized info when needed
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
