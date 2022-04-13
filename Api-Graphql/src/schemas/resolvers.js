const { AuthenticationError } = require('apollo-server-express');
const { User, Token } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    currentUser: async (_root, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).select('-password');
      }
      throw new AuthenticationError('No logged in user.');
    },
  },
  Mutation: {
    login: async (_root, { email, password }) => {
      const user = await User.findOne({ email });
      if (user && (await user.isCorrectPassword(password))) {
        const token = signToken(user._id);
        return { token, user };
      } else {
        throw new AuthenticationError('Invalid user credentials.');
      }
    },
    logout: async (_root, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('No logged in user.');
      }
      const token = context.user.token;
      const expiredToken = await Token.create({ token });
      return expiredToken._id;
    },
    register: async (_root, args) => {
      const user = await User.create(args);
      const token = signToken(user._id);
      return { token, user };
    },
    updateCurrentUser: async (_root, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('No logged in user.');
      }
      const updatedUser = await User.findByIdAndUpdate(context.user._id, args);
      return updatedUser._id;
    },
  },
};

module.exports = resolvers;
