import React, { useState } from 'react';

import './Textfield.scss';

export const Textfield = ({ id, label, defaultValue, onValueChange }) => {
  const [value, setValue] = useState(defaultValue);

  const updateValue = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onValueChange(newValue);
  };

  return (
    <div className="textfield">
      <label htmlFor={`${id}input`}>{label}</label>
      <input id={`${id}input`} value={value} onChange={updateValue}></input>
    </div>
  );
};
