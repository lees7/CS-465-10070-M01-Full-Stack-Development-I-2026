const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (username, password, done) => {
      const q = await User.findOne({ email: username }).exec();
      
      // If user not found
      if (!q) {
        return done(null, false, {
          message: "Incorrect username.",
        });
      }

      // If password does not match
      if (!q.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password.",
        });
      }

      // If all is well, return the user object (q)
      return done(null, q);
    }
  )
);