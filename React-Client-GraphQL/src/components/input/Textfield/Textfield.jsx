import React, { useState } from 'react';

import './Textfield.scss';

export const Textfield = ({
  id,
  label,
  type,
  defaultValue,
  handleOnChange,
}) => {
  const [value, setValue] = useState(defaultValue);

  const updateValue = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    handleOnChange(e);
  };

  return (
    <div className="textfield">
      <label htmlFor={`${id}-input`}>{label}</label>
      <input
        id={`${id}-input`}
        name={id}
        type={type}
        value={value}
        onChange={updateValue}
      ></input>
    </div>
  );
};
