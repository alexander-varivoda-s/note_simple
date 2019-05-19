import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import SVG from '../SVG';

const StyledLogo = styled.div`
  a {
    align-items: center;
    display: flex;
  }

  svg {
    margin-right: 0.5em;
  }
`;

const SiteLogo = () => (
  <StyledLogo>
    <Link to='/'>
      <SVG name='logo' />
      {' '}
Simplenote
    </Link>
  </StyledLogo>
);

export default SiteLogo;
