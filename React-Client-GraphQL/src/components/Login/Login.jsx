import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { userMutations } from '../../graphql';
import Auth from '../../utils/auth';

import { Textfield } from '../input';

import './Login.scss';

export const Login = () => {
  const [login, { error }] = useMutation(userMutations.login);

  const [userState, setUserState] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUserState({
      ...userState,
      [name]: value,
    });
  };

  const onClickLogin = async () => {
    const { data } = await login({
      variables: {
        email: userState.email,
        password: userState.password,
      },
    });

    if (data) {
      Auth.login(data.login);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <Textfield
          id="email"
          label="Email"
          type="email"
          defaultValue={userState.email}
          handleOnChange={handleChange}
        />
        <Textfield
          id="password"
          label="Password"
          type="password"
          defaultValue={userState.password}
          handleOnChange={handleChange}
        />
      </div>
      <div className="button">
        <button onClick={onClickLogin}>Login</button>
      </div>
    </div>
  );
};
