import React from 'react';
import styled from 'styled-components';

import SVG from '../SVG';

const StyledLogo = styled.a`
  align-items: center;
  display: flex;

  svg {
    margin-right: 0.5em;
  }
`;

const SiteLogo = () => (
  <StyledLogo href='logo'>
    <SVG name='logo' />
    {' '}
Simplenote
  </StyledLogo>
);

export default SiteLogo;
