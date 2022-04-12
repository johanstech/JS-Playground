const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const colors = require('colors');
const dotenv = require('dotenv').config();

const port = process.env.PORT || 5000;

const { connectDB } = require('./config/db');
const { errorMiddleware } = require('./utils/error');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');

const routes = require('./routes');

connectDB();

const app = express();
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: authMiddleware,
// });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`API server running on port: ${port}`);
});

// const startApolloServer = async (typeDefs, resolvers) => {
//   await server.start();
//   server.applyMiddleware({ app });

//   app.listen(port, () => {
//     console.log(`API server running on port: ${port}`);
//     console.log(`GraphQL at http://localhost:${port}${server.graphqlPath}`);
//   });
// };

// startApolloServer(typeDefs, resolvers);
