const express = require('express');
const router = express.Router();

const {
  getExercises,
  createExercise,
} = require('../controllers/exerciseController');

router.route('/').get(getExercises).post(createExercise);

module.exports = router;
