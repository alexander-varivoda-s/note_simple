import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Nav from './Nav';
import Ul from './Ul';
import Li from './Li';

export default function NavBar(props) {
  const { links } = props;

  return (
    <Nav>
      <Ul>
        {links.map(link => (
          <Li key={link.id}>
            <Link to={link.to}>{link.text}</Link>
          </Li>
        ))}
      </Ul>
    </Nav>
  );
}

NavBar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};
