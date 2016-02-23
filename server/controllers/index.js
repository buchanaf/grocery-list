import express from 'express';
import { foodQuery, addToList } from './food';
import { addNewList } from './list';
import path from 'path';
import passport from 'passport';

const router = express.Router();

router.route('/api/food')
  .get(foodQuery)
  .post(addToList)

router.route('/api/list')
  .post(addNewList)


router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});


router.use('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../../index.html'));
});

export default router;