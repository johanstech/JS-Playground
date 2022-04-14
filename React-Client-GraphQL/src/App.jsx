import React from 'react';

import { Register } from './components/Register';

import './App.scss';

export const App = () => {
  return (
    <div className="app">
      <h1>React Client GraphQL</h1>
      <Register />
    </div>
  );
};
