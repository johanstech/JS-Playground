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
  type Query {
    currentUser: User
    getExercises(bodySection: String, bodyPart: String): [Exercise]
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
  }
`;

module.exports = typeDefs;
