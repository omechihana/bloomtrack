const express = require('express');
const router = express.Router();
const { 
  getHabits, 
  getHabit, 
  createHabit, 
  updateHabit, 
  deleteHabit, 
  completeHabit,
  getUserStats
} = require('../controllers/habitController');
const auth = require('../middleware/auth');

router.route('/')
  .get(auth, getHabits)
  .post(auth, createHabit);

router.route('/:id')
  .get(auth, getHabit)
  .put(auth, updateHabit)
  .delete(auth, deleteHabit);

router.put('/:id/complete', auth, completeHabit);
router.get('/stats', auth, getUserStats);

module.exports = router;