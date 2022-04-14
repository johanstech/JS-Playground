import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import { App } from './App';
import './index.css';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
});

const anchor = document.getElementById('graphql-root');

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  anchor
);
