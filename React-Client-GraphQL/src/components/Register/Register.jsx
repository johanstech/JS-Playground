import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { userMutations } from '../../graphql';
import Auth from '../../utils/auth';

import { Textfield } from '../Textfield/';

import './Register.scss';

export const Register = () => {
  const [registerUser, { error }] = useMutation(userMutations.register);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('');

  const onChangeName = (newValue) => {
    setName(newValue);
  };

  const onChangeEmail = (newValue) => {
    setEmail(newValue);
  };

  const onChangePassword = (newValue) => {
    setPassword(newValue);
  };

  const onChangeGender = (newValue) => {
    setGender(newValue);
  };

  const onChangeHeight = (newValue) => {
    const parsedHeight = parseInt(newValue);
    setHeight(parsedHeight);
  };

  const onChangeWeight = (newValue) => {
    const parsedWeight = parseInt(newValue);
    setWeight(parsedWeight);
  };

  const onChangeUnit = (newValue) => {
    setUnit(newValue);
  };

  const onClickRegister = async () => {
    const newUser = {
      name,
      email,
      password,
      gender,
      height,
      weight,
      unit,
    };

    const { data } = await registerUser({
      variables: {
        user: newUser,
      },
    });

    if (data) {
      Auth.login(data.register.token);
    }
  };

  return (
    <div>
      <h1>Register new user</h1>
      <Textfield
        id="name"
        label="Name"
        defaultValue={name}
        onValueChange={onChangeName}
      />
      <Textfield
        id="email"
        label="Email"
        defaultValue={email}
        onValueChange={onChangeEmail}
      />
      <Textfield
        id="password"
        label="Password"
        defaultValue={password}
        onValueChange={onChangePassword}
      />
      <Textfield
        id="gender"
        label="Gender"
        defaultValue={gender}
        onValueChange={onChangeGender}
      />
      <Textfield
        id="height"
        label="Height"
        defaultValue={height}
        onValueChange={onChangeHeight}
      />
      <Textfield
        id="weight"
        label="Weight"
        defaultValue={weight}
        onValueChange={onChangeWeight}
      />
      <Textfield
        id="unit"
        label="Unit"
        defaultValue={unit}
        onValueChange={onChangeUnit}
      />
      <div className="button">
        <button onClick={onClickRegister}>Register</button>
      </div>
    </div>
  );
};
