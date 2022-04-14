const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const { User, Token } = require('../models');

const expiration = '1d';

const authMiddleware = asyncHandler(async ({ req }) => {
  let token;

  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }

  const expiredToken = await Token.findOne({ token });
  if (expiredToken) {
    return req;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    req.user.token = token;
  } catch (e) {
    console.log(e);
  }

  return req;
});

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: expiration,
  });
};

module.exports = { authMiddleware, signToken };
