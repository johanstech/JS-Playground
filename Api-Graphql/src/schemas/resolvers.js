const { AuthenticationError } = require('apollo-server-express');
const datefns = require('date-fns');
const { User, Token, Exercise, Workout } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    currentUser: async (_root, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('No logged in user.');
      }
      return User.findById(context.user._id).select('-password');
    },
    getExercises: async (_root, args, context) => {
      const { bodySection, bodyPart } = args;
      const query = {};
      if (bodySection) {
        query['bodySections'] = bodySection;
      }
      if (bodyPart) {
        query['bodyParts'] = bodyPart;
      }
      const exercises = await Exercise.find(query);
      return exercises;
    },
    getWorkouts: async (_root, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('No logged in user.');
      }
      const workouts = await Workout.find({ userId: context.user._id });
      return workouts;
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
      const updatedUser = await User.findByIdAndUpdate(context.user._id, args, {
        new: true,
      });
      return updatedUser._id;
    },
    createExercise: async (_root, args, context) => {
      const exercise = await Exercise.create(args);
      return exercise._id;
    },
    updateExercise: async (_root, args, context) => {
      const { id, name, description, bodySections, bodyParts } = args;
      const query = {};
      if (name) {
        query['name'] = name;
      }
      if (description) {
        query['description'] = description;
      }
      if (bodySections) {
        query['bodySections'] = bodySections;
      }
      if (bodyParts) {
        query['bodyParts'] = bodyParts;
      }
      const updatedExercise = await Exercise.findByIdAndUpdate(id, query, {
        new: true,
      });
      return updatedExercise._id;
    },
    deleteExercise: async (_root, { id }, context) => {
      const deletedExercise = await Exercise.findByIdAndDelete(id);
      return deletedExercise._id;
    },
    createWorkout: async (_root, { workout }, context) => {
      if (!context.user) {
        throw new AuthenticationError('No logged in user.');
      }
      workout['userId'] = context.user._id;
      const createdWorkout = await Workout.create(workout);
      return createdWorkout._id;
    },
    updateWorkout: async (_root, { id, workout }, context) => {
      if (!context.user) {
        throw new AuthenticationError('No logged in user.');
      }
      const updatedWorkout = await Workout.findByIdAndUpdate(id, workout, {
        new: true,
      });
      return updatedWorkout._id;
    },
    deleteWorkout: async (_root, { id }, context) => {
      if (!context.user) {
        throw new AuthenticationError('No logged in user.');
      }
      const deletedWorkout = await Workout.findByIdAndDelete(id);
      return deletedWorkout._id;
    },
  },
};

module.exports = resolvers;
