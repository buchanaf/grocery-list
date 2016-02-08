import express from 'express';
import food from './food';
import path from 'path';

const router = express.Router()

router.use('/api/food', food)
router.use('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../../index.html'));
});

export default router;