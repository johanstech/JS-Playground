const asyncHandler = require('express-async-handler');

const Exercise = require('../models/exerciseModel');

// @desc Get user workouts
// @route GET /api/exercises
// @access Public
const getExercises = asyncHandler(async (req, res) => {
  const { bodySection, bodyPart } = req.query;

  const query = {};
  if (bodySection) {
    query['bodySections'] = bodySection;
  }
  if (bodyPart) {
    query['bodyParts'] = bodyPart;
  }

  const exercises = await Exercise.find(query);

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

// @desc Update an exercise
// @route PUT /api/exercises
// @access Public
const updateExercise = asyncHandler(async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400);
    throw new Error('Missing request body.');
  }

  const exercise = await Exercise.findById(req.params.id);
  if (!exercise) {
    res.status(400);
    throw new Error(`No exercise found with Id: ${req.params.id}`);
  }

  const updatedExercise = await Exercise.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedExercise);
});

// @desc Delete an exercise
// @route DELETE /api/exercises
// @access Public
const deleteExercise = asyncHandler(async (req, res) => {
  const exercise = await Exercise.findById(req.params.id);
  if (!exercise) {
    res.status(400);
    throw new Error(`No exercise found with Id: ${req.params.id}`);
  }

  await exercise.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getExercises,
  createExercise,
  updateExercise,
  deleteExercise,
};
