import { Strategy as FacebookStrategy } from 'passport-facebook';
import { User } from '../models/users';

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
          if (user) {
            cb(null, user);
            return Promise.reject(user)
          }
          return User.forge({
            email: profile.emails[0].value,
            name: profile.displayName,
            facebook_id: profile.id,
            username: profile.emails[0].value,
          }).save();
        })
        .then(function(user) {
          cb(null, user);
        })
        .catch(function(err) {
          // console.log('err', err)
        });
    }));

  passport.serializeUser(function(user, cb) {
    console.log('serialize', user);
    cb(null, user);
  });

  passport.deserializeUser(function(user, cb) {
    User.forge({
      id: user.id,
    })
    .fetch()
    .then(function(user) {
      console.log('deserialize', user);
      cb(null, user);
    });
  });
};
