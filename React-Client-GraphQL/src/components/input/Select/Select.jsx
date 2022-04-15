import React, { useState } from 'react';

import { capitalizeString } from '../../../utils/helpers';

import './Select.scss';

export const Select = ({ id, label, options, selected, handleOnChange }) => {
  const [value, setValue] = useState(selected);

  const updateValue = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    handleOnChange(e);
  };

  return (
    <div className="textfield">
      <label htmlFor={`${id}-select`}>{label}</label>
      <select
        id={`${id}-select`}
        name={id}
        value={value}
        onChange={updateValue}
      >
        {options.map((opt, index) => {
          return (
            <option key={index} value={opt}>
              {capitalizeString(opt)}
            </option>
          );
        })}
      </select>
    </div>
  );
};
