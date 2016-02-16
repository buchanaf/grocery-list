import { Strategy as FacebookStrategy } from 'passport-facebook';

module.exports = function(passport) {
  passport.use(new FacebookStrategy({
      clientID: '1501342416840864',
      clientSecret: '94138e795eae91c340456915c16682f8',
      callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }));

  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
};
