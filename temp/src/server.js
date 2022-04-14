const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const colors = require('colors');
const dotenv = require('dotenv').config();

const port = process.env.PORT || 5000;

const db = require('./config/db');
const { errorMiddleware } = require('./utils/error');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorMiddleware);

const startApolloServer = async (typeDefs, resolvers) => {
  db.once('open', async () => {
    console.log(`MongoDB Connected: ${db.host}`.cyan.underline);

    await server.start();
    server.applyMiddleware({ app });

    app.listen(port, () => {
      console.log(`API server running on port: ${port}`.cyan.underline);
      console.log(
        `GraphQL at http://localhost:${port}${server.graphqlPath}`.cyan
          .underline
      );
    });
  });
};

startApolloServer(typeDefs, resolvers);
