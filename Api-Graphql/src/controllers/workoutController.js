const asyncHandler = require('express-async-handler');

const { Workout } = require('../models');

// @desc Get user workouts
// @route GET /api/workouts
// @access Private
const getWorkouts = asyncHandler(async (req, res) => {
  const workouts = await Workout.find({ userId: req.user.id });

  res.status(200).json(workouts);
});

// @desc Create user workout
// @route POST /api/workouts
// @access Private
const createWorkout = asyncHandler(async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400);
    throw new Error('Missing request body.');
  }

  const { unit, date, elapsedTime, bodySections, bodyParts, exercises } =
    req.body;

  if (
    !unit ||
    !date ||
    !elapsedTime ||
    !bodySections ||
    !bodyParts ||
    !exercises
  ) {
    res.status(400);
    throw new Error('Provide data for all fields.');
  }

  const workout = await Workout.create({
    userId: req.user.id,
    unit,
    date: new Date(date),
    elapsedTime,
    bodySections,
    bodyParts,
    exercises,
  });

  res.status(201).json(workout);
});

// @desc Update user workout
// @route PUT /api/workouts/:id
// @access Private
const updateWorkout = asyncHandler(async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400);
    throw new Error('Missing request body.');
  }

  const workout = await Workout.findById(req.params.id);
  if (!workout) {
    res.status(400);
    throw new Error(`No workout found with Id: ${req.params.id}`);
  }

  if (workout.userId.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Unauthorized.');
  }

  const updatedWorkout = await Workout.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedWorkout);
});

// @desc Delete user workout
// @route DELETE /api/workouts/:id
// @access Private
const deleteWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  if (!workout) {
    res.status(400);
    throw new Error(`No workout found with Id: ${req.params.id}`);
  }

  if (workout.userId.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Unauthorized.');
  }

  await workout.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
