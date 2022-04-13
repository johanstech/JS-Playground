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
  type Query {
    currentUser: User
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
  }
`;

module.exports = typeDefs;
