import React from 'react';
import PropTypes from 'prop-types';

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
            <a href={link.to}>{link.text}</a>
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
    }),
  ).isRequired,
};
