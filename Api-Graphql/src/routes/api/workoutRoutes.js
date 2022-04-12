const router = require('express').Router();

const { authMiddleware } = require('../../utils/auth');

const {
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require('../../controllers/workoutController');

router
  .route('/')
  .get(authMiddleware, getWorkouts)
  .post(authMiddleware, createWorkout);
router
  .route('/:id')
  .put(authMiddleware, updateWorkout)
  .delete(authMiddleware, deleteWorkout);

module.exports = router;
