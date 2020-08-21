const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../models/players');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },

    // a verify callback function that will be called whenever a user has logged in using OAuth.
    function(accessToken, refreshToken, profile, cb) {
      // get the unique identifier from Google People API that comes back on the oauth CB
      // take that id, and look up the user in DB
      User.findOne({ googleId: profile.id }, function(err, user) {
        // early return if error
        if (err) return cb(err);

        if (user) {
          return cb(null, user);
        }

        // DOESNT RUN IF STUDENT IS FOUND
        // we have a new student via OAuth!

        const newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
        });

        newUser.save(function(err) {
          if (err) return cb(err);
          return cb(null, newUser);
        });
      });
    }
  )
);

// used to give Passport the nugget of data to put into the session for this authenticated user
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to provide Passport with the user from the db we want assigned to the req.user object.

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
