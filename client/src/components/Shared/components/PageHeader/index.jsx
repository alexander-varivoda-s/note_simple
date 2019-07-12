import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SiteLogo from './SiteLogo';
import NavBar from '../NavBar';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 64em;
  padding: 1em 1.25em;

  @media (min-width: 65.625em) {
    padding: 0.625em 0;
  }
`;

export default function PageHeader(props) {
  const { children, navBarLinks } = props;
  return (
    <StyledHeader>
      <SiteLogo />
      {children || <NavBar links={navBarLinks} />}
    </StyledHeader>
  );
}

PageHeader.defaultProps = {
  children: null,
  navBarLinks: [
    {
      id: 'login',
      text: 'Sign in',
      to: '/login',
    },
    {
      id: 'register',
      text: 'Create an account',
      to: '/register',
    },
  ],
};

PageHeader.propTypes = {
  children: PropTypes.element,
  navBarLinks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
};
