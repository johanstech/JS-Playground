const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

const {
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require('../controllers/workoutController');

router.route('/').get(protect, getWorkouts).post(protect, createWorkout);
router.route('/:id').put(protect, updateWorkout).delete(protect, deleteWorkout);

module.exports = router;
