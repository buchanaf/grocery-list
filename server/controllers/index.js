import express from 'express';
import food from './food';
import path from 'path';
import passport from 'passport';
import { Strategy } from 'passport-facebook';

const router = express.Router();

passport.use(new Strategy({
    clientID: '1501342416840864',
    clientSecret: '94138e795eae91c340456915c16682f8',
    callbackURL: 'http://localhost:3000/login/facebook/return'
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

router.use('/api/food', food)
router.use('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../../index.html'));
});

export default router;