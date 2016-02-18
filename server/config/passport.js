import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from '../models/users';

module.exports = function(passport) {
  passport.use(new FacebookStrategy({
      clientID: '1501342416840864',
      clientSecret: '94138e795eae91c340456915c16682f8',
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'photos', 'email'],
      enableProof: true
    },
    function(accessToken, refreshToken, profile, cb) {
      User.forge({facebook_id: profile.id})
        .fetch()
        .then(function (user) {
          cb(null, user);
          // user.save({

          // })
        })
        .catch(function (err) {
          console.log(err);
        });
    }));

  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
};
