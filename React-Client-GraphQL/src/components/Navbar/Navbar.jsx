import React from 'react';

import { navItems } from '../../utils/constants';
import { capitalizeString } from '../../utils/helpers';

import './Navbar.scss';

export const Navbar = () => {
  return (
    <nav className="app__navbar">
      <ul className="app__navbar-links">
        {navItems.map((item) => (
          <li key={`link-${item}`}>
            <span>{capitalizeString(item)}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};
