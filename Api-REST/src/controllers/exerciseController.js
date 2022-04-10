const asyncHandler = require('express-async-handler');

const Exercise = require('../models/exerciseModel');

// TODO: Filter exercises by: bodySections, bodyParts

// @desc Get user workouts
// @route GET /api/exercises
// @access Public
const getExercises = asyncHandler(async (req, res) => {
  const exercises = await Exercise.find();

  res.status(200).json(exercises);
});

// @desc Create an exercise
// @route POST /api/exercises
// @access Public
const createExercise = asyncHandler(async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400);
    throw new Error('Missing request body.');
  }

  const { name, bodySections, bodyParts, description } = req.body;
  if (!name || !bodySections || !bodyParts || !description) {
    res.status(400);
    throw new Error('Provide data for all fields.');
  }

  const exerciseExists = await Exercise.findOne({ name });
  if (exerciseExists) {
    res.status(400);
    throw new Error('Exercise already exists.');
  }

  const exercise = await Exercise.create({
    name,
    bodySections,
    bodyParts,
    description,
  });

  if (exercise) {
    res.status(201).json(exercise);
  } else {
    res.status(400);
    throw new Error('Invalid exercise data.');
  }
});

module.exports = {
  getExercises,
  createExercise,
};
