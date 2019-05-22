import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import SVG from '../SVG';

const StyledLogo = styled(Link)`
  a {
    align-items: center;
    display: flex;
  }

  svg {
    margin-right: 0.5em;
  }
`;

const SiteLogo = () => (
  <StyledLogo to='/'>
    <SVG name='logo' />
    {' '}
    Simplenote
  </StyledLogo>
);

export default SiteLogo;
