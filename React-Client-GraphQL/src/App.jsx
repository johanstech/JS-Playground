import React from 'react';

import Auth from './utils/auth';
import { Base, NotLoggedIn } from './containers';

import './App.scss';

export const App = () => {
  const loggedIn = Auth.loggedIn();
  console.log(loggedIn);
  return <div className="app">{loggedIn ? <Base /> : <NotLoggedIn />}</div>;
};
