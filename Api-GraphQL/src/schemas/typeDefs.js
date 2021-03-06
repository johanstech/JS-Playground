const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    password: String
    name: String
    gender: String
    height: Int
    weight: Int
    unit: String
  }
  type Auth {
    token: String
    user: User
  }
  type Exercise {
    _id: ID
    name: String
    description: String
    bodySections: [String]
    bodyParts: [String]
  }
  type Workout {
    _id: ID
    userId: ID
    unit: String
    date: Int
    elapsedTime: Int
    bodySections: [String]
    bodyParts: [String]
    exercises: [WorkoutExercise]
  }
  type WorkoutExercise {
    _id: ID
    name: String
    description: String
    bodySections: [String]
    bodyParts: [String]
    sets: [Set]
  }
  type Set {
    _id: ID
    weight: Int
    repetitions: Int
  }
  input WorkoutInput {
    unit: String
    date: Int
    elapsedTime: Int
    bodySections: [String]
    bodyParts: [String]
    exercises: [WorkoutExerciseInput]
  }
  input WorkoutExerciseInput {
    name: String
    description: String
    bodySections: [String]
    bodyParts: [String]
    sets: [SetInput]
  }
  input SetInput {
    weight: Int
    repetitions: Int
  }
  type Query {
    currentUser: User
    getExercises(bodySection: String, bodyPart: String): [Exercise]
    getWorkouts: [Workout]
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    logout: ID
    register(
      name: String!
      email: String!
      password: String!
      gender: String!
      height: Int!
      weight: Int!
      unit: String!
    ): Auth
    updateCurrentUser(
      name: String
      email: String
      gender: String
      height: Int
      weight: Int
      unit: String
    ): ID
    createExercise(
      name: String!
      description: String!
      bodySections: [String]!
      bodyParts: [String]!
    ): ID
    updateExercise(
      id: ID
      name: String
      description: String
      bodySections: [String]
      bodyParts: [String]
    ): ID
    deleteExercise(id: ID!): ID
    createWorkout(workout: WorkoutInput!): ID
    updateWorkout(id: ID!, workout: WorkoutInput!): ID
    deleteWorkout(id: ID!): ID
  }
`;

module.exports = typeDefs;
