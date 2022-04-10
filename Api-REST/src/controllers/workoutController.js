const asyncHandler = require('express-async-handler');

// @desc Get User's logged workouts
// @route GET /api/workouts
// @access Private
const getWorkouts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get logged workouts' });
});

// @desc Log a User workout
// @route POST /api/workouts
// @access Private
const createWorkout = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Missing request body.');
  }

  res.status(201).json({ message: 'Create workout' });
});

// @desc Update a User workout
// @route PUT /api/workouts/:id
// @access Private
const updateWorkout = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update logged workout: ${req.params.id}` });
});

// @desc Delete a User workout
// @route DELETE /api/workouts/:id
// @access Private
const deleteWorkout = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete logged workout: ${req.params.id}` });
});

module.exports = {
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
