const asyncHandler = require('express-async-handler');

const Workout = require('../models/workoutModel');

// TODO: Functions to get workouts by filter: userId, date, bodySections, bodyParts

// @desc Get User's logged workouts
// @route GET /api/workouts
// @access Private
const getWorkouts = asyncHandler(async (req, res) => {
  const workouts = await Workout.find();

  res.status(200).json(workouts);
});

// @desc Log a User workout
// @route POST /api/workouts
// @access Private
const createWorkout = asyncHandler(async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400);
    throw new Error('Missing request body.');
  }

  console.log(req.body);
  const workout = await Workout.create({
    userId: req.body.userId,
    unit: req.body.unit,
    date: new Date(req.body.date),
    elapsedTime: req.body.elapsedTime,
    bodySections: req.body.bodySections,
    bodyParts: req.body.bodyParts,
    exercises: req.body.exercises,
  });

  res.status(201).json(workout);
});

// @desc Update a User workout
// @route PUT /api/workouts/:id
// @access Private
const updateWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id);

  if (!workout) {
    res.status(400);
    throw new Error(`No workout found with Id: ${req.params.id}`);
  }

  const updatedWorkout = await Workout.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedWorkout);
});

// @desc Delete a User workout
// @route DELETE /api/workouts/:id
// @access Private
const deleteWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id);

  if (!workout) {
    res.status(400);
    throw new Error(`No workout found with Id: ${req.params.id}`);
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
