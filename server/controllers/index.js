import express from 'express';
import food from './food';
import path from 'path';
import passport from 'passport';

const router = express.Router();

router.use('/api/food', food)

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});


router.use('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../../index.html'));
});

export default router;