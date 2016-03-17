import { Strategy as FacebookStrategy } from 'passport-facebook';
import { User } from '../models/users';

module.exports = (passport) => {
  passport.use(new FacebookStrategy({
    clientID: '1501342416840864',
    clientSecret: '94138e795eae91c340456915c16682f8',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email'],
    enableProof: true,
  }, (accessToken, refreshToken, profile, cb) => {
    User.forge({ facebook_id: profile.id })
      .fetch()
      .then((user) => {
        if (user) {
          cb(null, user);
          return Promise.reject(user);
        }
        return User.forge({
          email: profile.emails[0].value,
          name: profile.displayName,
          facebook_id: profile.id,
          username: profile.emails[0].value,
        }).save();
      })
      .then((user) => {
        cb(null, user);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }));

  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((user, cb) => {
    User.forge({
      id: user.id,
    })
    .fetch()
    .then((userDb) => {
      cb(null, userDb);
    });
  });
};
