import React, { useState } from 'react';

import { Login, Register } from '../../components';

import './NotLoggedIn.scss';

export const NotLoggedIn = () => {
  const [signUp, setSignUp] = useState(false);

  const toggleSignUp = () => {
    setSignUp(!signUp);
  };

  return (
    <div>
      <div>
        <button onClick={toggleSignUp}>{signUp ? 'Login' : 'Sign up'}</button>
      </div>
      <div>{signUp ? <Register /> : <Login />}</div>
    </div>
  );
};
