const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const User = require('../models');

const { signToken } = require('../utils/auth');

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, gender, height, weight, unit } = req.body;

  if (!name || !email || !password || !gender || !height || !weight || !unit) {
    res.status(400);
    throw new Error('Provide data for all fields.');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists.');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    gender,
    height,
    weight,
    unit,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: signToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data.');
  }
});

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: signToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user credentials.');
  }
});

// @desc Get current user data
// @route GET /api/users/current
// @access Private
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');

  res.status(200).json(user);
});

// @desc Update current user data
// @route PUT /api/users/current
// @access Private
const updateCurrentUser = asyncHandler(async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400);
    throw new Error('Missing request body.');
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error('No user found.');
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  }).select('-password');

  res.status(200).json(updatedUser);
});

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  updateCurrentUser,
};
