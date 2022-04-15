import React from 'react';

import Auth from '../../utils/auth';
import { Navbar } from '../../components';

import './Base.scss';

export const Base = () => {
  const onClickLogout = () => {
    Auth.logout();
  };

  return (
    <div>
      <Navbar />
      <h1>Logged in!</h1>
      <button onClick={onClickLogout}>Logout</button>
    </div>
  );
};
