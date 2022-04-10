const express = require('express');
const router = express.Router();

const {
  getExercises,
  createExercise,
  updateExercise,
  deleteExercise,
} = require('../controllers/exerciseController');

router.route('/').get(getExercises).post(createExercise);
router.route('/:id').put(updateExercise).delete(deleteExercise);

module.exports = router;
