const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const User = require('../models');

const expiration = '30d';

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (e) {
      console.log(e);
      res.status(401);
      throw new Error('Not authorized.');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token.');
  }
});

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: expiration,
  });
};

module.exports = { authMiddleware, signToken };
