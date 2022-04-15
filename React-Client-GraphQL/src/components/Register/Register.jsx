import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { userMutations } from '../../graphql';
import Auth from '../../utils/auth';

import { Textfield, Select } from '../input';

import './Register.scss';

const genders = ['male', 'female'];
const units = ['metric', 'imperial'];

export const Register = () => {
  const [registerUser, { error }] = useMutation(userMutations.register);

  const [userState, setUserState] = useState({
    email: '',
    password: '',
    name: '',
    gender: '',
    height: null,
    weight: null,
    unit: '',
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'height' || name === 'weight') {
      value = parseFloat(value);
    }
    setUserState({
      ...userState,
      [name]: value,
    });
  };

  const onClickRegister = async () => {
    const newUser = userState;

    const { data } = await registerUser({
      variables: {
        user: newUser,
      },
    });

    if (data) {
      Auth.login(data.register);
    }
  };

  return (
    <div>
      <h2>Register new user</h2>
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
        <Textfield
          id="name"
          label="Name"
          type="text"
          defaultValue={userState.name}
          handleOnChange={handleChange}
        />
        <Select
          id="gender"
          label="Gender"
          selected={userState.gender}
          options={genders}
          handleOnChange={handleChange}
        />
        <Textfield
          id="height"
          label="Height"
          type="number"
          defaultValue={userState.height}
          handleOnChange={handleChange}
        />
        <Textfield
          id="weight"
          label="Weight"
          type="number"
          defaultValue={userState.weight}
          handleOnChange={handleChange}
        />
        <Select
          id="unit"
          label="Unit"
          selected={userState.unit}
          options={units}
          handleOnChange={handleChange}
        />
      </div>
      <div className="button">
        <button onClick={onClickRegister}>Register</button>
      </div>
    </div>
  );
};
