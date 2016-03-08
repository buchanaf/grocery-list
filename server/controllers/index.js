import express from 'express';
import * as FoodAPI from './food';
import * as ListAPI from './list';
import * as AuthAPI from './auth';
import path from 'path';
import passport from 'passport';

const router = express.Router();

router.route('/api/user')
  .get(AuthAPI.currentUser);

router.route('/api/food')
  .get(FoodAPI.foodQuery)
  .post(FoodAPI.addToList)

router.route('/api/list')
  .post(ListAPI.addNewList)


router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});


router.use('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../../index.html'));
});

export default router;